import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { RedisService } from '@/infra/redis/redis.service';
import { REDIS_ENUM } from '@/utils';
import crypto from 'crypto';

interface InboxData {
  username: string;
  alias: string;
}

interface InboxResult {
  inbox: {
    email: string;
    alias: string;
  };
  isNewInbox: boolean;
}

export class InboxService {
  constructor(private readonly redisService: RedisService) {}

  public async getOrCreateInbox(email: string): Promise<InboxResult> {
    const [username, domain] = email.split('@');

    try {
      const inboxData = await this.redisService.get<InboxData>(REDIS_ENUM.USERNAME_INBOX, username);

      if (inboxData) {
        return {
          inbox: { email, alias: `${inboxData.alias}@${domain}` },
          isNewInbox: false,
        };
      }

      const emailAlias = this.generateEmailAlias();
      const newInboxData: InboxData = { username, alias: emailAlias };

      await Promise.all([
        this.redisService.set(REDIS_ENUM.USERNAME_INBOX, emailAlias, newInboxData),
        this.redisService.set(REDIS_ENUM.USERNAME_INBOX, username, newInboxData),
      ]);

      return {
        inbox: { email, alias: `${emailAlias}@${domain}` },
        isNewInbox: true,
      };
    } catch (error) {
      console.error('Error in getOrCreateInbox:', error);
      throw new Error('Failed to get or create inbox');
    }
  }

  private generateEmailAlias(): string {
    const prefix = Math.random().toString(36).slice(2, 4);
    const number = Math.floor(Math.random() * 10);
    const randomString = crypto.randomBytes(6).toString('base64').replace(/[+/]/g, '').slice(0, 7);
    return `fog.${prefix}${number}-${randomString}`;
  }
}
