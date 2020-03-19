import React from 'react'
import ProductGallery from './ProductGallery'
import {ProductInformation} from './dec'

export interface ArtGalleryProps {
	currentProduct: ProductInformation,
	setCurrentProduct(value: ProductInformation): void 
}
    const ArtGalleryCom: React.FC<ArtGalleryProps> = (props) => {
        return(
            <ProductGallery currentProduct={props.currentProduct} setCurrentProduct={props.setCurrentProduct} rowCategoryOne={'Bestsellers'} rowCategoryTwo={'Featured'} productCategory={'art'} />
        )
    }
export default ArtGalleryCom