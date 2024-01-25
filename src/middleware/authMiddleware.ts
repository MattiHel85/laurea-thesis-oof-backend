import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: User) => {
        if(err || !user){
            return res.status(401).json({message: "Authentication failed"})
        }
        return next()
    })(req, res, next)
}

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', (err: Error, user: User) => {
        if(err || !user){
            return res.status(401).json({message: "Authentication failed"})
        }
        if(user.isAdmin){
            return next()
        }
    })(req, res, next)
}