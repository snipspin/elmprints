import React, {MouseEvent} from 'react'
import {Grid, Button} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import {Decoded} from './App'

export interface CartItemProps {
	id: string,
	item: string,
	price: string,
	imageID: string,
	imgUrl: string,
	sourceID: string,
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const CartItem: React.FC<CartItemProps> = (props) => {
    const handleDeleteItem = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(props.user){
            let email = props.user.email
            let cartID = props.user.shoppingCart
            let productID = props.id    
            let data: object = {
                email,
                cartID,
                productID
            }          
        
            fetch(`${process.env.REACT_APP_SERVER_URL}/cart/remove`, {
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
                    } else {
                        console.log(`${response.status} ${response.statusText}: ${result.message}`)
                    }
                }).catch((err: Error) => console.log(err))
            })
            .catch((err: Error) => {
                console.log(`Error: ${err.toString()}`)
            })
        }
    }

	return (
        <>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                className="cartItemDiv"
            >
                <Grid container>
                    <Grid item xs={5} className="posterImgDiv">
                        <img className="cartImg" src={props.imgUrl} height="200px" />	
                    </Grid>
                    <Grid item xs={4}>
                        <h3>{props.item}</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <h3>${props.price}</h3>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary"  onClick={(e: MouseEvent<HTMLButtonElement>) => handleDeleteItem(e)}>
                            <DeleteOutlinedIcon stroke={"black"} strokeWidth={0.5} style={{color: "rgba(255, 255, 255, .90)"}} fontSize="large" />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
	)
}
export default CartItem