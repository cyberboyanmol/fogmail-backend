import { Address } from '@prisma/client';

export interface ConversationResponse {
  id: string;
  subject: string;
  numMessages: number;
  numUnread: number;
  senders: Pick<Address, 'name' | 'address'>[];
}
