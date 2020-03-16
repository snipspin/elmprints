import React, {useState} from 'react'
import {Button, Grid, Checkbox} from '@material-ui/core'
import ProfileAddressForm from './ProfileAddressForm'
const ProfileUserInfo: React.FC<any> = (props) => {
	const [addressForm, setAddressForm] = useState(false)
	const handleButtonClick = () : void => {
		if (!addressForm) {
			setAddressForm(true)
		} else {
			setAddressForm(false)
		}
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
				<span>Username</span>
			</Grid>
			<Grid item xs={12}>
				<span>Email</span>
			</Grid>
            <Grid item xs={12}>
        		{addressForm ? <ProfileAddressForm display={addressForm} onSubmit={handleButtonClick}/> : <Button variant="contained" color="primary" onClick={handleButtonClick}>Add billing address</Button>}
            </Grid>
			<Grid item xs={12}>
                Use billing address for shipping?<Checkbox value="sameAsBilling" inputProps={{ 'aria-label': 'Use billing address for shipping?'}} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">Add shipping address</Button>
            </Grid>
        </Grid>
		)
	}
export default ProfileUserInfo