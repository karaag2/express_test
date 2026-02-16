import type {JwtPayload} from "jsonwebtoken"
import type { Request } from 'express';
type User = {
    id:number;
}
export interface RequestWithUser extends Request {
    user: User;
}
export interface DataStoredInToken {
    id: number | string;
}
export interface UserPayload extends JwtPayload {
    id: number
    email?: string
    role?: string
}
export interface TokenData {
    id:number;
    iat: number;
    exp: number;
}
