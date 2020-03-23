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
            }).catch((err: Error) => {
                console.log(`Error: ${err.toString()}`)
            })
        }
                    
    }

	return (
		<Grid
			container
			direction="row"
			justify="space-evenly"
			alignItems="center"
		>
			<Grid item xs={4} offset-xs={1}>
				<img className="posterImg" src={props.imgUrl} height="200px" />	
			</Grid>
			<Grid item xs={3}>
				<h3>{props.item}</h3>
			</Grid>
			<Grid item xs={2}>
				<h3>${props.price}</h3>
			</Grid>
			<Grid item xs={2}>
				<Button variant="contained" color="primary"  onClick={(e: MouseEvent<HTMLButtonElement>) => handleDeleteItem(e)}>
					<DeleteOutlinedIcon stroke={"black"} strokeWidth={0.5} style={{color: "rgba(255, 255, 255, .90)"}} fontSize="large" />
				</Button>
			</Grid>
		</Grid>
	)
}
export default CartItem