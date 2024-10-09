import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './signUpSlice';

export const store = configureStore({
    reducer: {
        signUp: signupReducer
    }
})