import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../../images/logo/pass.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { showToast, hideToast } from '../../state/Slices/ToastSlice';
import SuccessfullyToast from '../../components/Toast/successfullyToast';
import baseUrl from "../../enviroment/enviroment"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const display = useSelector((state: RootState) => state.Toast.display);
    useEffect(() => {
    if (display) {
      const timeout = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [dispatch, display]);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl.baseUrl}/auth/forgot-password`, { email });
      dispatch(showToast())
      setMessage(response.data.message);
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('No user found with that email address.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(''); // Clear error message when user starts typing in the email field
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Forgot Password</h2>
        <p style={{ textAlign: 'center' }}>Enter your email address below and we'll send you a password reset OTP.</p>
        <img src={Image} alt="Background" className="w-60 h-50 object-cover mx-auto my-auto" />
        {display && <SuccessfullyToast message={message}/>}

        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleForgotPassword}>
          <label style={{ marginBottom: '10px' }}>Email:</label>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <input style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} placeholder='Enter your Email' type="email" value={email} onChange={handleEmailChange} required />
          </div>
          {error && <p style={{ marginBottom: '10px', textAlign: 'center', color: 'red' }}>{error}</p>}
          <button className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-2 text-white text-lg transition hover:bg-opacity-90" type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
