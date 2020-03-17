import React from 'react'

export interface PosterProps {
    imageURL: string;
} 

const PosterTile: React.FC<PosterProps> = (props) => {
    return(
        <div className="posterDiv">
        	<img src={props.imageURL} />
            <h3>Price</h3>
        </div>
    )
}
export default PosterTile