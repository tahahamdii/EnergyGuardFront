import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../../public/logonew.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import backgroundImage from '../../images/logo/sinup.jpg';

const SignIn: React.FC = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const[responseData,setData]=useState("");
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response=await fetch('http://localhost:5000/auth/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'true'
        },
        body:JSON.stringify({email,password})
      });
      if(response.ok){
        console.log("Post request successful");
        const responseData=await response.json();
        setData(responseData);
        localStorage.setItem('token',responseData.token);
        localStorage.setItem('email',email);
        navigate("/");
      }else{
        console.log("post failed");
      }
    } catch (error) {
      console.error('Signup error:'+error);
    }
    
  };

  return (
    <div className="dark">
      <div className="rounded-sm border border-white dark:border-strokedark bg-dark shadow-default dark:bg-boxdark ">
        <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, width: '100', height: '735px' }}>
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/"></Link>
              <p className="2xl:px-20 text-white dark:text-white">
              </p>
            </div>
          </div>
  
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium text-white dark:text-white">
                Welcome to Energy Guard.
              </span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In
              </h2>
  
              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-white dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3  flex items-center">
                    <EmailIcon />
                  </span>
                  </div>
                </div>
  
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-white dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                     <span className="absolute inset-y-0 right-0 pr-3  flex items-center">
                    <PasswordIcon />
                  </span>
                  </div>
                </div>
  
                <div className="mb-5">
                  <input
                    type="submit"
                    onClick={handleSignUp}
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
  
                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <p>
                    In case you Forget Password{' '}
                    <Link to="" className="text-primary">
                      Forget Password.
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default SignIn;
