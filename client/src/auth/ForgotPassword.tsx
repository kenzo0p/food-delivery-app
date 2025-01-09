import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  Loader2, Mail } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';



const ForgotPassword = () => {
    const [email,setEmail] = useState<string>("");
    const loading:boolean = false;
  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
        <form className='flex flex-col gap-5  md:p-8 w-full max-w-md rounded-lg mx-4'>
            <div className='text-center'>
                <h1 className='font-extrabold text-2xl mb-2'>Forgot Password</h1>
                <p className='text-sm text-gray-600'>Enter Your email password to reset your password</p>

            </div>
            <div className='relative w-full'>
                <Input
                type='email'
                value={email}
                placeholder='Enter your Email'
                onChange={(e) =>setEmail(e.target.value) }
                className='pl-10'
                />
                <Mail className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
            </div>
            {loading ? (
                <Button disabled className='bg-orange hover:bg-hoverOrange'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
            ) : (
                <Button type='submit' className='bg-orange hover:bg-hoverOrange'>Send reset Password</Button>
            )}
            <span>
                Back to{" "}
                <Link to="/login" className='text-blue-500'>Login</Link>
            </span>
        </form>
    </div>
  )
}

export default ForgotPassword;