import { useEffect, useState } from 'react';
import baseUrl from "../../enviroment/enviroment"

// Define the type for a person
export type User = {
  _id:string
  username: string;
  email: string;
  password: string;
  role: 'ADMINISTRATOR' | 'SUPER ADMINISTRATEUR';
  isVerified: boolean;
  isApproved: boolean;
};


const useUserData = () => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiurl = `${baseUrl.baseUrl}/auth/getUsers/`;
        const response = await fetch(apiurl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setUserData(responseData.users);
        console.log(userData)
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
    fetchData();
  }, []); // Run once when the component mounts

  return userData;
};

export default useUserData;
