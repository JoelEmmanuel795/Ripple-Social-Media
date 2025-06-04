
import useFetch from '../../utils/useFetch'
import { useNavigate } from 'react-router'
import '../../sass/pages/login.scss'
import { useState } from 'react';



export default function SignupVerification () {

    const [formData, setFormData] = useState({});

    const {sendRequest} = useFetch()
    const navigate = useNavigate()

    const addValues = (id, value) => {
        setFormData({...formData, [id]: value})        
    }
    
    const sendPost = () => {
        sendRequest('/auth/registration/validation/', formData, 'patch')
            navigate('/auth/login')
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        sendPost();
    }

    const handleOnChhange = (event) => {
        addValues(event.target.id, event.target.value)
    }

   
    return <>
            <div className="container-right">
                
                <div className="form-container" >
                    <div className="content-inner" >
                        <h2 style={{fontSize: '40px', fontWeight: '500'}}>Verification</h2>

                        <form 
                        method="post" 
                        style={{paddingBottom: '35px'}}
                        onChange={handleOnChhange}
                        onSubmit={handleSubmit}>
                            <div className="form-field" style={{width: "100%"}}>
                                <div className="input-wrapper" >
                                    <input type="text" required id="code" />
                                    <label htmlFor="code">Verification code</label>
                                </div>
                            </div>
                            
                            <div className="input-details" style={{paddingBottom: '0px'}}>

                                <div className="form-field">
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <input type="text" required id="email" />
                                            <label>Email</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <input type="text" required id="username" />
                                            <label>Username</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <input type="text" required id="first_name" />
                                            <label>First name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <input type="text" required id="last_name" />
                                            <label>Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <input type="password" required id="password" />
                                            <label>Password</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <input type="password" required id="password_repeat" />
                                            <label>Password repeat</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <input
                                type="submit"
                                value="COMPLETE"
                                className="button-login"
                                style={{marginTop: '30px'}}
                            />
                        </form>
                    </div>
                </div>
                
            </div>
    </>
}