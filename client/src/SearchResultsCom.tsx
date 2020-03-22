import React, {useState, useEffect} from 'react'
import axios, {AxiosError} from 'axios'
import { AxiosServerError, AxiosServerResponse, ServerImageInformation, ProductInformation} from './dec';
import ProductPreviewTile from './ProductPreviewTile'

type SearchResultsComProps = {
    searchTerm: string
	currentProduct: ProductInformation,
	setCurrentProduct(value: ProductInformation): void 
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
})

const getSearchResults = async (searchTerm: string, url: string):Promise<AxiosServerResponse>  => {
    try {
      const response = await axiosClient.post(url,
      {
        searchQuery: searchTerm
      })
      return ({statusCode: `${response.status}` , responseObject: response.data})
    } catch (err) {
      if (err && err.response) {
        const axiosError = err as AxiosError<AxiosServerError>
        return ({statusCode: `${axiosError.code}`, responseObject: [{title: '', sourceID:'', imageID:'', imagePath:'', price: 0}]})
      }
      throw err;
    }
  }

const SearchResultsCom: React.FC<SearchResultsComProps> = (props) => {

    const [imageArray, setImageArray] = useState<Array<ServerImageInformation>>([])
    const [artArray, setArtArray] = useState<Array<ServerImageInformation>>([])

    useEffect(() => {
        async function loadImageData() {
            await getSearchResults(props.searchTerm, `/poster/search`)
            .then(response => {
                setImageArray(response.responseObject)
            }).catch(err => {
                console.log(err);
            })
        }
        async function loadArtData() {
            await getSearchResults(props.searchTerm, `/art/search`)
            .then(response => {
                setArtArray(response.responseObject)
            }).catch(err => {
                console.log(err);
            })
        }

        loadImageData()
        loadArtData()
    },[])

        return(
            <div className="productsMainRowDiv">
            <h3 className="productRowH3">Search results</h3>
            <div className="productsDiv">
                {
                imageArray.map((image,i) => (
                    <div key={i} className="productRow">
                        <ProductPreviewTile currentProduct={props.currentProduct} image={image} setCurrentProduct={props.setCurrentProduct} />
                <h3 className="productRowPrices">$ {image.price || 100}</h3>
                    </div>
                    ))  
                }

{
                artArray.map((image,i) => (
                    <div key={i} className="productRow">
                        <ProductPreviewTile currentProduct={props.currentProduct} image={image} setCurrentProduct={props.setCurrentProduct} />
                <h3 className="productRowPrices">$ {image.price || 100}</h3>
                    </div>
                    ))  
                }
            </div>
        </div>
        )
    }

export default SearchResultsCom