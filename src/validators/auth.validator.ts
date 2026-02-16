import {z} from 'zod'

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email( 'Please provide a valid email')
        .toLowerCase(),

    password: z
        .string({ error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain uppercase, lowercase and number'
        ),
})
export const registerSchema = z.object({
    email: z
        .string({ error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email address')
        .toLowerCase()
        .trim(),

    password: z
        .string({ error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain uppercase, lowercase and number'
        ),
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name is too long')
        .optional()
});