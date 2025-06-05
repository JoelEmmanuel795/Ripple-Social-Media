import checkmark from '../../assets/svgs/checkmark.svg';
import './signupConfirmation.scss';
import { useNavigate } from 'react-router';

const SignupConfirmation = ({ email }) => {

    const navigate = useNavigate()

    return (
        <>
            <div className="container-right">
                <h2>Congratulations!</h2>
                <img
                    src={checkmark}
                    alt="checkmark"
                    className="checkmark-icon"
                />
                <p>We've sent a confirmation code to your email {email}</p>
                <button className="button-login" onClick={() => navigate('/auth/verification')}>
                    CONTINUE
                </button>
            </div>
        </>
    );
};

export default SignupConfirmation;
