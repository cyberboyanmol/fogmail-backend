import { CustomHelpers } from 'joi';

export const username = (value: string, helpers: CustomHelpers) => {
  const aliasPattern = /^fog\.[a-z0-9]{2}[0-9]-[a-zA-Z0-9]{7}$/;

  const specialSymbolRegex = /[@!#$%^&*()_+\=\[\]{};':"\\|,<>/?]+/;

  // Check if the username matches the alias pattern
  if (aliasPattern.test(value)) {
    return helpers.message({
      custom: 'Username cannot be an alias',
    });
  }

  // Check if the username contains @ or any special symbols
  if (specialSymbolRegex.test(value)) {
    return helpers.message({
      custom: 'Username cannot contain special characters like @, !, #, $, etc.',
    });
  }
  return value;
};
