import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const preloadedState = {
    user: {
        accessToken: localStorage.getItem('access') || undefined,
        username: undefined,
    },
};

export default configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});
