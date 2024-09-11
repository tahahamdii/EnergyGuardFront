import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../enviroment/enviroment"


const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();
    const id = param.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/auth/verify/${id}`;
                console.log(apiurl);
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error('something is wrong');
                } else {
                    console.log("email verfied !!")
                }
            } catch (error) {
                console.log('Fetch Error:', error); // Log any fetch errors
            }
        };
        fetchData();
    },[id]);

    return (


        <div className="flex justify-center items-center h-screen">
            <div className="max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="flex justify-center items-center font-semibold text-2xl text-blue-800">Email verfied successfully</h1>
                <div className="relative mt-4 flex justify-center items-center">
                    <img src="../../../public/coficab.jpg" alt="Navbar scroll" style={{ width: '150px', height: 'auto', marginRight: "30px" }} />
                </div>
                <p className="mt-4">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Thank you, your email has been verified. Please wait for your account to be approved</h5>
                </p>
                <div className="flex justify-center mt-5">
                    <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      <Link to="/">Return to Login Page</Link>
                    </button>
                </div>


            </div>
        </div>

    );
};

export default EmailVerify;