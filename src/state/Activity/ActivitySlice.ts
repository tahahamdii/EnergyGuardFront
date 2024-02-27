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
const ActivitySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    logLogin: (state) => {
        state.userActivities.push({
          timestamp: currentDate.toISOString().replace('Z', '+00:00'),
          activityType: 'Login',
          details: 'User logged in',
        });
      },
      logLogout: (state) => {
        state.userActivities.push({
          timestamp: currentDate.toISOString().replace('Z', '+00:00'),
          activityType: 'Logout',
          details: 'User logged out',
        });
      },
      setUserActivities: (state, action: PayloadAction<any[]>) => {
        state.userActivities = action.payload;
      },
      
  },
});



export const {logLogin,logLogout,setUserActivities } = ActivitySlice.actions;

export default ActivitySlice.reducer;