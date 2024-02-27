import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import backgroundImage from '../../images/logo/sinup.jpg';

const SignUp: React.FC = () => {
  const { token } = useParams(); // Capture verification token from URL
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<string>('Operator');
  const [responseData, setData] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({ username, email, password, confirmPassword, role })
      });
      if (response.ok) {
        console.log("Post request successful");
        const responseData = await response.json();
        setData(responseData);
        localStorage.setItem('token', responseData.token)
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        navigate("/auth/signin");
      } else {
        console.log("post failed");
      }
    } catch (error) {
      console.error('Signup error:' + error);
    }
  };

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await fetch(`http://localhost:5000/auth/verify/${token}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (response.ok) {
            console.log('Email verified successfully');
            navigate("/auth/signin");
          } else {
            console.log('Email verification failed');
          }
        } catch (error) {

          console.error('Email verification error:', error);
          // Handle error
        }
      };

      verifyEmail();
    }
  }, [token]);

  return (
    <div className="rounded-sm border border-black bg-boxdark shadow-default dark:border-strokedark">
      <div className="flex flex-wrap items-center">


        <div className="hidden w-full xl:block xl:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, width: '100', height: '735px' }}>
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
            </Link>
            <p className="2xl:px-20"></p>
          </div>
        </div>



        <div className="w-full border-none dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-10">
            <span className="mb-1.5 block font-medium"></span>
            <h2 className="mb-9 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
              Sign Up
            </h2>



            <form onSubmit={handleSignUp}>
              <div className="mb-4 relative">
                <label htmlFor="username" className="mb-2.5 block font-medium text-white dark:text-white">Username</label>
                <div className="flex items-center">
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <AccountCircleIcon />
                  </span>
                </div>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="email" className="mb-2.5 block font-medium text-white dark:text-white">Email</label>
                <div className="flex items-center">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <EmailIcon />
                  </span>
                </div>
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="mb-2.5 block font-medium text-white dark:text-white">Password</label>
                <div className="flex items-center">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <PasswordIcon />
                  </span>
                </div>
              </div>

              <div className="mb-6 relative">
                <label htmlFor="confirmPassword" className="mb-2.5 block font-medium text-white dark:text-white">Re-type Password</label>
                <div className="flex items-center">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-16 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center">
                    <PasswordIcon />
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <button type="submit" className="w-full cursor-pointer rounded-lg border border-primary bg-primary font-bold p-4 text-white transition hover:bg-opacity-90">Create account</button>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary">Sign in</Link>
                </p>
              </div>
            </form>



          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
