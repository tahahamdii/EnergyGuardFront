import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Activity {
    activityType: string;
    details: string;
    timestamp: string; 
  }

interface ActivityState {
  userActivities:Array<Activity>[]
}

const initialState: ActivityState = {
  userActivities: [], 
};
const currentDate = new Date();
const saveUserActivitiesToLocalStorage = (activities: any[]) => {
  localStorage.setItem("userActivities", JSON.stringify(activities));
};
const getCurrentTimestamp = (): string => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  const localTimestamp = new Date(currentDate.getTime() - timezoneOffset * 60000);
  return localTimestamp.toISOString().replace("Z", "+00:00");
};
const ActivitySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    logLogin: (state,action:PayloadAction<{username:String}>) => {
        state.userActivities.push({
          timestamp: getCurrentTimestamp(),
          activityType: 'Login',
          details: action.payload.username+' logged in',
        });
        saveUserActivitiesToLocalStorage([...state.userActivities]);
      },
      logLogout: (state) => {
        state.userActivities.push({
          timestamp: getCurrentTimestamp(),
          activityType: 'Logout',
          details: 'User logged out',
        });
        saveUserActivitiesToLocalStorage([...state.userActivities]);
      },
      updateProfile:(state,action:PayloadAction<{username:String}>)=>{
        state.userActivities.push({
          timestamp: getCurrentTimestamp(),
          activityType: 'Update Profile',
          details: action.payload.username+' User updated his profile',
        })
      },

      setUserActivities: (state, action: PayloadAction<any[]>) => {
        state.userActivities = action.payload;
      },
      
  },
});



export const {logLogin,logLogout,setUserActivities,updateProfile } = ActivitySlice.actions;

export default ActivitySlice.reducer;