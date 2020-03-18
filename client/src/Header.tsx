import React, { MouseEvent, useState, useEffect } from 'react'
import {fade, makeStyles} from '@material-ui/core/styles'
import {Button, InputBase} from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Tree from './img/treeIconTestSmallGreen.png'
import {Decoded} from './App'
import {Redirect, Link} from 'react-router-dom'
// import {border} from '@material-ui/system/borders'

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.25),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.15),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        }
    },
    buttonRoot: {
      borderRadius: 3,
      border: '2px solid black',
      height: 36,
      width: 95
    }
}));
export interface HeaderProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Header: React.FC<HeaderProps> =(props) => {
    //let [signInState, setSignInState] = useState(false)
    //let send = null
    const classes = useStyles()
    const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        localStorage.removeItem('mernToken')
        props.updateUser(null)
    }
    let variableButton = (
        <Link to="/login">Sign In</Link>        
    )
    if(props.user) {
        variableButton = (
            <Button classes={{root: classes.buttonRoot}} className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" 
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleLogout(e)}>Sign out</Button>
        )
    }
    return(
        <div className="headerDiv">
            <header className="mdc-top-app-bar primary">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start header-top">
                        <img src={Tree} alt="Tree Icon"></img>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <Search />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        {variableButton}
                        <Button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
                            <ShoppingCart />
                        </Button>
                    </section>
                </div>
            </header>
            <nav>
                <Link to="/posters" className="posterNav">Posters</Link>
                <Link to="/art">Art</Link>
                <Link to="/faq" className="faqNav">FAQ</Link>
            </nav>
        </div>
    )
}
export default Header