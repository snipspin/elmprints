import React, {useState, MouseEvent} from 'react'
import {Grid, Button} from '@material-ui/core'
import {ProductInformation} from './dec'
import {Decoded} from './App'
import {Link, Redirect} from 'react-router-dom'
import ReceiptItem from './ReceiptItem'
export interface ReceiptPageComProps {
    user: Decoded | null,
    currentProduct: ProductInformation,
    updateUser: (newToken: string | null) => void
}

const space = '  '
const ReceiptPageCom: React.FC<ReceiptPageComProps> = (props) => {
        const [resetCart, setResetCart] = useState<boolean>(false)
		if(!props.user) {
			return <Redirect to="/" />
		}
        const handleDeleteCart = (e: MouseEvent<HTMLButtonElement>) => {
            if(props.user){
                let email = props.user.email
                let cartID = props.user.shoppingCart    
                let data = {
                  email,
                  cartID
                }
                fetch(`${process.env.REACT_APP_SERVER_URL}/cart/delete`, {
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
                           setResetCart(true)                  
                        } else {
                            console.log(`${response.status} ${response.statusText}: ${result.message}`)
                        }
                    }).catch(err => console.log(err))
                })
                .catch(err => {
                    console.log(`Error: ${err.toString()}`)
                })  
            }
        }
        if(resetCart) {
            return <Redirect to="/posters" />
        }
        return(
            <Grid
            	container
            	spacing={1}
            	justify="space-between"
            	alignItems="center"
            >	
            	<Grid item md={6} xs={12}>
                    <Grid container
                          spacing={1}
                          justify="space-between"
                          alignItems="center"
                    >
                    <div className="shoppingCartDiv">
                    <Grid item xs={12}>
                    <h3>Purchased Items</h3>
                    </Grid>
                    <Grid item xs={12}>
                    {props.user.shoppingCart.map((currItem,i) => (
                        
                    <ReceiptItem
                        key={i} 
                        item={currItem.item}
                        imgUrl={currItem.imgUrl}
                        price={currItem.price}
                        imageID={currItem.imageID}
                        sourceID={currItem.sourceID}
                    />
                   ))}
                   </Grid> 
                   </div>
                   </Grid>
            	</Grid>
            	<Grid item md={6} xs={12}>
                    <Grid container
                          spacing={1}
                          justify="space-between"
                          alignItems="center"
                    >
                        <Grid item xs={12}>
            		        <h3>Shipping to: </h3>
                        </Grid>
            	        <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            	<Grid item xs={12}>

                    <Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={(e: MouseEvent<HTMLButtonElement>) => handleDeleteCart(e)}>Continue Browsing</Button>
            	</Grid>

            </Grid>
        )
}
export default ReceiptPageCom