import React from 'react'
import {Grid, Box, Input, InputLabel, FormControl, Button} from '@material-ui/core'
export interface AddressProps {
	display: boolean
	onSubmit(): any
}
const ProfileAddressForm: React.FC<AddressProps> = (props) => {
	const handleSubmit = (e : React.MouseEvent<HTMLButtonElement,  MouseEvent>) : void => {
		e.preventDefault()
		props.onSubmit()
	}
	return (

		<Grid
            container
            spacing={2}
            direction="column"
            justify="space-evenly"
            alignItems="center"
        >
        	<Grid item xs={12}>
        		<Box>
					<FormControl>
						<InputLabel htmlFor="addressFullName">Full Name:</InputLabel>
						<Input id="fullName" name="addressFullName" aria-describedby="full name form" />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="addrLineOne">Address Line 1:</InputLabel>
						<Input name="addrLineOne" aria-describedby="address line one form" />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="addrLineTwo">Address Line 2:</InputLabel>
						<Input name="addrLineTwo" aria-describedby="address line two form" />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="addrCity">City:</InputLabel>
						<Input name="addrCity" aria-describedby="address city form" />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="addrState">State:</InputLabel>
						<Input name="addrState" aria-describedby="address state form" />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="addrZip">Zip Code:</InputLabel>
						<Input name="addrZip" aria-describedby="address zip code form" />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
			</Grid>
		</Grid>
	)
}
export default ProfileAddressForm