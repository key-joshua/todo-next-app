import React from 'react';
import { ButtonType } from '@/types/Types';
import { Circles } from 'react-loader-spinner';



const Button = (props: ButtonType) => {
    return (
        <button
            type={props?.type}
            disabled={props?.disabled}
            className='w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-primary-800'>
            {props?.disabled ? <Circles width='30' height='30' visible={true} color='#ffffff' wrapperStyle={{ justifyContent: 'center', color: '#ffffff' }} /> : props?.fieldname}
        </button>

    )
}

export default Button