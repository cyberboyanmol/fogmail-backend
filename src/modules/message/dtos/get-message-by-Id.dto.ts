import { username } from '@/helpers/validate/custom.validation';
import Joi from 'joi';
export const messageByIdDto = {
  params: {
    messageId: Joi.string().required().uuid(),
  },
  query: {
    rawMail: Joi.boolean().optional(),
    headers: Joi.boolean().optional(),
  },
};
