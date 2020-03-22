import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
import { Decoded } from './App'
import { Redirect, Link } from 'react-router-dom'
export interface SigninProps {
	user: Decoded | null,
	updateUser: (newToken: string | null) => void
}

const SignInWindowCom: React.FC<SigninProps> = (props) => {
	let [email, setEmail] = useState<string>('')
	let [password, setPassword] = useState<string>('')
	let [message, setMessage] = useState<string>('')
	let [redirect, setRedirect] = useState<boolean>(false)
	useEffect(() => {
		setMessage('')
	}, [email, password])
	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		let data: object = {
			email,
			password
		}
		fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		.then((response: Response) => {
			response.json().then(result => {
				if(response.ok) {
					props.updateUser(result.token)
				} else {
					setMessage(`${response.status} ${response.statusText}: ${result.message}`)
				}
			}).catch((err: Error) => console.log(err))
		}).catch((err: Error) => {
			setMessage(`Error: ${err.toString()}`)
		})
	}
	const handleRedirect = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setRedirect(true)
	}
	if(props.user) {
		return <Redirect to="/profile" />
	}
	if(redirect) {
		return <Redirect to="/" />
	}
   	return(
   		<Box className="sign-up-box">
   			<Box>
   				 <span className="italic">Don't have an account?</span>
					 <p className="signup">Create one here: &nbsp;
   					<Button onClick={(e: MouseEvent<HTMLButtonElement>) => handleRedirect(e)} variant="contained" color="primary" className="sign-up-button">Sign up</Button>
					 </p>
   			</Box>
				<h2 className="login">Login:</h2>
   			<FormControl>
   				<InputLabel htmlFor="email">Email:</InputLabel>
   				<Input name="email" aria-describedby="email form"
   				onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required />
   			</FormControl>
   			<FormControl>
   				<InputLabel htmlFor="password">Password:</InputLabel>
   				<Input name="password" type="password" aria-describedby="password email"
   				onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required />
   			</FormControl>
   			<Button style={{marginTop: "20px"}} onClick={(e: MouseEvent<HTMLButtonElement>)  => handleSubmit(e)} variant="contained" color="primary" className="submit-button">Sign In</Button>
   		</Box>
    )
}
export default SignInWindowCom