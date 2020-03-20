import React from 'react'
import PaymentPageCom from './PaymentPageCom'
import {ProductInformation} from './dec'

type ShowCartPageProps = {
    currentProduct: ProductInformation
}
const ShowCartPageCom: React.FC<ShowCartPageProps> = (props) => {
        return(
            <div>
                ShowCartPageCom
                <PaymentPageCom currentProduct={props.currentProduct}/>
            </div>
        )
    }
export default ShowCartPageCom