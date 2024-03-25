'use client';
import Link from 'next/link';
import { usePathname } from "next/navigation";

import { MenuItems } from './menuItems';
import { ItemTypes } from '@/types/Types';

const MenuLink = () => {
    const pathname = usePathname();
    const isActive = (menuName: string) => pathname === menuName;

    return (
        <ul id='collapseMenu' className='lg:!flex max-lg:hidden max-lg:w-full lg:space-x-10 max-lg:space-y-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2'>
            {
                MenuItems.map((item: ItemTypes, index: number) => (
                    <Link key={index} href={item.href} className={`relative inline-block font-extrabold text-[18px] ${isActive(item.href) ? 'text-[#007bff]' : 'text-gray-600 hover:text-[#007bff]'}`}>
                        {item.tag} <span className={isActive(item.href) ? 'absolute left-0 bottom-0 h-1/2 border-b-2 border-[#007bff] w-4/5' : 'hidden'} />
                    </Link>
                ))
            }
        </ul>
    )
}

export default MenuLink