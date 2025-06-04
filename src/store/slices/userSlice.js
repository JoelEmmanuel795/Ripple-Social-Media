import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: undefined,
        user: {},
    },
    reducers: {
        login_user: (state, action) => {
            state.accessToken = action.payload.access;
            state.user = action.payload.user;
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout_user: (state) => {
            state.accessToken = null;
            localStorage.removeItem('access');
            localStorage.removeItem('user');
        },
    },
});

export const { login_user, logout_user } = userSlice.actions;

export default userSlice.reducer;
