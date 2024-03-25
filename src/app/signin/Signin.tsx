'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/form/Button';
import Input from '../../components/form/Input';
import Remember from '@/components/form/Remember';
import Background from '../../assets/background.jpg';
import { toast, ToastContainer } from 'react-toastify';

interface SigninStateType {
    formIsLoading: boolean
}

const Signin = () => {
    const router = useRouter();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [state, setState] = useState<SigninStateType>({
        formIsLoading: false,
    });

    const onSubmit = handleSubmit(async (data) => {
        setState((prevState) => ({ ...prevState, formIsLoading: true }));
        const response = await signIn('credentials', {
            redirect: false,
            email: data?.email,
            password: data?.password
        });

        if (response?.status !== 200) {
            router.refresh()
            toast.error('Invalid email or password');
            setState((prevState) => ({ ...prevState, formIsLoading: false }));
        } else {
            router.refresh()
            setTimeout(() => { router.push('/todos') }, 4500);
        }
    });

    return (
        <div className='min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${Background.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'black' }}>
            <ToastContainer />
            <div className='mt-20 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-500'>
                <div className='p-8 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white'> Signin to your account </h1>
                    <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
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

                        <div className='flex items-center justify-between'>
                            <Remember />
                            <a href='/' className='text-sm font-medium text-blue-500 hover:underline dark:text-primary-500'> Forgot password ? </a>
                        </div>
                        <Button fieldname='Signin' type='submit' disabled={state.formIsLoading} />
                        <p className='text-sm font-light text-gray-500 dark:text-gray-400'> Don’t have an account yet ? <Link href='/signup' className='font-medium text-blue-500 hover:underline dark:text-primary-500'> Sign up </Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin;
