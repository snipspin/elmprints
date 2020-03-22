import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react'
import {Box, FormControl, Input, InputLabel, Button, BoxProps} from '@material-ui/core'
import {Decoded} from './App'
import {Redirect} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface SignupProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SignUpCom: React.FC<SignupProps> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [redirect, setRedirect] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false);
    const [passwordInfo, setPasswordInfo] = useState<boolean>(false)

    useEffect(() => {
        setMessage('')
    }, [firstname, lastname, email, password])
    
    const handleOpen = ():void => {
        setOpen(true)
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
    
        setOpen(false);
      }
    
    const checkLength = (event: React.FocusEvent,
        minLen: number):void => {
        let target = event.target as HTMLInputElement
            if (target.value.length < minLen ) {
                setMessage('Password has to be 12 characters long')
            handleOpen();
        }
    }



    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let data: object = {
            email,
            firstname,
            lastname,
            password
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((response: Response) => {
            response.json().then(result => {
                if(response.ok) {
                    props.updateUser(result.token)
                } else {
                    setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                }
            }).catch( (err: Error) => console.log(err))
        }).catch( (err: Error) => {
            console.log('Error', err)
            setMessage(`Error: ${err.toString()}`)
        })
    }
    if(props.user) {
        return <Redirect to="/profile" />
    }
    const handleRedirect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setRedirect(true)
    }
    if(redirect) {
        return <Redirect to="/login" />
    }

    return(
        <Box className="sign-up-box">
            <Box className="sign-in-from-sign-up">
                <span className="italic">Already have an account?</span>
                <p className="login">Login here:
                    <Button onClick={(e: MouseEvent<HTMLButtonElement>) => handleRedirect(e)} variant="contained" color="primary" className="sign-up-to-sign-in">Sign In</Button>
                </p>
            </Box>
            <h2 className="signup">Create an Account:</h2>
            <FormControl>
                <InputLabel htmlFor="firstname">First Name:</InputLabel>
                <Input id="first-name" name="firstname" aria-describedby="first-name-form" 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstname(e.currentTarget.value)} required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="last-name">Last Name:</InputLabel>
                <Input id="last-name" name="lastname" aria-describedby="last-name-form" 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLastname(e.currentTarget.value)} required />
            </FormControl>                
            <FormControl>
                <InputLabel htmlFor="email">Email:</InputLabel>
                <Input id="email" name="email" aria-describedby="email-form" 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input type="password" name="password" aria-describedby="password-form" 
                onBlur={(e) =>{
                    checkLength(e, 12)
                    setPasswordInfo(false)
                }}
                onFocus={(e) => setPasswordInfo(true)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required/>
            </FormControl>
            <Box className="password-info">
            <span>{passwordInfo ? 'Password is required to be 12 characters long':''}</span>
            </Box>
            <Button style={{marginTop: "20px"}} onClick={e => handleSubmit(e)} variant="contained" color="primary" className="submit-button">Sign Up</Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
        </Box>
    )
}
export default SignUpCom