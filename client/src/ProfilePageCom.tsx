import React, {useState, MouseEvent} from 'react'
import { Redirect } from 'react-router-dom'
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
        if(!props.user) {
            return <Redirect to="/posters" />
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
        return(
        	<Grid 
        		container 
        		direction="row"
        		justify="space-evenly"
        		alignItems="center"
        	>   
                <Grid item xs={6}>
                    <ProfileUserInfo user={props.user} updateUser={props.updateUser} />
        		</Grid>
                <Grid item xs={6}>
                    <h3>Shopping Cart</h3>
                    {props.user.shoppingCart.map((currItem,i) => (
                    
                        <CartItem
                            key={i} 
                            item={currItem.item}
                            imgUrl={currItem.imgUrl}
                            price={currItem.price}
                            imageID={currItem.imageID}
                            sourceID={currItem.sourceID}
                        />
                    ))}   
                    <Button variant="contained" color="primary" onClick={(e: MouseEvent<HTMLButtonElement>) => handleDeleteCart(e)}>Clear Cart</Button>
                </Grid>
        	</Grid>
        )
        	
    }
    
export default ProfilePageCom

/*
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            Shopping cart
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                            <Grid item xs={5}>
                                Item Name
                            </Grid>
                            <Grid item xs={2}>
                                $1000
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="outlined" className="item-amount">
                                    <Select
                                        native
                                        inputProps={{
                                            name: 'amount',
                                            id: 'item-amount'
                                        }}
                                    >
                                        <option value="" />
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item xs={1}>

                                <IconButton arial-label="delete-item">
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Grid>  
*/