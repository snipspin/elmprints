import React, {useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import {Grid, Box, Input, InputLabel, FormControl, Button} from '@material-ui/core'
import {Decoded} from './App'
export interface AddressProps {
	addressType: boolean, //if false address to add is billing and true is shipping
	display: boolean,
	onSubmit(): any
	user: Decoded,
	updateUser: (newToken: string | null) => void
}
const ProfileAddressForm: React.FC<AddressProps> = (props) => {
	let [streetOne, setStreetOne] = useState<string>('')
	let [streetTwo, setStreetTwo] = useState<string>('')
	let [city, setCity] = useState<string>('')
	let [state, setState] = useState<string>('')
	let [zipcode, setZipcode] = useState<string>('')
	let [message, setMessage] = useState<string>('')

	useEffect(() => {
		setMessage('')
	},[streetOne, streetTwo, city, state, zipcode])

	const handleSubmit = (e : MouseEvent<HTMLButtonElement>) : void => {
		e.preventDefault()
		let email = props.user.email
		let addressType = props.addressType ? 'shipping' : 'billing'
		let data: object = {
			email,
			streetOne,
			streetTwo,
			city,
			state,
			zipcode
		}
		fetch(`${process.env.REACT_APP_SERVER_URL}/auth/profile/${addressType}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type' : 'application/json'
			}
		})
		.then((response: Response) => {
			response.json().then(result => {
				if(response.ok) {
					props.updateUser(result.token)
					props.onSubmit()
				} else {
					setMessage(`${response.status} ${response.statusText}: ${result.message}`)
				}
			}).catch((err: Error) => console.log(err))
		}).catch((err: Error) => {
			setMessage(`Error: ${err.toString()}`)
		})
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
						<InputLabel htmlFor="streetOne">Address Line 1:</InputLabel>
							<Input name="streetOne" aria-describedby="address line one form" 
							onChange={(e: ChangeEvent<HTMLInputElement>) => setStreetOne(e.currentTarget.value)} />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="streetTwo">Address Line 2:</InputLabel>
						<Input name="streetTwo" aria-describedby="address line two form" 
						onChange={(e: ChangeEvent<HTMLInputElement>) => setStreetTwo(e.currentTarget.value)} />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="city">City:</InputLabel>
						<Input name="city" aria-describedby="address city form" 
						onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.currentTarget.value)} />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="state">State:</InputLabel>
						<Input name="state" aria-describedby="address state form" 
						onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.currentTarget.value)} />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<FormControl>
						<InputLabel htmlFor="zipcode">Zip Code:</InputLabel>
						<Input name="zipcode" aria-describedby="address zip code form" 
						onChange={(e: ChangeEvent<HTMLInputElement>) => setZipcode(e.currentTarget.value)} />
					</FormControl>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Button variant="contained" color="primary" onClick={(e: MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>Submit</Button>
			</Grid>
		</Grid>
	)
}
export default ProfileAddressForm