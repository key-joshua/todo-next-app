'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/form/Button';
import Input from '../../components/form/Input';
import Background from '../../assets/background.jpg';
import { ToastContainer, toast } from 'react-toastify';

interface SignupStateType {
    formIsLoading: boolean
}

const Signup = () => {
    const router = useRouter();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [state, setState] = useState<SignupStateType>({
        formIsLoading: false,

    });

    const onSubmit = handleSubmit(async (data) => {
        setState((prevState) => ({ ...prevState, formIsLoading: true }));
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password,
            })
        });

        const responseData = await response.json();
        if (response.ok) {
            reset();
            toast.success(responseData.message);
            setTimeout(() => { router.push('/') }, 4500);
        } else {
            toast.error(responseData.error);
            setState((prevState) => ({ ...prevState, formIsLoading: false }));
        }
    });

    return (
        <div className='min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${Background.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'black' }}>
            <ToastContainer />
            <div className='mt-20 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-500'>
                <div className='p-8 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white'> Signup your account </h1>
                    <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
                        <Input
                            type='name'
                            id='username'
                            watch={watch('username')}
                            fieldname='Your username'
                            placeholder='Enter your username'
                            disabled={state?.formIsLoading}
                            error={errors.email ? 'Username is required' : ''}
                            register={register('username', { required: true })} />

                        <Input
                            id='email'
                            type='email'
                            watch={watch('email')}
                            fieldname='Your email'
                            placeholder='Enter your email'
                            disabled={state?.formIsLoading}
                            error={errors.email ? 'Email is required' : ''}
                            register={register('email', { required: true })} />

                        <Input
                            id='password'
                            type='password'
                            watch={watch('password')}
                            fieldname='Your password'
                            placeholder='Enter your password'
                            disabled={state?.formIsLoading}
                            error={errors.password ? 'Password is required' : ''}
                            register={register('password', { required: true })} />

                        <Input
                            type='password'
                            id='confirmPassword'
                            disabled={state?.formIsLoading}
                            watch={watch('confirmPassword')}
                            fieldname='Your confirm Password'
                            placeholder='Enter your confirm password'
                            error={errors.password ? 'Comfirm password is required' : ''}
                            register={register('confirmPassword', { required: true, validate: (val: string) => { if (watch('password') != val) { return "Comfirm password does not match" } } })}

                        />

                        <div className='flex items-center justify-between'>
                        </div>
                        <Button fieldname='Signup' type='submit' disabled={state.formIsLoading} />
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400'> Already have an account ? <Link href='/' className='font-medium text-blue-500 hover:underline dark:text-primary-500'> Signin </Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
