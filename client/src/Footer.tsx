import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
    return(
        <>
            <div className="footerTop">
                <Link to="/" className="footerLink">Elm Prints</Link>
                <Link to="/posters" className="footerLink">Posters</Link>
                <Link to="/art" className="footerLink">Art</Link>
                <Link to="/faq" className="footerLink">FAQ</Link>
                <Link to="/profile" className="footerLink">Profile</Link>
            </div>
            <div className="footerBottom">
                <p>Copyright 2020</p>
            </div>
        </>
    )
}
export default Footer