import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: ''
}

const signUpSlice = createSlice({
    name: 'signUpDetails',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        clearCredentials: (state, action) => {
            state.email = '';
            state.password = '';
        }
    }
})

export const { setCredentials, clearCredentials } = signUpSlice.actions;
export default signUpSlice.reducer;