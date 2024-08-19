import { username } from '@/helpers/validate/custom.validation';
import Joi from 'joi';
export const conversationDto = {
  params: {
    username: Joi.string().required().custom(username),
  },
  query: {
    page: Joi.number().optional(),
    pageSize: Joi.number().optional(),
  },
};
