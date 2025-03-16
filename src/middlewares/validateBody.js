import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, _, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    }),
      next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
