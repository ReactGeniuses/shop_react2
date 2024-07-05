import { configureStore} from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import cartSlice from "./cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartSlice,
    },
})