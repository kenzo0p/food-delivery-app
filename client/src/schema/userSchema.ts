import {z} from 'zod'

export const userSignupSchema = z.object({
    fullname:z.string().min(2,"Full name is required"),
    email:z.string().email("Invalid email adress"),
    password:z.string().min(6 , "Password must be 6 length long"),
    contact:z.string().min(10,"Contact number must be 10 digit"),
});

export type SignupInputState = z.infer<typeof userSignupSchema> ;



export const userLoginSchema = z.object({
    email:z.string().email("Invalid email adress."),
    password:z.string().min(6 , "Password must be 6 length long."),
});

export type LoginInputState = z.infer<typeof userLoginSchema> ;