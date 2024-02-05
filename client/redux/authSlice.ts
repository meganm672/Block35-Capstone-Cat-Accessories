import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

import api from './api';

interface AuthState {
    token : string | null;
    user : User | null;
}

const initialState: AuthState = {token: localStorage.getItem("token"), 
    user: JSON.parse(localStorage.getItem("user") || "")}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: successfulLogout
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            successfulAuth
        );

        builder.addMatcher(
            api.endpoints.login.matchFulfilled,
            successfulAuth
        )
    }
});
//local storage
type Product = {
    id: number;
    name: string;
    detail: string;
    price: number;
    imageUrl: string;
}
type CartItem = {
    quantity: number;
    product: Product;
}
type User = {
    id: string;
    username: string;
    name: string;
    password: string;
    cartItems: CartItem[];
}
type Payload = {
    token: string;
    user: User;
}
function successfulAuth(state: RootState, {payload}:{payload: Payload}) {
    localStorage.setItem("token", payload.token)
    localStorage.setItem("user", JSON.stringify(payload.user))
    return payload
}

function successfulLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return ({token: null, user: null})
}
export default authSlice.reducer;

export const {logout} = authSlice.actions;

