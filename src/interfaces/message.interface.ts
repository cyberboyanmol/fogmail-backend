import { Message } from '@prisma/client';

export type MessageOptions = {
  [K in keyof Message]?: boolean;
};
