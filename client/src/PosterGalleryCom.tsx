import React from 'react'
import ProductGallery from './ProductGallery'
import {ProductInformation} from './dec'

export interface PosterGalleryProps {
	currentProduct: ProductInformation,
	setCurrentProduct(value: ProductInformation): void 
}

const PosterGalleryCom: React.FC<PosterGalleryProps> = (props) => {
        return(
            <ProductGallery rowCategoryOne={'Bestsellers'} rowCategoryTwo={'Featured'} productCategory={'poster'} currentProduct={props.currentProduct} setCurrentProduct={props.setCurrentProduct}/>
        )
    }
export default PosterGalleryCom