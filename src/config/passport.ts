import { 
    Strategy, 
    ExtractJwt, 
    StrategyOptions,
    VerifiedCallback
} from 'passport-jwt';
import passport from 'passport';
import { JwtPayload } from '../types/user';
const UserModel = require('../models/user');

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY || 'askOchEmbla',
};

passport.use(
    new Strategy(jwtOptions, async (payload: JwtPayload, done: VerifiedCallback) => {
        try {
            const user = await UserModel.findById(payload.id);
            
            if(user){
                console.log('User found:', user);
                return done(null, user);
            } else {
                console.log('User not found');
                return done(null, false)
            }
        } catch (error){
            console.error('Error during authentication:', error);
            return done(error, false)
        }
    })
)

export default passport;