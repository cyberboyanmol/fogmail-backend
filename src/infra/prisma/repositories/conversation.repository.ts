// import { Injectable } from '@nestjs/common';
// import prisma from '../prisma-client';
// import { Conversation } from '@prisma/client';
// export class ConversationRepository {
//   private readonly prisma = prisma;
//   constructor() {
//     this.prisma = prisma;
//   }

//   async create(data: Partial<Conversation>) {
//     return this.prisma.model.conversation.create({
//       data: {
//         subject: data.subject,
//         threadId: data.threadId,
//         emailusername: data.emailusername,
//       },
//     });
//   }

//   async find(data: Partial<Conversation>) {
//     return this._conversation.model.conversation.findUnique({
//       where: {
//         threadId: data.threadId,
//         emailusername: data.emailusername,
//       },
//     });
//   }
// }
