import argon from 'argon2';
import { UserType } from '../interfaces/users';
import StatusCode from '../utils/enumStatusCodes';


export default abstract class UserVerifier {
  protected async userVerifier(user: UserType | null, token: string | null = null) {
    if (!user) return {
      code: StatusCode.NOT_FOUND,
      error: 'User not found'
    };

    const userAuth = token
      ? await argon.verify(user.token as string, token)
      : true;

    return userAuth ? null
      : {
        code: StatusCode.UNAUTHORIZED_USER,
        error: 'Access denied'
      };
  }

}
