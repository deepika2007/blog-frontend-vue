import React, { useState } from 'react'
import { Button } from '@mui/material';
import Signup from '../component/dialog/signup';
import Signin from '../component/dialog/signin';
import ForgotPassword from '../component/dialog/forgot';

const MasterComponent = () => {
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [forgot, setForgot] = useState(false);

    const handleSignIn = () => {
        setRegister(false)
        setLogin(true)
        setForgot(false)
    }

    const handleSignUp = () => {
        setLogin(false)
        setRegister(true)
    }

    const handleForgot = () => {
        setForgot(true)
        setLogin(false)
    }
    return (
        <>
            
            <Button variant='contained' onClick={() => setRegister(true)}>Sign Up</Button>
            {register && <Signup
                open={register}
                handleClose={() => setRegister(true)}
                handleSignIn={() => handleSignIn()}
            />}
            {login && <Signin
                open={login}
                handleClose={() => setLogin(true)}
                handleSignUp={() => handleSignUp()}
                handleForgot={() => handleForgot()}
            />}
            {forgot && <ForgotPassword
                open={forgot}
                handleClose={() => setForgot(true)}
                handleSignIn={() => handleSignIn()}
            />}
        </>
    )
}
export default MasterComponent;