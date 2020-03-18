import React, {useState, useEffect} from 'react'
import PosterRow from './PosterRow'

export interface PosterRowProps {
    rowCategoryOne: string;
    rowCategoryTwo: string;
}

const PosterGallery: React.FC<PosterRowProps> = (props) => {
    return(
        <div>
            <PosterRow rowCategory={props.rowCategoryOne} />
            <PosterRow rowCategory={props.rowCategoryTwo} />
        </div>
    )
}

export default PosterGallery