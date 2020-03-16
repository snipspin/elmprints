import React from 'react'
import {Box, Input, InputLabel, FormControl, Button} from '@material-ui/core'
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
		<div>
		<Box className="address-form">
			<FormControl>
				<InputLabel htmlFor="addressFullName">Full Name:</InputLabel>
				<Input id="fullName" name="addressFullName" aria-describedby="full name form" />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="addrLineOne">Address Line 1:</InputLabel>
				<Input name="addrLineOne" aria-describedby="address line one form" />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="addrLineTwo">Address Line 2:</InputLabel>
				<Input name="addrLineTwo" aria-describedby="address line two form" />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="addrCity">City:</InputLabel>
				<Input name="addrCity" aria-describedby="address city form" />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="addrState">State:</InputLabel>
				<Input name="addrState" aria-describedby="address state form" />
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="addrZip">Zip Code:</InputLabel>
				<Input name="addrZip" aria-describedby="address zip code form" />
			</FormControl>

			
		</Box>
		<Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
		</div>
	)
}
export default ProfileAddressForm