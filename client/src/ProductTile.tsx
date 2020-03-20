import React from 'react'

export interface ProductTileProps {
    imageURL: string
} 

const ProductTile: React.FC<ProductTileProps> = (props) => {
    return(
        <div className="posterDiv">
        	<img className="posterPreviewImg" src={props.imageURL} />
        </div>
    )
}
export default ProductTile