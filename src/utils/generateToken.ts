import jwt from 'jsonwebtoken'
import type {Response} from 'express'

const secret = process.env.JWT_SECRET || 'superSecret'
const generateToken = (userId: number, res: Response): string => {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error('JWT_SECRET is not configured')
    }

    // ✅ CORRECTION ICI - Pas de double accolades
    const payload = { id: userId }  // Pas { id: {userId} }

    const exp = String(process.env.JWT_EXPIRES) || '7d'
    const pre = '7d'

    const token = jwt.sign(payload, secret , { expiresIn: '7d'})

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token
}
export default generateToken