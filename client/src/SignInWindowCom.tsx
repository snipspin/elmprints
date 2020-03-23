import React, {useEffect, useState, ChangeEvent, MouseEvent} from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
import { Decoded } from './App'
import { Redirect, Link } from 'react-router-dom'
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
export interface SigninProps {
	user: Decoded | null,
	updateUser: (newToken: string | null) => void
}
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
const SignInWindowCom: React.FC<SigninProps> = (props) => {
	let [email, setEmail] = useState<string>('')
	let [password, setPassword] = useState<string>('')
	let [message, setMessage] = useState<string>('')
	let [redirect, setRedirect] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>(false)
    const position: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'center'
    }

	useEffect(() => {
		setMessage('')
	}, [email, password])
    const handleOpen = ():void => {
        setOpen(true)
    }
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
    
        setOpen(false);
    }    
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
					handleOpen()
				}
			}).catch((err: Error) => {
				console.log(err)
				handleOpen()
			})
		}).catch((err: Error) => {
			handleOpen()
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
        	<Snackbar anchorOrigin={position} open={open} autoHideDuration={6000} onClose={handleClose}>
        		<Alert onClose={handleClose} severity="error">
          			{message}
        		</Alert>
      		</Snackbar>   		
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