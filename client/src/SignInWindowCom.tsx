import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
import { Decoded } from './App'
import { Redirect } from 'react-router-dom'
export interface SigninProps {
	user: Decoded | null,
	updateUser: (newToken: string | null) => void
}

const SignInWindowCom: React.FC<SigninProps> = (props) => {
	let [email, setEmail] = useState('')
	let [password, setPassword] = useState('')
	let [message, setMessage] = useState('')
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
	if(props.user) {
		return <Redirect to="/profile" />
	}
   	return(
   		<Box className="sign-up-box">
   			<FormControl>
   				<InputLabel htmlFor="email">Email:</InputLabel>
   				<Input name="email" aria-describedby="email form"
   				onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required />
   			</FormControl>
   			<FormControl>
   				<InputLabel htmlFor="password">Password:</InputLabel>
   				<Input name="password" aria-describedby="password email"
   				onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} required />
   			</FormControl>
   			<Button onClick={(e: MouseEvent<HTMLButtonElement>)  => handleSubmit(e)} variant="contained" color="primary" className="submit-button">Sign In</Button>
   		</Box>
    )
}
export default SignInWindowCom