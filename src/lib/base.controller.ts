import { Request, Response } from 'express';
import { getConfig } from '@/config';

import { CustomResponse } from '@/interfaces/response.interface';
import { globalConstants } from '@/utils';
import logger from './logger';

abstract class BaseController {
  public send<R>(
    res: Response<CustomResponse<R>>,
    data: R | null,
    message = 'service is healthy',
    statusCode: number = globalConstants.httpStatus.OK.code,
    status: string = globalConstants.status.success,
  ) {
    if (getConfig().NODE_ENV === 'development') {
      // need to change based on environment
      logger.info(JSON.stringify(data, null, 2));
    }

    return res.status(statusCode).json({
      status,
      message,
      data,
      statusCode,
    });
  }

  public redirect(
    req: Request,
    res: Response,
    redirectUrl: string,
    statusCode: number = globalConstants.httpStatus.TEMPORARY_REDIRECT.code,
  ) {
    if (getConfig().NODE_ENV === 'development') {
      // need to change based on environment
      logger.info(` Request move  from $${req.url} to ${redirectUrl}`);
    }

    return res.status(statusCode).redirect(redirectUrl);
  }
}

export default BaseController;
