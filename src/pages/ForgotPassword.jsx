import { Link } from "react-router"
import emailSVG from '../assets/svgs/mail.svg';
import useFetch from "../utils/useFetch";
import { useState } from "react";
import checkmark from '../assets/svgs/checkmark.svg';
import { useNavigate } from "react-router";

export default function ForgotPassword ({changeStage}) {

    const [stage, setstage] = useState(false)
    const [email, setEmail] = useState('')

    const {sendRequest, error} = useFetch()
    const navigate = useNavigate()

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const emailSend = event.target[0].value
        setEmail(emailSend)
        sendRequest('/auth/password-reset/', {email: emailSend}, 'post')
        setstage(true)
        
    }

    return <>
            {
                !stage && 
                <div className="container-right">
                    <div className="header">
                        Don't have an account?
                        <Link to={'/auth/signup'} className="button-signup">SIGN UP</Link>
                    </div>
                    <div className="form-container">
                        <div className="content-inner">
                            <h2>Forgot Password</h2>
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
                                    value="SEND CODE"
                                    className="button-login"
                                    style={{marginTop: '60px'}}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                stage && <>
                         <div className="container-right">
                            <h2>Code Sent!</h2>
                            <img
                                src={checkmark}
                                alt="checkmark"
                                className="checkmark-icon"
                            />
                            <p>Wev'e sent a reset code to yout email<br/>{email}</p>
                            <button className="button-login" 
                                    onClick={() => navigate('/auth/verification')}>
                                CONTINUE
                            </button>
                        </div>   
                </>
            }
    </>
}