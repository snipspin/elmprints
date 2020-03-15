import React from 'react'
import Button from '@material-ui/core/Button'
// import TopBar from "@material/top-app-bar/mdc-top-app-bar"
// import IconButton from "@material/icon-button/mdc-icon-button";

    function Header() {
        return(
            <div>
                <header className="mdc-top-app-bar primary">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
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