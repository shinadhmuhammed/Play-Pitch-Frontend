import { configureStore } from '@reduxjs/toolkit';
import userAuth from '../slice/userSlices'
import ownerSlices from '../slice/ownerSlices';
import adminSlices from '../slice/adminSlices';






const store=configureStore({
        reducer:{
            user:userAuth,
            owner:ownerSlices,
            admin:adminSlices
        }
})


export default store

export type RootState = ReturnType<typeof store.getState>;