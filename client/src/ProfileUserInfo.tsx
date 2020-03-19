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
	const [billingAddressForm, setBillingAddressForm] = useState<boolean>(false)
	const [shippingAddressForm, setShippingAddressForm] = useState<boolean>(false)
	const [billingOrShipping, setBillingOrShipping] = useState<boolean>(false) //false indicated billing and true is shipping
	const [sameAddress, setSameAddress] = useState<boolean>(false)

	const handleBillingButtonClick = () : void => {
		if (!billingAddressForm) {
			setBillingAddressForm(true)
		} else {
			setBillingAddressForm(false)
		}
		setBillingOrShipping(false)
	}
	const handleShippingButtonClick = () : void => {
		if(!shippingAddressForm) {
			setShippingAddressForm(true)

		} else {
			setShippingAddressForm(false)
		}
		setBillingOrShipping(true)
	}
	const handleCheckboxClick = (): void => {
		setSameAddress(true)
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

		>	<Grid item xs={12}></Grid>
			<Grid item xs={12}>
				<span>{props.user.firstname}  {props.user.lastname}</span>
			</Grid>
			<Grid item xs={12}>
				<span>{props.user.email}</span>
			</Grid>
			{props.user.billingAddress && <Grid item xs={12}><span>Billing Address</span></Grid>}
			{props.user.billingAddress && <Grid item xs={12}><span>{props.user.billingAddress.streetOne}</span></Grid>}
            {props.user.billingAddress.streetTwo && <Grid item xs={12}><span>{props.user.billingAddress.streetTwo}</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>{props.user.billingAddress.city}</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>{props.user.billingAddress.state}</span></Grid>}
            {props.user.billingAddress && <Grid item xs={12}><span>{props.user.billingAddress.zipcode}</span></Grid>}
            {!props.user.billingAddress && 
            <Grid item xs={12}>
            	{!props.user.billingAddress && 
            		<Box>
        				{billingAddressForm ? <ProfileAddressForm display={billingAddressForm} onSubmit={handleBillingButtonClick} updateUser={props.updateUser} user={props.user} addressType={billingOrShipping} sameAddress={sameAddress} /> : <Button variant="contained" color="primary" onClick={handleBillingButtonClick}>Add billing address</Button>}
            		</Box>
            	}
            </Grid>
        	}
        	{props.user.billingAddress && 
				<Grid item xs={12}>
					<Box>
                		Use billing address for shipping?<Checkbox value="sameAsBilling" inputProps={{ 'aria-label': 'Use billing address for shipping?'}} onClick={handleCheckboxClick}/>
            		</Box>
            	</Grid>
        	}
            <Grid item xs={12}>
            	<Box>
                	{shippingAddressForm ? 
                		<ProfileAddressForm display={shippingAddressForm} onSubmit={handleShippingButtonClick} updateUser={props.updateUser} user={props.user} addressType={billingOrShipping} sameAddress={sameAddress} /> : 
                		<Button variant="contained" color="primary" onClick={handleShippingButtonClick}>Add shipping address</Button>
                	}
                </Box>
            </Grid>
        </Grid>
		)
	}
export default ProfileUserInfo