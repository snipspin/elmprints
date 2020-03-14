import React, {useState, useEffect} from 'react'
import PosterTile from './PosterTile'

export interface Poster {
    imageURL: string;
}

function PosterGallery() {
    const [posterArray, setPosterArray] = useState<Array<Poster>>([])

    // Populate posterArray
    useEffect(() => {
        let newImageArray: Array<Poster> = [];
        for (let index = 0; index < 10; index++) {
        newImageArray.push({imageURL: 'http://placekitten.com/200/200'});
        }
        console.log(newImageArray)
        setPosterArray(newImageArray);  
        console.log(posterArray);
    },[])
    
    return(
        <div>
        {
            
        posterArray.map((poster,i) => (
            <PosterTile key={i} imageURL={poster.imageURL} />
        ))
        }
        </div>
    )
}

export default PosterGallery