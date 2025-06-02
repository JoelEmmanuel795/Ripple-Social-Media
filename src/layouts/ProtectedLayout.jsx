import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import axios from 'axios';
import { login_user, logout_user } from '../store/slices/userSlice';

const ProtectedLayout = () => {
    const [validated, setValidated] = useState(false);
    const token = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();

    // Validate the token
    useEffect(() => {
        const fetch = async () => {
            setValidated(false);
            const accessToken = localStorage.getItem('access');

            if (accessToken) {
                const api =
                    'https://motion.propulsion-home.ch/backend/api/auth/token/verify/';
                try {
                    await axios.post(api, {
                        token: accessToken,
                    });
                    dispatch(login_user(accessToken));
                } catch {
                    dispatch(logout_user());
                    setValidated(true);
                }
            } else {
                dispatch(logout_user());
            }
        };
        fetch();
    }, [dispatch]);

    if (!token && validated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedLayout;
