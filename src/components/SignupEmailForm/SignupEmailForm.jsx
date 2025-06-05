import { Link } from 'react-router';
import emailSVG from '../../assets/svgs/mail.svg';
import axios from 'axios';
import { useState } from 'react';

import SignupConfirmation from '../../components/SignupConfirmation/SignupConfirmation'

const SignupEmailForm = () => {

    const [step, setStep] = useState(1);
    const nextStep = () => setStep((prev) => prev + 1)

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const email = event.target[0].value
            const response = await axios.post('https://motion.propulsion-home.ch/backend/api/auth/registration/', {email: email})
            nextStep();
        }
        catch(error) {
            alert(Object.values(error.response.data).flat().join('\n'), '\n Please try again!')
        }
        
    };

    

    return (
        <>
            {step === 1 && <div className="container-right">
                <div className="header">
                    Already have an account?
                    <Link to={'/auth/login'} className="button-signup">SIGN IN</Link>
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
            </div>}
            {step === 2 && <SignupConfirmation/>}
        </>
    );
};

export default SignupEmailForm;
