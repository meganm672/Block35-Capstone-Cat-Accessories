import { configureStore } from '@reduxjs/toolkit';

import api from './api'
import authReducer from './authSlice'
import { cartReducer } from './cartSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        auth: authReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export default store;