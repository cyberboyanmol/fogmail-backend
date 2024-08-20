import Joi from 'joi';
export const ConversationByIdDto = {
  params: {
    conversationId: Joi.string().required().uuid(),
  },
};
