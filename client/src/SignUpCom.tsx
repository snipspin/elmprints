import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
import {Decoded} from './App'
import {Redirect} from 'react-router-dom'
export interface SignupProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const SignUpCom: React.FC<SignupProps> = (props) => {
    let [email, setEmail] = useState('')
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')
    let [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setMessage('')
    }, [firstname, lastname, email, password])
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('in handle submit function')
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
                Already have an account? Login here:
                <Button onClick={(e: MouseEvent<HTMLButtonElement>) => handleRedirect(e)} variant="contained" color="primary" className="sign-up-to-sign-in">Sign In</Button>
            </Box>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required/>
            </FormControl>
            <Button onClick={e => handleSubmit(e)} variant="contained" color="primary" className="submit-button">Sign Up</Button>
        </Box>
    )
}
export default SignUpCom