import React from 'react'
import ProductGallery from './ProductGallery'

type ArtGallery = {
    
}
    const ArtGalleryCom: React.FC<ArtGallery> = () => {
        return(
            <ProductGallery rowCategoryOne={'Bestsellers'} rowCategoryTwo={'Featured'} productCategory={'art'} />
        )
    }
export default ArtGalleryCom