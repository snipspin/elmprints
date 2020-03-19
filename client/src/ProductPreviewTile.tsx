import React from 'react'

export interface ProductPreviewTileProps {
    imageURL: string
} 

const ProductPreviewTile: React.FC<ProductPreviewTileProps> = (props) => {
    return(
        <div className="posterDiv">
        	<img src={props.imageURL} height="200px" />
        </div>
    )
}
export default ProductPreviewTile