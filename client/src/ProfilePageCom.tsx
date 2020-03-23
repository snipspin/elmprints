import React, {useState, MouseEvent} from 'react'
import { Redirect, Link } from 'react-router-dom'
import {Grid, Button, Checkbox, TextField, IconButton, FormControl, InputLabel, Select } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ProfileUserInfo from './ProfileUserInfo'
import CartItem from './CartItem'
import {CartItemProps} from './CartItem'
import styles from './styles';
import {Decoded} from './App'
import {User, Item} from './dec'  

    export interface ProfilePageComProps {
        user: Decoded | null,
        updateUser: (newToken: string | null) => void
    }    
    const ProfilePageCom: React.FC<ProfilePageComProps> = (props) => {
        const [userCart, setUserCart] = useState<Array<Item>>([])
        const [viewHistory, setViewHistory] = useState<boolean>(false)
        if(!props.user) {
            return <Redirect to="/posters" />
        }
        const handlePurchaseHistory = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            setViewHistory(true)
        }
        if(viewHistory){
            return <Redirect to="/purchases" />
        }
        const handleDeleteCart = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            if(props.user){
                let email = props.user.email
                let cartID = props.user.shoppingCart    
                let data: object = {
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
                        } else {
                            console.log(`${response.status} ${response.statusText}: ${result.message}`)
                        }
                    }).catch((err: Error) => console.log(err))
                }).catch((err: Error) => {
                    console.log(`Error: ${err.toString()}`)
                })
            }
                    
        }
         if(viewHistory){
            setViewHistory(false)
            return <Redirect to="/purchases" />
        }        
        return(
        	<Grid 
        		container 
        		direction="row"
        		justify="space-evenly"
        		alignItems="center"
        	>   
                <Grid item md={6} xs={12}>
                    <ProfileUserInfo user={props.user} updateUser={props.updateUser} />
        		</Grid>
                <Grid item md={6} xs={12}>
                    <div className="shoppingCartDiv">
                        <h3>Shopping Cart</h3>
                        {props.user.shoppingCart.map((currItem,i) => (
                        
                        <CartItem
                            user={props.user}
                            updateUser={props.updateUser}
                            key={i} 
                            item={currItem.item}
                            imgUrl={currItem.imgUrl}
                            price={currItem.price}
                            imageID={currItem.imageID}
                            sourceID={currItem.sourceID}
                        />                        
                        ))}   
                        <Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={e => handleDeleteCart(e)}>Clear Cart</Button>
                        <Link to="/cart/payment">Proceed To Checkout</Link>
                    </div>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={e => handlePurchaseHistory(e)}>View Purchase History</Button>
                </Grid>
        	</Grid>
        )
        	
    }
    
export default ProfilePageCom