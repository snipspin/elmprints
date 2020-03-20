import React from 'react'
import {Grid} from '@material-ui/core'
import {ProductInformation} from './dec'
import {Decoded} from './App'
import {Link, Redirect} from 'react-router-dom'

export interface ReceiptPageComProps {
    user: Decoded | null,
    currentProduct: ProductInformation 
}

const space = '  '
const ReceiptPageCom: React.FC<ReceiptPageComProps> = (props) => {
		if(!props.user) {
			return <Redirect to="/" />
		}
        return(
            <Grid
            	container
            	spacing={1}
            	justify="space-between"
            	alignItems="center"
            >	
            	<Grid item xs={6}>
            		<h3>Successfully purchased poster: </h3>
            	</Grid>
            	<Grid item xs={6}>
            		<img src={props.currentProduct.imagePath}/>
            	</Grid>
            	<Grid item xs={6}>
            		<h3>Shipping to: </h3>
            	</Grid>
            	<Grid item xs={6}>
            		<Grid container spacing={1}
            			direction="column"
            			justify="space-evenly"
            			alignItems="center"
            		>
            			<Grid item xs={12}>Shipping address:</Grid>
          				<Grid item xs={12}>{props.user.shippingAddress.streetOne}</Grid>
          				{props.user.shippingAddress.streetTwo && <Grid item xs={12}>{props.user.shippingAddress.streetTwo}</Grid>}
          				<Grid item xs={12}>
            				{props.user.shippingAddress.city}<span>{space}</span>
            				{props.user.shippingAddress.state}<span>{space}</span>
							{props.user.shippingAddress.zipcode}
          				</Grid>
            		</Grid>
            	</Grid>
            	<Grid item xs={12}>
            		<Link to="/posters">Continue Browsing</Link>
            	</Grid>
            	<Grid>
            		<Link to="/profile">Go to profile</Link>
            	</Grid>

            </Grid>
        )
}
export default ReceiptPageCom