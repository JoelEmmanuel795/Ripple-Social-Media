import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: undefined,
        username: undefined,
    },
    reducers: {
        login_user: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('access', action.payload);
        },
        logout_user: (state) => {
            state.accessToken = null;
            localStorage.removeItem('access');
        },
    },
});

export const { login_user, logout_user } = userSlice.actions;

export default userSlice.reducer;
