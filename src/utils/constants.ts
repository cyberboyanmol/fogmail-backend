import { HttpStatusCode, HttpStatusKeys } from '@/enums';
import { GlobalConstants } from '@/interfaces/global-constants.interface';

// Define the globalConstants object
export const globalConstants: GlobalConstants = {
  status: {
    success: 'SUCCESS',
    failed: 'FAILED',
  },
  httpStatus: {
    OK: {
      code: HttpStatusCode.OK,
      name: 'HttpsStatusCodeOk',
    },
    CREATED: {
      code: HttpStatusCode.CREATED,
      name: 'HttpsStatusCodeCreated',
    },
    NO_CONTENT: {
      code: HttpStatusCode.NO_CONTENT,
      name: 'HttpsStatusCodeNoContent',
    },
    TEMPORARY_REDIRECT: {
      code: HttpStatusCode.TEMPORARY_REDIRECT,
      name: 'TemporaryRedirect',
    },
    BAD_REQUEST: {
      code: HttpStatusCode.BAD_REQUEST,
      name: 'BadRequestException',
    },
    UNAUTHORIZED: {
      code: HttpStatusCode.UNAUTHORIZED,
      name: 'UnauthorizedException',
    },
    NOT_FOUND: {
      code: HttpStatusCode.NOT_FOUND,
      name: 'NotFoundException',
    },
    FORBIDDEN: {
      code: HttpStatusCode.FORBIDDEN,
      name: 'ForbiddenException',
    },
    NOT_ACCEPTABLE: {
      code: HttpStatusCode.NOT_ACCEPTABLE,
      name: 'NotAcceptableException',
    },
    REQUEST_TIMEOUT: {
      code: HttpStatusCode.REQUEST_TIMEOUT,
      name: 'RequestTimeoutException',
    },
    CONFLICT: {
      code: HttpStatusCode.CONFLICT,
      name: 'ConflictException',
    },
    GONE: {
      code: HttpStatusCode.GONE,
      name: 'GoneException',
    },
    HTTP_VERSION_NOT_SUPPORTED: {
      code: HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED,
      name: 'HttpVersionNotSupportedException',
    },
    PAYLOAD_TOO_LARGE: {
      code: HttpStatusCode.PAYLOAD_TOO_LARGE,
      name: 'PayloadTooLargeException',
    },
    UNSUPPORTED_MEDIA_TYPE: {
      code: HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
      name: 'UnsupportedMediaTypeException',
    },
    UNPROCESSABLE_ENTITY: {
      code: HttpStatusCode.UNPROCESSABLE_ENTITY,
      name: 'UnprocessableEntityException',
    },
    INTERNAL_SERVER_ERROR: {
      code: HttpStatusCode.INTERNAL_SERVER_ERROR,
      name: 'InternalServerErrorException',
    },
    NOT_IMPLEMENTED: {
      code: HttpStatusCode.NOT_IMPLEMENTED,
      name: 'NotImplementedException',
    },
    I_AM_A_TEAPOT: {
      code: HttpStatusCode.I_AM_A_TEAPOT,
      name: 'ImATeapotException',
    },
    METHOD_NOT_ALLOWED: {
      code: HttpStatusCode.METHOD_NOT_ALLOWED,
      name: 'MethodNotAllowedException',
    },
    BAD_GATEWAY: {
      code: HttpStatusCode.BAD_GATEWAY,
      name: 'BadGatewayException',
    },
    SERVICE_UNAVAILABLE: {
      code: HttpStatusCode.SERVICE_UNAVAILABLE,
      name: 'ServiceUnavailableException',
    },
    GATEWAY_TIMEOUT: {
      code: HttpStatusCode.GATEWAY_TIMEOUT,
      name: 'GatewayTimeoutException',
    },
    PRECONDITION_FAILED: {
      code: HttpStatusCode.PRECONDITION_FAILED,
      name: 'PreconditionFailedException',
    },
  },
};

export enum REDIS_ENUM {
  USERNAME_INBOX = 'FOGMAIL:USERNAME_INBOX',
}
export enum REDIS_TTL_ENUM {
  FIVE_MINUTES = 300, // 5 minutes
  TEN_MINUTES = 600, // 10 minutes
  FIFTEEN_MINUTES = 900, // 15 minutes
  TWENTY_MINUTES = 1200, // 20 minutes
}
