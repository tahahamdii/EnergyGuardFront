import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ToastState {
  display:Boolean
  SignUpToast:boolean
  resetToast:boolean
}

const initialState: ToastState = {
  display:false,
  SignUpToast:false,
  resetToast:false
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
      showToast(state) {
        state.display = true;
      },
      showToastForSignUp(state) {
        state.SignUpToast = true;
      },
      showToastForReset(state) {
        state.resetToast = true;
      },
      hideToast(state) {
        state.display = false;
      },
      hideToastForSignUp(state) {
        state.SignUpToast = false;
      },
      hideToastForReset(state) {
        state.resetToast = false;
      },
    },
  });



export const {showToast,hideToast,showToastForSignUp ,hideToastForSignUp,showToastForReset,hideToastForReset} = toastSlice.actions;

export default toastSlice.reducer;