import React from 'react'
import {ProductInformation} from './dec'
import ProductRow from './ProductRow'

export interface ProductGalleryProps {
    rowCategoryOne: string,
    rowCategoryTwo: string,
    productCategory: string
	currentProduct: ProductInformation,
	setCurrentProduct(value: ProductInformation): void 
}

const ProductGallery: React.FC<ProductGalleryProps> = (props) => {
    return(
        <div>
            <ProductRow currentProduct={props.currentProduct} setCurrentProduct={props.setCurrentProduct} rowCategory={props.rowCategoryOne} productCategory={props.productCategory} />
            <ProductRow currentProduct={props.currentProduct} setCurrentProduct={props.setCurrentProduct} rowCategory={props.rowCategoryTwo} productCategory={props.productCategory} />
        </div>
    )
}

export default ProductGallery