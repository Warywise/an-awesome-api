import {
  VerifyEmail, VerifyHash, VerifyUserData,
  VerifyAdressData, VerifyCardData, VerifyBodyEmail
} from './userMiddlewares';
import { VerifyToken } from './tokenMiddlewares';
import { VerifySale } from './saleMiddlewares';

export {
  VerifyEmail,
  VerifyBodyEmail,
  VerifyHash,
  VerifyCardData,
  VerifyUserData,
  VerifyAdressData,
  VerifyToken,
  VerifySale,
};
