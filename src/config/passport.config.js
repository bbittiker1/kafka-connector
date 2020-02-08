import logger from '../util/logger';
import passport from "passport/lib";

const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret || 'some other secret as default',
    passReqToCallback: true
};

/**
 * This sets how we handle tokens coming from the requests that come
 * and also defines the key to be used when verifying the token.
 */
export const passportConfig = (app, passport) => {
    app.use(passport.initialize({passReqToCallback: true}));

    passport.use(
        new Strategy(opts, (req, payload, done) => {
            const user =  req.context.models.User;

            user.findById(payload.id)
                .then(user => {
                    if(user){
                        //
                        // User is validated.
                        //
                        req.context.currentUser = user.dataValues;
                        return done(null,user.dataValues);
                    }

                    return done(null, false);   // Invalid user;
                })
                .catch(err => {
                    logger.error(err)
                });
    }));
};
