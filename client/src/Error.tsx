import React from 'react'
import { LinkProps, Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

type LinkTo = {
    title: string,
    to: string
}

type ErrorProps = {
    title: string,
    body: string
}

type ErrorWithLinkProps = {
    title: string,
    body: string,
    linkTo: LinkTo
}

const Error: React.FC<ErrorProps> = (props) => {
    return(
            <div>
                <h1>{props.title}</h1>
                <p>{props.body}</p>
            </div>
        )
    }

const ErrorWithLink: React.FC<ErrorWithLinkProps> = (props) => {
    const LinkBehavior = React.forwardRef<any, Omit<LinkProps, 'to'>>((linkProps,ref) => (
        <Link ref={ref} to={props.linkTo.to} {...linkProps} />
    ))
    return(
        <div>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            {(props.linkTo != null)?<Button component={LinkBehavior} style={{marginTop: "20px", marginBottom: "20px", marginLeft: "10px"}} variant="contained" color="primary">{props.linkTo.title}</Button> : ''}
        </div>
    )
}

export {Error, ErrorWithLink}
