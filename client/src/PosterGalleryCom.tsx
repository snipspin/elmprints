import React from 'react'
import ProductGallery from './ProductGallery'

type PosterGalleryProps = {}

const PosterGalleryCom: React.FC<PosterGalleryProps> = (props) => {
        return(
            <ProductGallery rowCategoryOne={'Bestsellers'} rowCategoryTwo={'Featured'} productCategory={'poster'} />
        )
    }
export default PosterGalleryCom