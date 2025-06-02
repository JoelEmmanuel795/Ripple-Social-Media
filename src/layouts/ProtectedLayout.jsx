import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import axios from 'axios';
import { login_user, logout_user } from '../store/slices/userSlice';

const ProtectedLayout = () => {
    const token = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();

    // Validate the token
    useEffect(() => {
        const fetch = async () => {
            const accessToken = localStorage.getItem('access');
            console.log(accessToken);

            if (accessToken) {
                const api =
                    'https://motion.propulsion-home.ch/backend/api/auth/token/verify/';
                try {
                    await axios.post(api, {
                        token: accessToken,
                    });
                    console.log('token valid');
                    dispatch(login_user(accessToken));
                } catch {
                    console.log('Logout error');
                    dispatch(logout_user());
                }
            } else {
                console.log('Logout 1');
                dispatch(logout_user());
            }
        };
        fetch();
    }, [dispatch]);

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedLayout;
