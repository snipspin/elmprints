import React, {useState, useEffect} from 'react'
import PosterTile from './PosterTile'
import axios, {AxiosError} from 'axios'
import { AxiosServerError, AxiosServerResponse, ServerImageInformation} from './dec';

export interface PosterRowProps {
    rowCategory: string;
  }

  //rowCategory: string;
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
});

const getServerImageInformation = async ():Promise<AxiosServerResponse>  => {
  try {
    const response = await axiosClient.get('/poster')
    return ({statusCode: `${response.status}` , responseObject: response.data})
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<AxiosServerError>
      return ({statusCode: `${axiosError.code}`, responseObject: [{sourceID:'', imageID:'', imagePath:''}]})
    }
    throw err;
  }
};

const PosterRow: React.FC<PosterRowProps> = (props) => {
    const [posterArray, setPosterArray] = useState<Array<ServerImageInformation>>([])
    // Populate posterArray
    useEffect(() => {
        getServerImageInformation()
        .then(response => {
            setPosterArray(response.responseObject)
        }).catch(err => {
            console.log(err);
        })

    },[])
    
    return(
        <div>
            <h3 className="posterRowH3">{props.rowCategory}</h3>
            <div className="postersDiv">
                {
                posterArray.map((poster,i) => (
                    <div key={i} className="posterRow">
                        <PosterTile imageURL={poster.imagePath} />
                        <h3 className="posterRowPrices">Price</h3>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PosterRow