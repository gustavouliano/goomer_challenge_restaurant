import passport from 'passport';
import LoggerProvider from './LoggerProvider';
const GooglePlusTokenStrategy = require('passport-google-plus-token');

class GoogleAuthProvider {

    static async createMiddleware() {
        passport.use(new GooglePlusTokenStrategy({
            clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            passReqToCallback: true
        }, function(req: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
            LoggerProvider.getInstance().info(`E-mail ${profile.emails[0].value} authenticated with google`);
            const user = {
                email: profile.emails[0].value,
                username: profile.displayName
            }
            return done(null, user);
        }));
    }
}

export default GoogleAuthProvider;