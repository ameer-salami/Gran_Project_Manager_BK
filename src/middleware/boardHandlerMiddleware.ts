import { type Request, type Response,  type NextFunction } from "express";
import {  ZodError, z} from 'zod'

type Params = Record<string, string>

export const validateBoardId = (schema: z.ZodObject<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        params: req.params,
      });

      req.params = parsed.params as Params;
    
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

 
