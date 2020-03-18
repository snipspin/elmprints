import React from 'react'

export interface PosterProps {
    imageURL: string;
} 

const PosterTile: React.FC<PosterProps> = (props) => {
    return(
        <div className="posterDiv">
        	<img src={props.imageURL} />
        </div>
    )
}
export default PosterTile