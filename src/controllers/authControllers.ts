import type {Request, Response} from "express";
import prisma from '@/config/db.js'
import bcrypt from 'bcryptjs'
import generateToken from "@/utils/generateToken.js";
import {loginSchema, registerSchema} from "@/validators/auth.validator.js";
const register = async (req: Request, res:  Response) => {
    try{
        const body = req.body;
        const result= registerSchema.safeParse(body);
        if (!result.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: result.error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            })
        }
        const {name,email, password} = result.data;

        // check if the user exists
        const userExists = await prisma.user.findUnique({where: {email}})
        if (userExists) {
            return res.status(400).json({'response':'user already exists with this email'})
        }
        //hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        //Create the new user
        await prisma.user.create({
            data:{
                name:name?name.trim():null,
                email:email,
                password:hashedPassword
            }
        })
        return res.status(201).json({'response':'success'})
    }catch (e){
        console.error(e)
        return res.status(500).json({'response':'internalServerError'})
    }


}
const login = async (req: Request,res:Response) => {
    const body = req.body;
    const result= loginSchema.safeParse(body)
    if (!result.success) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: result.error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        })
    }
    const {email, password} = result.data;
    //check if user exists
    const user = await prisma.user.findUnique({where: {email}})
    if (!user) {
        return res.status(400).json({'response':'Invalid email or password'})
    }
    //Check the password
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if (!isPasswordValid) {
        return res.status(400).json({'response':'Invalid email or password'})
    }
    //Generate token
    const token = generateToken(user.id,res)
    return res.status(200).json({
        'response':'success',
        data:{
            user:{
                id: user.id,
                email:email,
            },
        }
    })
}

export {login,register}