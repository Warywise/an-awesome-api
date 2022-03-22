import { Request } from 'express';
import StatusCode from '../utils/enumStatusCodes';

export default class TokenMiddleware {
  protected verifyToken(req: Request) {
    const { authorization: token } = req.headers;

    return typeof token === 'string' ? null
      : {
        code: StatusCode.UNAUTHORIZED_USER,
        error: 'Missing authorization token'
      };
  }
}
