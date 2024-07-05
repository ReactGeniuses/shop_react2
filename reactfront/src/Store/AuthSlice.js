import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    isLoggedIn: false,
    value: 0, 
    correo: "",
};

const initialState = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : defaultState;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isLoggedIn = true;
            state.value = action.payload.role; 
            state.correo = action.payload.correo;
            localStorage.setItem('auth', JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                value: state.value,
                correo: state.correo,
            }));
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.value = 0; 
            state.correo = "";
            localStorage.removeItem('auth');
        },
    },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
