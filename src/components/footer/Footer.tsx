import Image from 'next/image';
import LinkedIn from '../../assets/linkedIn.svg';
import Instagram from '../../assets/instagram.svg';
import Facebook from '../../assets/facebook.svg';
import Twitter from '../../assets/twitter.svg';

const Footer = () => {
  return (
    <footer className='footer p-10 text-gray-800 bg-gray-300'>
      <aside>
        <div>TO DO</div>
        <p className='text-[#ca6363] text-xl font-black'>TO DO Industries Ltd.<br />Providing reliable taks 2024</p>
      </aside>

      <nav>
        <h6 className='footer-title text-xl font-black'>Social Networks</h6>
        <div className='grid grid-flow-col gap-4'>
          <a><Image alt='LinkedIn' src={LinkedIn} className='w-8' /></a>
          <a><Image alt='Instagram' src={Instagram} className='w-8' /></a>
          <a><Image alt='Facebook' src={Facebook} className='w-8' /></a>
          <a><Image alt='Twitter' src={Twitter} className='w-8' /></a>
        </div>
      </nav>

      <form>
        <h6 className='footer-title text-xl font-black'>Newsletter</h6>
        <fieldset className='form-control w-80'>
          <label className='label'>
            <span className='label-text'>Enter your email address</span>
          </label>
          <div className='join'>
            <input type='text' placeholder='username@site.com' className='input join-item border-none focus:outline-none focus:border-none' />
            <button className='btn join-item text-gray-50 bg-[#3b98fc] border-none'>Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  )
}

export default Footer