import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import backgroundImage from '../../images/logo/Coficab.jpg';
import backgroundImage2 from '../../images/logo/signIn.jpg';
import { logLogin } from '../../state/Slices/ActivitySlice';
import userService from '../../Services/userService';
import ErrorToast from '../../components/Toast/ErrorToast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { showToast, hideToast,hideToastForSignUp,hideToastForReset } from '../../state/Slices/ToastSlice';
import SuccessfullyToast from '../../components/Toast/successfullyToast';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [msg,setmsg]=useState("incorrect email or password");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const display = useSelector((state: RootState) => state.Toast.display);
  const displaySignUp = useSelector((state: RootState) => state.Toast.SignUpToast);
  const displayReset = useSelector((state: RootState) => state.Toast.resetToast);

  useEffect(() => {
    if (display || displaySignUp || displayReset) {
      const timeout = setTimeout(() => {
        dispatch(hideToast());
        dispatch(hideToastForSignUp());
        dispatch(hideToastForReset())
      }, 2000);

      // Clear timeout on component unmount or when toast is hidden manually
      return () => clearTimeout(timeout);
    }
  }, [dispatch, display]);
  const CreateActivity = (username: string) => {
    dispatch(logLogin({ username }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorsObj: { [key: string]: string } = {};

    if (!email.trim()) {
      errorsObj.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsObj.email = 'Email is invalid';
    }

    // Password validation
    if (!password.trim()) {
      errorsObj.password = 'Password is required';
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
    } else {
      try {
        const response = await userService.Signin(email, password);
        if (response.status == 200) {
          console.log("Post request successful");
          //const responseData = await response.json();
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', email);
          localStorage.setItem('username', response.data.username)
          CreateActivity(response.data.username);
          dispatch(showToast())
          navigate("/");
        } else if(response.status == 403){
          console.log(response.data.message);
        }
      } catch (error) {
        dispatch(showToast())
        console.error('SignIn error:', error?.response?.data.message);
      }
    }
  };

  return (
    <div className="h-screen rounded-sm border border-gray-300 bg-white shadow-md bg-opacity-30 re">
      <div className="absolute top-0 left-0 mt-4 ml-5">
        <img src={backgroundImage} alt="Factory Logo" className="h-10 w-35" />
      </div>
      {display && <ErrorToast message={msg}/>}
      {displaySignUp && <SuccessfullyToast message='An Email sent to your account please verify'/>}
      {displayReset && <SuccessfullyToast message='password reset successfully'/>}

      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="relative" style={{ width: '100%', height: '560px' }}>
            <img src={backgroundImage2} alt="Background" className="w-full h-full object-cover mt-50"/>
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
              Sign In
            </h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-blue">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3  flex items-center">
                    <EmailIcon />
                  </span>
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-blue">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3  flex items-center">
                    <PasswordIcon />
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ">{errors.password}</p>}
              </div>

              <div className="mb-5 text-center">
                <input
                  type="submit"
                  value="Sign In"
                  className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-3 px-5 text-white text-[16px] transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/auth/signup" className="text-teal-500 font-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="mt-6 text-center">
                <p>
                  In case you Forget Password{' '}
                  <Link to="/auth/forgetPass" className="text-teal-500 font-bold">
                    Forget Password.
                  </Link>
                </p>
              </div>
             

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
