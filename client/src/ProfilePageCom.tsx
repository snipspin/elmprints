import React, {useState, MouseEvent} from 'react'
import { Redirect, Link, LinkProps } from 'react-router-dom'
import {Grid, Button} from '@material-ui/core'
import ProfileUserInfo from './ProfileUserInfo'
import {Omit} from '@material-ui/types'
import CartItem from './CartItem'
import {Decoded} from './App'
import {User, Item} from './dec'
    
    export interface ProfilePageComProps {
        user: Decoded | null,
        updateUser: (newToken: string | null) => void
    }
    const LinkBehavior = React.forwardRef<any, Omit<LinkProps, 'to'>>((props,ref) => (
        <Link ref={ref} to="/cart/payment" {...props} />
    ))     
    const ProfilePageCom: React.FC<ProfilePageComProps> = (props) => {
        const [userCart, setUserCart] = useState<Array<Item>>([])
        const [viewHistory, setViewHistory] = useState<boolean>(false)
        if(!props.user) {
            return <Redirect to="/login" />
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
        		// alignItems="center"
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
                            id={currItem._id} 
                            item={currItem.item}
                            imgUrl={currItem.imgUrl}
                            price={currItem.price}
                            imageID={currItem.imageID}
                            sourceID={currItem.sourceID}
                        />                        
                        ))}   
                        <Button style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px"}} variant="contained" color="primary" onClick={e => handleDeleteCart(e)}>Clear Cart</Button>
                        <Button component={LinkBehavior} style={{marginTop: "20px", marginBottom: "20px", marginLeft: "10px"}} variant="contained" color="primary">Checkout</Button>
                        <br />
                        <Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={e => handlePurchaseHistory(e)}>View Purchase History</Button>
                    </div>
                </Grid>
        	</Grid>
        )
        	
    }
    
export default ProfilePageCom