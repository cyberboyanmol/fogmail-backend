import { HttpStatusCode } from '@/enums';
import ApiError from '@/exceptions/http.exception';
import { ConversationRepository } from '@/infra/prisma/repositories/conversation.repository';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { RedisService } from '@/infra/redis/redis.service';
import { ConversationResponse } from '@/interfaces/conversation.interface';
import { InboxData, InboxResult } from '@/interfaces/inbox.interface';
import { CONVERSATIONS_PAGE_SIZE as MAX_PAGE_SIZE, REDIS_ENUM } from '@/utils';
import { Conversation, Message } from '@prisma/client';
import crypto from 'crypto';
import { json } from 'express';

export class ConversationService {
  constructor(
    private readonly redisService: RedisService,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  public async getConversations({ username, page, pageSize }: { username: string; page: number; pageSize: number }) {
    const adjustedPageSize = Math.min(pageSize, MAX_PAGE_SIZE);
    const offset = (page - 1) * adjustedPageSize;

    const totalRecords = await this.conversationRepository.count({ username: username });
    const totalPages = Math.ceil(totalRecords / pageSize);

    const validPageNumber = page > totalPages ? totalPages : page;

    const fetchedConversations = await this.conversationRepository.find(
      { username: username },
      { skip: offset, take: pageSize },
    );

    const transformedConversations = fetchedConversations.map((conversation) => {
      const numMessages = conversation.messages.length;
      const numUnreads = conversation.messages.filter((message) => message.status === 'UNREAD').length;

      const senders = Array.from(
        new Set(
          conversation.messages.map((message) =>
            JSON.stringify({
              name: message.fromAddress.name,
              address: message.fromAddress.address,
            }),
          ),
        ),
      ).map((sender) => JSON.parse(sender));

      //   const recipients = conversation.messages.map((message) =>
      //     Array.from(new Set(message.toList.map((to) => JSON.stringify({ address: to.address, name: to.address })))).map(
      //       (to) => JSON.parse(to),
      //     ),
      //   )[0];

      const lastMessage = conversation.messages[conversation.messages.length - 1].date;

      return {
        id: conversation.id,
        numMessages,
        numUnreads,
        subject: conversation.subject,
        lastMessage,
        senders,
        // recipients,
      };
    });

    return {
      metaData: {
        totalPages,
        totalRecords,
        currentPage: page,
        nextPage: validPageNumber < totalPages ? validPageNumber + 1 : null,
        prevPage: validPageNumber > 1 ? validPageNumber - 1 : null,
      },
      conversations: transformedConversations,
    };
  }

  public async getConversationById(conversationId: string) {
    const conversationWithMessage = await this.conversationRepository.findById(conversationId);
    if (!conversationWithMessage) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, 'Conversation Not found');
    }

    return conversationWithMessage;
  }
}
