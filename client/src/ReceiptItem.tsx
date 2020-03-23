import React from 'react'
import {Grid, Button} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import {Decoded} from './App'
export interface ReceiptItemProps {

	item: string,
	price: string,
	imageID: string,
	imgUrl: string,
	sourceID: string

}
const ReceiptItem: React.FC<ReceiptItemProps> = (props) => {
	return (
		<Grid
			container
			direction="row"
			spacing={1}
			justify="space-evenly"
			alignItems="center"
		>
			<Grid item xs={4}>
				<img className="posterImg" src={props.imgUrl} height="200px" />	
			</Grid>
			<Grid item xs={4}>
				<h3>{props.item}</h3>
			</Grid>
			<Grid item xs={4}>
				<h3>${props.price}</h3>
			</Grid>
		</Grid>
	)
}
export default ReceiptItem