import Image from 'next/image';
import MenuLink from './MenuLink';
import SearchIcon from '../../assets/search.png';
import EnglishIcon from '../../assets/english.png';


const Navbar = () => {
    return (
        <header className='border-b bg-white min-h-[60px] px-10 py-5 relative'>
            <div className='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4'>
                <a> TO DO </a>
                <div className='flex items-center ml-auto lg:order-1'>
                    <button type='button' className='inline-flex items-center font-medium justify-center px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-[#007bff] dark:hover:text-slate-50'>
                       <Image alt='English Language' src={EnglishIcon} className='w-5 h-5 rounded-full me-3' /> English (US)
                    </button>
                </div>
                <MenuLink />
            </div>
            <div className='px-6 mt-3 mx-auto h-9 flex rounded-full bg-gray-200 border border-transparent focus-within:border-gray-600 lg:w-2/4  max-lg:mt-6'>
                <input type='email' placeholder='Search...' className='w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]' />
                <Image alt='Search' src={SearchIcon} className='cursor-pointer w-6 h-6 mt-1' />
            </div>
        </header>
    )
}

export default Navbar