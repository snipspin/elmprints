import React from 'react'

export interface PosterProps {
    imageURL: string;
} 
// export interface Props {
//     poster: PosterProps;
//   }


    const PosterTile: React.FC<PosterProps> = (props) => {
        return(
            <div>
                <img src={props.imageURL} />
            </div>
        )
    }
export default PosterTile