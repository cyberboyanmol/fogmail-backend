import { getConfig } from '@/config';
import { PrismaClient } from '@prisma/client';

interface CustomNodeJSGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJSGlobal;

const prisma = global.prisma || new PrismaClient();

if (getConfig().NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
