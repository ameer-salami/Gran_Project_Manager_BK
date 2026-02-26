import { type Request, type Response,  type NextFunction } from "express";
import {  ZodError, z} from 'zod' 
 
 export const validateQueryWspId = (schema: z.ZodObject<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
       const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });


      if (parsed.query) {
      Object.keys(req.query).forEach(key => delete req.query[key]);
        Object.assign(req.query, parsed.query);
      }

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
  }