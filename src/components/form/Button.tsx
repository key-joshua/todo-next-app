import React from 'react';
import { ButtonType } from '@/types/Types';


const Button = (props: ButtonType) => {
    return (
        <button
            type={props?.type}
            disabled= {props?.disabled}
            className='w-full text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-primary-800'>
            {props?.fieldname}
        </button>

    )
}

export default Button