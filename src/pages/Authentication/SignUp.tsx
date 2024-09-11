import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import backgroundImage from '../../images/logo/Coficab.jpg';
import backgroundImage2 from '../../images/logo/Account.png';
import userService from '../../Services/userService';
import SuccessfullyToast from '../../components/Toast/successfullyToast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { showToastForSignUp, hideToastForSignUp } from '../../state/Slices/ToastSlice';

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<string>('ADMINISTRATOR');
  const [responseData, setData] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch<AppDispatch>();

  const validateForm = () => {
    let valid = true;
    const errorsObj: Errors = {};
  
    // Username validation
    if (!username.trim()) {
      errorsObj.username = 'Username is required';
      valid = false;
    } else if (username.length < 3) {
      errorsObj.username = 'Username must be at least 3 characters long';
      valid = false;
    }
  
    // Email validation
    if (!email.trim()) {
      errorsObj.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = 'Email is invalid';
      valid = false;
    }
  
    // Password validation
    if (!password.trim()) {
      errorsObj.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errorsObj.password = 'Password must be at least 6 characters long';
      valid = false;
    }
  
    // Confirm Password validation
    if (!confirmPassword.trim()) {
      errorsObj.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (password !== confirmPassword) {
      errorsObj.confirmPassword = 'Passwords do not match';
      valid = false;
    }
  
    setErrors(errorsObj);
    return valid;
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
   const response= await userService.SignUp(username,email,password,confirmPassword,role);
   console.log(response)
      if (response.status ==201) {  
        //const responseData = await response.json();
        dispatch(showToastForSignUp())
        setData(responseData);
        navigate("/");
      } else {
        console.log("post failed");
      }
    } catch (error) {
      console.error('Signup error:' + error);
    }
  };


  // useEffect(() => {
  //   if (token) {
  //     const verifyEmail = async () => {
  //       try {
  //         const response = await fetch(`http://localhost:5000/auth/verify/${token}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //         });
  //         if (response.ok) {
  //           console.log('Email verified successfully');
  //           navigate("/auth/signin");
  //         } else {
  //           console.log('Email verification failed');
  //         }
  //       } catch (error) {

  //         console.error('Email verification error:', error);
  //       }
  //     };

  //     verifyEmail();
  //   }
  // }, [token]);

  return (
    <div className="rounded-sm border border-gray-300 bg-white shadow-md bg-opacity-30 re ">
      <div className="absolute top-0 left-0 mt-4 ml-5">
        <img src={backgroundImage} alt="Factory Logo" className="h-10 w-35" />
      </div>

      <div className="flex flex-wrap items-center">

        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="relative" style={{ width: '100%', height: '809px' }}>
            <img src={backgroundImage2} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col px-10">
              <Link to="/" className="mb-5.5 inline-block"></Link>
              <p className="2xl:px-20"></p>
            </div>
          </div>
        </div>


        <div className="w-full border-none mt-11 dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-10">
            <span className="mb-1.5 block font-medium"></span>
            <h2 className="mb-9 text-2xl font-bold text-blue dark:text-white sm:text-title-xl2">
              Sign Up
            </h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-3 relative">
                <label htmlFor="username" className="mb-2.5 block font-medium text-blue dark:text-white">Username</label>
                <div className="flex items-center">
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-7 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <AccountCircleIcon />
                  </span>
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              <div className="mb-3 relative">
                <label htmlFor="email" className="mb-2.5 block font-medium text-blue dark:text-white">Email</label>
                <div className="flex items-center">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-7 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <EmailIcon />
                  </span>
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="mb-3 relative">
                <label htmlFor="password" className="mb-2.5 block font-medium text-blue dark:text-white">Password</label>
                <div className="flex items-center">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-7 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <PasswordIcon />
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="mb-6 relative">
                <label htmlFor="confirmPassword" className="mb-2.5 block font-medium text-blue dark:text-white">Re-type Password</label>
                <div className="flex items-center">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-7 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <PasswordIcon />
                  </span>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="mb-4 text-center">
                <button type="submit" className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-3 px-5 text-white text-[16px] transition hover:bg-opacity-90">Create account</button>
                <p className='mt-3'>
                  Already have an account?{' '}
                  <Link to="/" className="text-teal-500 font-bold">Sign in</Link>
                </p>
              </div>
              <div>
              
              </div>


            </form>



          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
