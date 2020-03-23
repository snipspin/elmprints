import React, {MouseEvent, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Grid, Button} from '@material-ui/core'
import {Decoded} from './App'
import ReceiptItem from './ReceiptItem'

export interface PurchaseHistoryProps {
	user: Decoded | null,
    updateUser: (newToken: string | null) => void    
}
const PurchaseHistory: React.FC<PurchaseHistoryProps> = (props) => {
    const [sendRedirect, setSendRedirect] = useState<boolean>(false)
    const handleRedirect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSendRedirect(true)
    }
    if(sendRedirect) {
        return <Redirect to="/" />
    }
	return(
		<Grid
			container
			spacing={1}
            direction="column"
            justify="space-evenly"
		>
            <Grid item xs={12}>
                <h3>Purchase History</h3>
            </Grid>
           	{props.user && 
           		<div>
            	{props.user.orderHistory.map((currItem,i) => (  
            	<Grid item xs>                      
                	<ReceiptItem
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
                <Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={(e: MouseEvent<HTMLButtonElement>) => handleRedirect(e)}>Continue Browsing</Button>
            </Grid>            
	</Grid>
	)
}
export default PurchaseHistory