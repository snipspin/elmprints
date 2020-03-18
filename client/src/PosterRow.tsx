import React, {useState, useEffect} from 'react'
import PosterTile from './PosterTile'

import { Poster } from './dec';

export interface PosterRowProps {
  rowCategory: string;
}

const PosterRow: React.FC<PosterRowProps> = (props) => {
    const [posterArray, setPosterArray] = useState<Array<Poster>>([])

    // Populate posterArray
    useEffect(() => {
        let newImageArray: Array<Poster> = [];
        for (let index = 0; index < 8; index++) {
        newImageArray.push({imageURL: 'http://placekitten.com/200/200'});
        }
        console.log(newImageArray)
        setPosterArray(newImageArray);  
        console.log(posterArray);
    },[])
    
    return(
        <div>
            <h3 className="posterRowH3">{props.rowCategory}</h3>
            <div className="postersDiv">
                {
                posterArray.map((poster,i) => (
                    <div className="posterRow">
                        <PosterTile key={i} imageURL={poster.imageURL} />
                        <h3 className="posterRowPrices">Price</h3>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PosterRow