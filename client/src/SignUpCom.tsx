import React from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
    const SignUpCom: React.FC<any> = (props) => {
        return(
            <Box className="sign-up-box">
                <Box className="sign-in-from-sign-up">
            	    Already have an account? Login here:
            	    <Button variant="contained" color="primary" className="sign-up-to-sign-in">Sign In</Button>
                </Box>
            	<FormControl>
            		<InputLabel htmlFor="first-name">First Name:</InputLabel>
            		<Input id="first-name" aria-describedby="first-name-form" />
            	</FormControl>
                <FormControl>
                    <InputLabel htmlFor="last-name">Last Name:</InputLabel>
                    <Input id="first-name" aria-describedby="last-name-form" />
                </FormControl>                
                <FormControl>
                    <InputLabel htmlFor="email">Email:</InputLabel>
                    <Input id="email" aria-describedby="email-form" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <Input id="password" aria-describedby="password-form" />
                </FormControl>
                <Button variant="contained" color="primary" className="submit-button">Sign Up</Button>
            </Box>

        )
    }
export default SignUpCom