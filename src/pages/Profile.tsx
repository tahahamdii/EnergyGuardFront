import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import '../css/profile.css'; // Import CSS file for additional styling
import userService from '../Services/userService';
import { useEffect, useState } from 'react';

interface User {
  email: string;
  username: string;
  role: string;
  isVerified: boolean;
  phone: string;
  createdAt: string; // Updated createdAt and updatedAt to string
  updatedAt: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Function to format date and time
  const formatDate = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleString(); // Use toLocaleString() for localized date and time format
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userName = localStorage.getItem('username');
        const userResponse = await userService.getUserByUsername(userName);

        if (userResponse && userResponse.user) {
          // Format createdAt and updatedAt fields
          userResponse.user.createdAt = formatDate(userResponse.user.createdAt);
          userResponse.user.updatedAt = formatDate(userResponse.user.updatedAt);

          setUser(userResponse.user);
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div className="profile-container">
        <div className="card user-card-full">
          <div className="row m-0">
            <div className="col-sm-4 bg-c-lite-green user-profile">
              <div className="card-block text-center text-white">
                <div className="m-b-25">
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                    className="img-radius"
                    alt="User-Profile-Image"
                  />
                </div>
                <h6 className="f-w-600">{user?.username}</h6>
                <p>{user?.role}</p>
                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
              </div>
            </div>
            <div className="col-sm-8">
              <div className="card-block">
                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                  Information
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Email</p>
                    <h6 className="text-muted f-w-400">{user?.email}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="m-b-10 f-w-600">Role</p>
                    <h6 className="text-muted f-w-400">{user?.role}</h6>
                  </div>
                  <div className="col-sm-6 distance">
                    <p className="m-b-10 f-w-600">Phone</p>
                    <h6 className="text-muted f-w-400">{user?.phone}</h6> {/* Added phone field */}
                  </div>
                  <div className="col-sm-6 distance">
                    <p className="m-b-10 f-w-600">Created At</p>
                    <h6 className="text-muted f-w-400">{user?.createdAt}</h6> {/* Added createdAt field */}
                  </div>
                  <div className="col-sm-6 distance">
                    <p className="m-b-10 f-w-600">Verified</p>
                    <h6 className="text-muted f-w-400">
                      {user?.isVerified ? 'Yes' : 'No'}
                    </h6>
                  </div>
                  <div className="col-sm-6 distance">
                    <p className="m-b-10 f-w-600">Created At</p>
                    <h6 className="text-muted f-w-400">{user?.updatedAt}</h6> {/* Added createdAt field */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
