import React, {useState, useEffect} from 'react'
import ProductPreviewTile from './ProductPreviewTile'
import axios, {AxiosError} from 'axios'
import { AxiosServerError, AxiosServerResponse, ServerImageInformation} from './dec';

export interface ProductRowProps {
    rowCategory: string;
    productCategory: string
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
});

const getServerImageInformation = async (productCategory: string):Promise<AxiosServerResponse>  => {
  try {
    const response = await axiosClient.get(`/${productCategory}`)
    return ({statusCode: `${response.status}` , responseObject: response.data})
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<AxiosServerError>
      return ({statusCode: `${axiosError.code}`, responseObject: [{sourceID:'', imageID:'', imagePath:'', price: 0}]})
    }
    throw err;
  }
};

const ProductRow: React.FC<ProductRowProps> = (props) => {
    const [imageArray, setImageArray] = useState<Array<ServerImageInformation>>([])
    useEffect(() => {
        async function loadImageData() {
            await getServerImageInformation(props.productCategory)
            .then(response => {
                setImageArray(response.responseObject)
            }).catch(err => {
                console.log(err);
            })
        }

        loadImageData();
    },[])

    return(
        <div>
            <h3 className="posterRowH3">{props.rowCategory}</h3>
            <div className="postersDiv">
                {
                imageArray.map((image,i) => (
                    <div key={i} className="posterRow">
                        <ProductPreviewTile imageURL={image.imagePath} />
                <h3 className="posterRowPrices">$ {image.price || 100}</h3>
                    </div>
                    ))
                }
            </div>
        </div>
    )
    
}

export default ProductRow