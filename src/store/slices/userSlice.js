import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: localStorage.getItem('access') || undefined,
        username: parsedUser?.username,
        id: parsedUser?.id,
    },
    reducers: {
        login_user: (state, action) => {
            const { access, user } = action.payload;
            state.accessToken = access;
            state.username = user.username;
            state.id = user.id;
            localStorage.setItem('access', access);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout_user: (state) => {
            state.accessToken = null;
            state.username = undefined;
            state.id = undefined;
            localStorage.removeItem('access');
            localStorage.removeItem('user');
        },
    },
});

export const { login_user, logout_user } = userSlice.actions;

export default userSlice.reducer;
