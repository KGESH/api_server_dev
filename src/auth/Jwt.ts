import jwt from 'jsonwebtoken';
import { jwtSecret } from '@auth/JwtConfig';

export const CreateToken = (
  id: number,
  name: string,
  email: string,
): string => {
  const token = jwt.sign(
    {
      id,
      name,
      email,
    },
    jwtSecret,
    {
      expiresIn: '15m',
    },
  );

  return token;
};

export const VerifyToken = (req: any, res: any, next: any) => {
  /**
   * token 검증
   */
};
