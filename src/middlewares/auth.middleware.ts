import type {NextFunction, Request, Response} from 'express';
import jwt,{type JwtPayload} from 'jsonwebtoken'
import type {RequestWithUser,UserPayload} from '@/interfaces/auth.interface.js'
import {isUserPayload} from "@/services/auth.services.js";


export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try{
        const secret = process.env.JWT_SECRET || "secret";
        //Retreive the token
        let token = req.cookies.jwt
        //Check the token
        if(!token) return res.status(401).json({
            message: 'Authentication required',
            code: 'NO_TOKEN'
        })
        const payload  = jwt.verify(token,secret)

        if (isUserPayload(payload)) {
            (req as RequestWithUser).user = payload as UserPayload
        }else{
            return res.status(401).json({message: 'unauthorized'});
        }

        next()
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: 'Authentication error'
        })
    }
}