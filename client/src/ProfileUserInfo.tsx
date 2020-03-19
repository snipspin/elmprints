import React, {useState} from 'react'
import {Button, Grid, Checkbox, Box} from '@material-ui/core'
import ProfileAddressForm from './ProfileAddressForm'
import {Decoded} from './App'
import {User} from './dec' 
import {Redirect} from 'react-router-dom' 
export interface ProfileUserInfoProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const ProfileUserInfo: React.FC<ProfileUserInfoProps> = (props) => {
	const [addressForm, setAddressForm] = useState(false)
	const handleButtonClick = () : void => {
		if (!addressForm) {
			setAddressForm(true)
		} else {
			setAddressForm(false)
		}
	}

	if(!props.user) {
		return <Redirect to="/posters" />
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
				<span>{props.user.firstname}  {props.user.lastname}</span>
			</Grid>
			<Grid item xs={12}>
				<span>{props.user.email}</span>
			</Grid>
			{props.user.billingAddress && <Grid item xs={12}><span>props.user.billingAddress.streetOne</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>props.user.billingAddress.streetTwo</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>props.user.billingAddress.city</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>props.user.billingAddress.state</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>props.user.billingAddress.zipcode</span></Grid>}
            <Grid item xs={12}>
            	{!props.user.billingAddress && 
            		<Box>
        				{addressForm ? <ProfileAddressForm display={addressForm} onSubmit={handleButtonClick} updateUser={props.updateUser} user={props.user} /> : <Button variant="contained" color="primary" onClick={handleButtonClick}>Add billing address</Button>}
            		</Box>
            	}
            </Grid>
			<Grid item xs={12}>
				<Box>
                	Use billing address for shipping?<Checkbox value="sameAsBilling" inputProps={{ 'aria-label': 'Use billing address for shipping?'}} />
            	</Box>
            </Grid>
            <Grid item xs={12}>
            	<Box>
                	<Button variant="contained" color="primary">Add shipping address</Button>
                </Box>
            </Grid>
        </Grid>
		)
	}
export default ProfileUserInfo