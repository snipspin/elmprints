import React from 'react'
import {Redirect} from 'react-router-dom'
import {Grid, Button} from '@material-ui/core'
import {Decoded} from './App'
import CartItem from './CartItem'

export interface PurchaseHistoryProps {
	user: Decoded | null
}
const PurchaseHistory: React.FC<PurchaseHistoryProps> = (props) => {
	return(
		<Grid
			container
			spacing={1}
			direction="column-reverse"
			justify="space-between"
			alignItems="center"
		>
        	<Grid item xs={12}>
            	<Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={() => {return <Redirect to="/" />}}>Continue Browsing</Button>
        	</Grid>
           	{props.user && 
           		<div className="ShoppingCartDiv">
            	{props.user.orderHistory.map((currItem,i) => (  
            	<Grid item xs={12}>                      
                	<CartItem
                        key={i} 
                        item={currItem.item}
                        imgUrl={currItem.imgUrl}
                        price={currItem.price}
                        imageID={currItem.imageID}
                        sourceID={currItem.sourceID}
                	/>
               	</Grid>
            ))}
			</div>
            }
    		<Grid item xs={12}>
            	<h3>Purchase History</h3>
           	</Grid>
	</Grid>
	)
}
export default PurchaseHistory