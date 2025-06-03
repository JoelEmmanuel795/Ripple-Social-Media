import { useState } from 'react';
import avatarSVG from '../assets/svgs/avatar.svg';
import passwordSVG from '../assets/svgs/password.svg';

import '../sass/pages/login.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login_user } from '../store/slices/userSlice';

const Login = () => {
    const loginUrl =
        'https://motion.propulsion-home.ch/backend/api/auth/token/';

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

        const fetch = async () => {
            try {
                const { data } = await axios.post(loginUrl, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                dispatch(login_user(data.access));
                navigate('/');
            } catch (error) {}
        };
        fetch();
    };

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
