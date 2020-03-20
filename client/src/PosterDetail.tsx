import React, {useState, useEffect, MouseEvent} from 'react'
import ProductTile from './ProductTile'
import {Button} from '@material-ui/core'
import {createStyles, makeStyles, withStyles, Theme, fade} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {ProductInformation} from './dec'
import {Decoded} from './App'
import {Link} from 'react-router-dom'

// Notes from Pete on May 17 2020:
// interface below created to test showing more information than the Poster interface in the declaration file (as used in postergallery)
// should another declaration be created for displaying this poster?
// my guess is we would be best off having a second interface similar to the one below
// if this is moved to dec file, then this import could be used as 
// import { Poster } from './dec';
export interface PosterProps {
  user: Decoded | null,
  currentProduct: ProductInformation
}


const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase)


const useStyles = makeStyles(theme => ({
  buttonRoot: {
    borderRadius: 3,
    border: '2px solid black',
    height: 60,
    width: 250,
    fontSize: 20
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

const PosterDetail: React.FC<PosterProps> = (props) => {
    const classes = useStyles();
    const [quantity, setQuantity] = React.useState('1');
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setQuantity(event.target.value as string);
    };
    const handlePurchase = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      return (<Link to="/cart/payment" className="loginLinkProduct">Purchase</Link>)
    }
    const purchaseButton = (props.user)? (
      <Button classes={{root: classes.buttonRoot}} onClick={(e: MouseEvent<HTMLButtonElement>) => handlePurchase(e)} className="posterDetailBuyBtn material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"><Link to="/cart/payment" className="loginLinkProduct">Buy</Link></Button>
    ) :
    (
      <Button classes={{root: classes.buttonRoot}} className="posterDetailBuyBtn material-icons mdc-top-app-bar__navigation-icon mdc-icon-button "><Link to="/login" className="loginLinkProduct">Sign In</Link>  </Button>
    )
    return(
        <div className="posterDetail">
            <ProductTile imageURL={props.currentProduct.imagePath} />
            <div className="posterDetailRight">
         
                <div className="priceDiv">
                    <h4 className="posterDetailPrice">${props.currentProduct.price}</h4>
                    <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label">Qty</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={quantity}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                {purchaseButton}
                </div>
                <h2>Description</h2>
           
            </div>
        </div>
    )
}

export default PosterDetail