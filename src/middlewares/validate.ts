import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> | void => {
  try {
    schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query
    }).then(() => {
      next();
    }).catch((error) => {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        res.status(StatusCodes.BAD_REQUEST).json({ errors });
        return;
      }
      next(error);
    });
  } catch (error) {
    next(error);
  }
}; 