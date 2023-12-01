import { configureStore } from '@reduxjs/toolkit';

import api from './api'
import authReducer from './authSlice'
import { cartReducer } from './cartSlice';
import { filterReducer } from './filterSlice';

import storage from 'redux-persist/lib/storage';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
// this is so you can refresh the guest cart and not loose the items is it 
const persistConfig = {
    key: 'root',
    storage,
}
// you will be able to refresh the cart in guest mode and not loose the cart items
const persistedCartReducer = persistReducer(persistConfig, cartReducer)

 const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        filter: filterReducer,
        cart: persistedCartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
        }).concat(api.middleware)
    }
})


export default store 
export const persistor = persistStore(store)
