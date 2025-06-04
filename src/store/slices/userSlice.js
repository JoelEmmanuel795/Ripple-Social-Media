import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: undefined,
        username: undefined,
        id: undefined,
    },
    reducers: {
        login_user: (state, action) => {
            const { access, user } = action.payload;
            // console.log(action.payload);
            state.accessToken = action.payload.access;
            state.username = user.username;
            state.id = user.id;
            localStorage.setItem('access', access);
            localStorage.setItem('user', user);
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
