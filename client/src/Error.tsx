import React from 'react'
type ErrorProps = {
    title: string,
    body: string
}

const Error: React.FC<ErrorProps> = (props) => {
        return(
            <div>
                <h1>{props.title}</h1>
                <p>{props.body}</p>
            </div>
        )
    }
export default Error