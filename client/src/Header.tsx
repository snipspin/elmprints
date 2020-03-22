import React, { MouseEvent, useState} from 'react'
import {fade, makeStyles} from '@material-ui/core/styles'
import {Button, InputBase} from '@material-ui/core'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import Tree from './img/treeTrial.png'
import {Decoded} from './App'
import {Link} from 'react-router-dom'
import SearchBarCom from './SearchBarCom'

const useStyles = makeStyles(theme => ({
    buttonRoot: {
      borderRadius: 3,
      background: 'rgba(228, 225, 225, .80)',
      '&:hover': {
        background: 'rgba(228, 225, 225, .90)',
      },
      color: 'black',
      border: '2px solid black',
      height: 36,
      width: 95
    }
}));
export interface HeaderProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<HeaderProps> =(props) => {
    const classes = useStyles()
    
    const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        localStorage.removeItem('mernToken')
        props.updateUser(null)
    }

    const handleSearchTermChange = (value:string):void => {
        props.setSearchTerm(value)
    }

    let variableButton = (
        <div className="loginBtn">
            <Link to="/login" className="loginLink">Sign In</Link>        
        </div>
    )
    if(props.user) {
        variableButton = (
            <Button classes={{root: classes.buttonRoot}} className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" 
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleLogout(e)}>Sign out</Button>
        )
    }

    return(
        <div className="headerDiv">
            <div className="brandingDiv">
                <img className="brandingIcon" src={Tree} alt="Tree Icon"></img>
                <div className="brandingName">
                    <h1>ELM</h1>
                    <h1>PRINTS</h1>
                </div>
            </div>
            <div className="headerSuperMain">
                <div className="headerMain">
                    <header className="mdc-top-app-bar primary">
                        <div className="mdc-top-app-bar__row">
                            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start header-top">
                                <SearchBarCom onChange={handleSearchTermChange} />
                                
                                {variableButton}
                                <Button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
                                    <ShoppingCart stroke={"black"} stroke-width={1} style={{color: "rgba(255, 255, 255, .90)"}} />
                                </Button>
                                <Link to="/profile">
                                    <AccountCircleOutlined stroke={"black"} stroke-width={0.5} style={{color: "rgba(255, 255, 255, .90)"}} fontSize="large" />
                                </Link>
                            </section>
                        </div>
                    </header>
                    <nav>
                        <Link to="/posters">Posters</Link>
                        <Link to="/art">Art</Link>
                        <Link to="/faq">FAQ</Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Header