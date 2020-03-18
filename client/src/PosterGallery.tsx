import React, {useState, useEffect} from 'react'
import PosterTile from './PosterTile'

import { Poster } from './dec';


function PosterGallery() {
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
            <h3 className="posterGalleryH3">Bestsellers</h3>
            <div className="postersDiv">
                {
                posterArray.map((poster,i) => (
                    <div className="posterGallery">
                        <PosterTile key={i} imageURL={poster.imageURL} />
                        <h3 className="posterGalleryPrices">Price</h3>
                    </div>
                    ))
                }
            </div>
            <h3 className="posterGalleryH3">Featured</h3>
            <div className="postersDiv">
                {
                posterArray.map((poster,i) => (
                    <div className="posterGallery">
                        <PosterTile key={i} imageURL={poster.imageURL} />
                        <h3 className="posterGalleryPrices">Price</h3>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PosterGallery