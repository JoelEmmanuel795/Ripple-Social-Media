import emailSVG from '../../assets/svgs/mail.svg';

const SignupEmailForm = ({ setFormData, goNext }) => {
    const handleOnSubmit = (event) => {
        event.preventDefault();
        setFormData(event.target[0].value);
        goNext();
    };

    return (
        <>
            <div className="container-right">
                <div className="header">
                    Already have an account?
                    <a className="button signup">Sign in</a>
                </div>
                <div className="form-container">
                    <div className="content-inner">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleOnSubmit} method="post">
                            <div className="form-field">
                                <img src={emailSVG} alt="Email Icon" />
                                <div className="input-wrapper">
                                    <input type="email" required />
                                    <label>Email</label>
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Sign Up"
                                className="button-login"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupEmailForm;
