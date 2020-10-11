import { NextFunction, Request, Response } from 'express';
import { logger } from './loggerMiddleware';

export const errorMiddleware = async (err:Error, req:Request, res:Response, next:NextFunction):Promise<Response> => {
  if (err) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
    return res.status(500).json(err.message);
  }
  logger.http(`Usuário tentou acessar uma pagina inexistente ${req.url}`);
  return res.status(404).json('Page not found');
};
