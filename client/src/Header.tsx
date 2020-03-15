import React from 'react'
import {FormControl, Input, InputLabel, Button} from '@material-ui/core'
import Tree from './img/treeIconTestSmall.png'

function Header() {
    return(
        <div>
            <header className="mdc-top-app-bar primary">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <img className="" src={Tree} alt="Tree Icon"></img>
                        <Button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
                            menu
                        </Button>
                        <span className="mdc-top-app-bar__title">Title</span>
                    </section>
                </div>
            </header>
        </div>
    )
}
export default Header