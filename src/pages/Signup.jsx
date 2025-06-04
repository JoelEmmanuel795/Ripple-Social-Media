import { useEffect, useState } from 'react';
import SignupEmailForm from '../components/SignupEmailForm/SignupEmailForm';
import SignupConfirmation from '../components/SignupConfirmation/SignupConfirmation';
import useFetch from '../utils/useFetch';





export default function SignUp() {
    const [step, setStep] = useState(1);
    const [emailFormData, setEmailFormData] = useState({ email: '' });
    
    const {sendRequest, resData, error, isError} = useFetch()
    

    const nextStep = () => setStep((prev) => prev + 1);

    useEffect(() => {
        if(emailFormData.email){
            sendRequest('/auth/registration/', emailFormData, 'post')
            console.log('Main SignUp', emailFormData);
            console.log('resData: 123', resData);
        }
        
        
    }, [emailFormData]);

    
    

    return (
        <>
            {step === 1 && (
                <SignupEmailForm
                    setFormData={(email) => setEmailFormData({ email })}
                    goNext={nextStep}
                />
            )}
            {step === 2 && (
                <SignupConfirmation
                    email={emailFormData.email}
                />
            )}
            
        </>
    ); 
}
