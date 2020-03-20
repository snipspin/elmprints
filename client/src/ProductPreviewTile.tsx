import React, {MouseEvent} from 'react'
import {Link} from 'react-router-dom'
import {ProductInformation, ServerImageInformation} from './dec'
export interface ProductPreviewTileProps {
	image: ServerImageInformation,
	currentProduct: ProductInformation,
	setCurrentProduct(value: ProductInformation): void 
} 

const ProductPreviewTile: React.FC<ProductPreviewTileProps> = (props) => {
    let link: string = "posters/" + props.image.imageID
    const handleProductClick = (e: MouseEvent<HTMLImageElement>) => {
    	let sendProductInformation: ProductInformation = {
				title: props.image.title,
    		sourceID: props.image.sourceID,
    		imageID: props.image.imageID,
    		imagePath: props.image.imagePath,
    		price: props.image.price.toString()
    	}
    	props.setCurrentProduct(sendProductInformation)
    }
    return(
        <Link to={link}>
        	<div className="posterDiv">
        		<img className="posterImg" src={props.image.imagePath} height="200px" onClick={(e: MouseEvent<HTMLImageElement>) => handleProductClick(e)} />
        	</div>
        </Link>
    
    )
}
export default ProductPreviewTile