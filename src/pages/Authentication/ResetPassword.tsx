import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Image from '../../images/logo/Forgot password.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { showToastForReset, hideToastForReset } from '../../state/Slices/ToastSlice';
import baseUrl from "../../enviroment/enviroment"
const ResetPassword = () => {
    const param = useParams();
    const id=param.id;

    // const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (newPassword !== confirmNewPassword) {
                setMessage('New passwords do not match.');
                return;
            }
            const response = await axios.post(`${baseUrl.baseUrl}/auth/reset-password/`+id, { newPassword });
            setMessage(response.data.message);
            console.log(response);
            dispatch(showToastForReset())
            navigate('/');
        } catch (error) {
            console.error('Reset password error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="h-screen flex justify-center items-center h-screen w-screen">
            <div className="max-w-3xl p-8 border border-gray-300 rounded bg-white">
                <h2 className="text-3xl font-bold text-center ">Reset Password</h2>
                <img src={Image} alt="Background" className="w-60 h-50 object-cover mx-auto my-auto" />

                <form onSubmit={handleResetPassword} className="flex flex-col">
                    {/* <label className="mb-2">Current Password:</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="px-3 py-2 border border-gray-300 rounded mb-4" /> */}
                    <label className="mb-2">New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="px-3 py-2 border border-gray-300 rounded mb-4" placeholder='*****'/>
                    <label className="mb-2">Confirm New Password:</label>
                    <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required className="px-3 py-2 border border-gray-300 rounded mb-4" placeholder='*****'/>
                    <button type="submit" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-lg font-bold py-2 px-4 rounded cursor-pointer transition hover:bg-opacity-90">Submit</button>
                </form>
                {message && <p className="mt-4 text-center text-green-500">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
