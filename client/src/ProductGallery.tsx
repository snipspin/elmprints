import React from 'react'
import ProductRow from './ProductRow'

export interface ProductGalleryProps {
    rowCategoryOne: string,
    rowCategoryTwo: string,
    productCategory: string
}

const ProductGallery: React.FC<ProductGalleryProps> = (props) => {
    return(
        <div>
            <ProductRow rowCategory={props.rowCategoryOne} productCategory={props.productCategory} />
            <ProductRow rowCategory={props.rowCategoryTwo} productCategory={props.productCategory} />
        </div>
    )
}

export default ProductGallery