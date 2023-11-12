import { configureStore } from '@reduxjs/toolkit';

import api from './api'
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export default store;