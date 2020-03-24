import React from 'react'

export interface ProductTileProps {
    imageURL: string
} 

const ProductTile: React.FC<ProductTileProps> = (props) => {
    return(
        <div className="posterDetailDiv">
        	<img className="posterPreviewImg" src={props.imageURL} alt="Poster" />
        </div>
    )
}
export default ProductTile