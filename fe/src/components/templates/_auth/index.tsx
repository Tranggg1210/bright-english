"use client";
import './style.scss';
import { useState } from 'react';
import logo from '@public/images/logo.png';
import Image from 'next/image';
import Login from './login';
import Register from './register';

function Auth() {
  const [isLoginPage, setIsLoginPage] = useState(true)
  return (
    <div className='auth'>
      <div className='auth__logo'>
        <Image src={logo} alt='logo' width={120} />
      </div>
      <div className='auth__navigation'>
        <button
          className={`auth__navigation--btn ${isLoginPage ? 'auth__navigation--active' : ''}`}
          onClick={() => setIsLoginPage(true)}>
          Đăng nhập
        </button>
        <button
          className={`auth__navigation--btn ${!isLoginPage ? 'auth__navigation--active' : ''}`}
          onClick={() => setIsLoginPage(false)}>
          Đăng ký
        </button>
      </div>
      <div className='auth__form'>
        {isLoginPage ? <Login /> : <Register setIsLoginPage={setIsLoginPage} />}
      </div>
    </div>
  )
}

export default Auth
