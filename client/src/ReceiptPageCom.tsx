import React from 'react'
import {ProductInformation} from './dec'
import {Decoded} from './App'

export type ReceiptPageComProps = {
    user: Decoded | null,
    currentProduct: ProductInformation 
}

const ReceiptPageCom: React.FC<ReceiptPageComProps> = (props) => {
        return(
            <div>
                {ReceiptPageCom}
            </div>
        )
    }
export default ReceiptPageCom