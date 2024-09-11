import axios, { AxiosResponse } from 'axios';
import baseUrl from "../enviroment/enviroment"
const api = axios.create({
  baseURL: baseUrl.baseUrl+"/user/", 
  headers: {
    'Content-Type': 'application/json',
  },
});

const getUserByUsername = async (username: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get(`/getUserByUserName/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getUserById = async (userId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get(`/getUser/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (
  userId: string,
  userData: any
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.put(`/editUser/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (username: string, currentPassword: string, newPassword: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.put(`${baseUrl.baseUrl}/auth/changePassword/${username}`, { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SignUp = async (username: string, email: string, password: string,confirmPassword:string,role:string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post(`${baseUrl.baseUrl}/auth/signUp`, { username, email,password,confirmPassword,role });
    return response;
  } catch (error) {
    throw error;
  }
};
const Signin = async (email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post(`${baseUrl.baseUrl}/auth/login`, {email,password});
    return response;
  } catch (error) {
    throw error;
  }
};



export default  {updateProfile,getUserById,changePassword,SignUp,Signin,getUserByUsername} ;
