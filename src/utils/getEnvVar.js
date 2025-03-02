import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (name, defValue) => {
  const variable = process.env[name];

  if (variable) {
    return variable;
  }

  if (defValue) {
    return defValue;
  }

  throw new Error(`Missing: process.env['${name}'].`);
};
