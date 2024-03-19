import { configureStore } from '@reduxjs/toolkit';
import userAuth from '../slice/userSlices'
import ownerSlices from '../slice/ownerSlices';






const store=configureStore({
        reducer:{
            user:userAuth,
            owner:ownerSlices

        }
})


export default store

export type RootState = ReturnType<typeof store.getState>;