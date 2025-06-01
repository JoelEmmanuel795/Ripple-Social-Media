import checkmark from '../../assets/svgs/checkmark.svg';
import './signupConfirmation.scss';

const SignupConfirmation = ({ email, goNext }) => {
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
                <button className="button-login" onClick={() => goNext()}>
                    CONTINUE
                </button>
            </div>
        </>
    );
};

export default SignupConfirmation;
