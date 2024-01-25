import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../models/user";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: any) => {
        if(err || !user){
            return res.status(401).json({message: "Authentication failed"})
        }
        return next()
    })(req, res, next)
}