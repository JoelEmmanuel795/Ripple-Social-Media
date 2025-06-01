import { useEffect, useState } from 'react';
import SignupEmailForm from '../components/SignupEmailForm/SignupEmailForm';

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [emailFormData, setEmailFormData] = useState({ email: '' });
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });

    const nextStep = () => setStep((prev) => prev + 1);

    useEffect(() => {
        console.log(emailFormData);
    }, [emailFormData]);

    return (
        <>
            {step === 1 && (
                <SignupEmailForm
                    setFormData={(email) => setEmailFormData({ email })}
                    goNext={nextStep}
                />
            )}
            {step === 2 && <>Step 2</>}
            {step === 3 && <>Step 3</>}
        </>
    );
}
