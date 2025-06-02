import avatarSVG from '../assets/svgs/avatar.svg';
import passwordSVG from '../assets/svgs/password.svg';

import '../sass/pages/login.scss';

const Login = () => {
    return (
        <div className="container-right">
            <div className="header">
                Don't have an account?
                <a className="button signup">Sign up</a>
            </div>
            <div className="form-container">
                <div className="content-inner">
                    <h2>Sign In</h2>
                    <form action="" method="post">
                        <div className="form-field">
                            <img src={avatarSVG} alt="Avatar Icon" />
                            <div className="input-wrapper">
                                <input type="text" required />
                                <label>Email</label>
                            </div>
                        </div>

                        <div className="form-field">
                            <img src={passwordSVG} alt="password icon" />
                            <div className="input-wrapper">
                                <input type="password" required />
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
