import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '@auth/JwtConfig';
import { FindUserById } from '@db/FindUserById';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

const verifyJwt = async (payload: any, done: any) => {
  try {
    const isExist = await FindUserById(payload.id);

    const user = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };

    if (isExist) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

export const AuthenticateJwt = (req: any, res: any, next: any): void => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};
export const isAuthenticate = (req: any) => {
  if (!req.user) {
    throw Error('Authenticate Error, need user');
  }
  return;
};

passport.use(new Strategy(jwtOptions, verifyJwt));
