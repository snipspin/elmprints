import React from 'react'
import {Grid} from '@material-ui/core'
export interface CartItemProps {
	item: string,
	price: string,
	imageID: string,
	imgUrl: string,
	sourceID: string

}
const CartItem: React.FC<CartItemProps> = (props) => {
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
			<Grid item xs={4}>
				<h3>{props.item}</h3>
			</Grid>
			<Grid item xs={3}>
				<h3>${props.price}</h3>
			</Grid>
		</Grid>
	)
}
export default CartItem