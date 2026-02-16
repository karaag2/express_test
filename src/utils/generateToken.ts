import jwt from 'jsonwebtoken'
import type {Response} from 'express'
const secret = process.env.JWT_SECRET
const generateToken = async (userId:number, res:Response): Promise<string> => {
    const payload = { id:userId }
    const token =  jwt.sign(payload, secret, {expiresIn: process.env.JWT_EXPIRES||'7d'})
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return token
}
export default generateToken