import { createSlice } from '@reduxjs/toolkit';




const initialState = {
    isLoggedIn: false,
    userEmail : null,
    token:null,
    userId: null,
    activityUserId: null, 
    profilePhoto: null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      userLogin(state, action) {
        state.isLoggedIn = true;
        state.userEmail = action.payload.userEmail;
        state.token = action.payload.token;
      },
      
      updateUserId(state, action) {
        state.userId = action.payload.userId;
      },
      updateActivityUserId(state, action) {
        state.activityUserId = action.payload.activityUserId; 
    },
      updateUserProfilePhoto(state, action) {
        console.log("redux", action)
        state.profilePhoto = action.payload.profilePhoto; 
        
      },
      userLogout(state) {
        state.isLoggedIn = false;
        state.userEmail = null
        state.profilePhoto = null;
      },
    },
  });
  
  export const { userLogin, userLogout,updateUserId,updateActivityUserId,updateUserProfilePhoto } = authSlice.actions;
  export default authSlice.reducer;