import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, _, next) => {
  try {
    await schema.validateAsync(req.body),
      {
        abortEarly: false,
      };
    console.log('Is valid data!');
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    console.log('Is not valid data!');
    next(error);
  }
};
