import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = async (err:Error, req:Request, res:Response, next:NextFunction):Promise<Response> => {
  if (err) {
    return res.status(500).json(err.message);
  }
  return res.status(404).json('Page not found');
};
