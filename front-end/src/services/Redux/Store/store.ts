import { configureStore } from '@reduxjs/toolkit';
import userAuth from '../slice/userSlices'


const store=configureStore({
        reducer:{
            user:userAuth
        }
})


export default store