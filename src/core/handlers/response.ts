import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import * as HTTPStatus from 'http-status'
import logger from '../providers/logger'

class ResponseHandlers {
  onError(res: Response, message: string, err: any) {
    logger.error(`Error: ${err}`)
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message)
  }

  onSuccess(res: Response, data: any) {
    return res.status(HTTPStatus.OK).json({ payload: data })
  }

  errorHandlerApi(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    logger.error(`Api Error foi executada: ${err}`)
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: 'ERR-001',
      message: 'API error',
    })
  }

  dbErrorHandler(res: Response, err: any) {
    logger.error(`Um erro aconteceu: ${err}`)
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      code: 'ERR-002',
      message: 'DB error',
    })
  }
}

export default new ResponseHandlers()
