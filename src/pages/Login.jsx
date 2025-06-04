import { useEffect, useState } from 'react';
import avatarSVG from '../assets/svgs/avatar.svg';
import passwordSVG from '../assets/svgs/password.svg';

import '../sass/pages/login.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login_user } from '../store/slices/userSlice';
import useFetch from '../utils/useFetch';

const Login = () => {
    const { resData, sendRequest } = useFetch();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleFormChange = (event) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest('/auth/token/', formData, 'post');
    };

    useEffect(() => {
        console.log(resData);
        if (resData['/auth/token/']) {
            dispatch(login_user(resData['/auth/token/'].access));
            navigate('/');
        }
    }, [resData]);

    return (
        <div className="container-right">
            <div className="header">
                Don't have an account?
                <a className="button signup">Sign up</a>
            </div>
            <div className="form-container">
                <div className="content-inner">
                    <h2>Sign In</h2>
                    <form
                        onChange={handleFormChange}
                        onSubmit={handleSubmit}
                        method="post"
                    >
                        <div className="form-field">
                            <img src={avatarSVG} alt="Avatar Icon" />
                            <div className="input-wrapper">
                                <input type="text" required id="email" />
                                <label>Email</label>
                            </div>
                        </div>

                        <div className="form-field">
                            <img src={passwordSVG} alt="password icon" />
                            <div className="input-wrapper">
                                <input id="password" type="password" required />
                                <label>Password</label>
                            </div>
                        </div>
                        <input
                            type="submit"
                            value="Sign In"
                            className="button-login"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
