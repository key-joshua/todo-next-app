import NextAuth from 'next-auth/next';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputType {
    id: string;
    type: string;
    disabled: boolean;
    fieldname: string;
    error: string;
    placeholder: string;
    register: UseFormRegisterReturn<any>;
    watch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonType {
    disabled: boolean;
    fieldname: string;
    type: 'button' | 'submit' | 'reset';
}

export interface ItemTypes {
    tag: string;
    href: string;
}
export interface IDType {
    id: number;
}
declare module "next-auth" {
    interface User {
        username: string
    }
    
    interface Session {
        user: User & {
            username: string
        }
        token: {
            username: string
        }
    }
}