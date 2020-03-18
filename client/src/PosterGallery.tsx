import React from 'react'
import PosterRow from './PosterRow'

export interface PosterGalleryProps {
    rowCategoryOne: string;
    rowCategoryTwo: string;
}

const PosterGallery: React.FC<PosterGalleryProps> = (props) => {
    return(
        <div>
            <PosterRow rowCategory={props.rowCategoryOne} />
            <PosterRow rowCategory={props.rowCategoryTwo} />
        </div>
    )
}

export default PosterGallery