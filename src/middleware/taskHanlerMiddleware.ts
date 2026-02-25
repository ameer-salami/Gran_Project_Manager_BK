import { type Request, type Response,  type NextFunction } from "express";
import {  ZodError, z} from 'zod'
// import { type ParamsDictionary } from 'express-serve-static-core';

type Params = Record<string, string>

export const validateNewTask = (schema: z.ZodObject<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Use parseAsync to support the database check
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsed.body;
      // req.params = parsed.params as ParamsDictionary;
      req.params = parsed.params as Params;
    //   req
      next();
    } catch (error:unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      next(error);
    }
  };
