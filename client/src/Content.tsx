import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import ArtGalleryCom from './ArtGalleryCom'
import PosterGalleryCom from './PosterGalleryCom'
import ProductDetail from './ProductDetail'
import FAQPageCom from './FAQPageCom'
import ProfilePageCom from './ProfilePageCom'
import SignInWindowCom from './SignInWindowCom'
import ShowCartPageCom from './ShowCartPageCom'
import PaymentPageCom from './PaymentPageCom'
import ReceiptPageCom from './ReceiptPageCom'
import SearchResultsCom from './SearchResultsCom'
import PurchaseHistory from './PurchaseHistory'
import SignUpCom from './SignUpCom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import { makeStyles }from '@material-ui/core/styles'
import styles from './styles';
import {Decoded} from './App'
import {ProductInformation} from './dec'

export interface ContentProps {
	user: Decoded | null,
	updateUser: (newToken: string | null) => void
	searchTerm: string
}

const contentTheme = createMuiTheme({
	palette: {
		primary: {
			main: "rgb(225, 221, 217)",
		},
		secondary: {
			main: "rgb(0, 0, 0)"
		}
	}
})

const useStyles =  makeStyles(theme => (styles(theme)));

const Content: React.FC<ContentProps> = (props) => {

	let [currentProduct, setCurrentProduct] = useState<ProductInformation>({title: '', sourceID:'', imageID:'', imagePath:'', price: ''})
	const classes = useStyles();
	
	return(
		<div className={classes.root + " main"}>
			<MuiThemeProvider theme={contentTheme}>
					<Switch>
						<Route exact path="/" render={() => <PosterGalleryCom currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />} />
						<Route path="/signup" render={() => <SignUpCom user={props.user} updateUser={props.updateUser} />} />
						<Route path="/login" render={() => <SignInWindowCom user={props.user} updateUser={props.updateUser} />} />
						<Route path="/posters/cart/payment" render={() => <PaymentPageCom updateUser={props.updateUser} currentProduct={currentProduct} user={props.user} />} />
						<Route path="/posters/:id" render={() => <ProductDetail user={props.user} updateUser={props.updateUser} currentProduct={currentProduct} />} />
						<Route path="/posters" render={() => <PosterGalleryCom currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />} />
						<Route path="/art/:id" component={ProductDetail} />
						<Route path="/art" render={() => <ArtGalleryCom currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />} />
						<Route path="/cart/payment" render={() => <PaymentPageCom updateUser={props.updateUser} currentProduct={currentProduct} user={props.user} />} />
						<Route path="/cart/receipt" render={() => <ReceiptPageCom currentProduct={currentProduct} user={props.user} updateUser={props.updateUser} />} />
						<Route path="/cart" render={() => <ShowCartPageCom updateUser={props.updateUser} currentProduct={currentProduct} user={props.user} />} />
						<Route path="/profile" render={() => <ProfilePageCom user={props.user} updateUser={props.updateUser} />} />
						<Route path="/faq" component={FAQPageCom} />
						<Route path="/search" render={() => <SearchResultsCom currentProduct={currentProduct} searchTerm={props.searchTerm} setCurrentProduct={setCurrentProduct} />} />
						<Route path="/purchases" render={() => <PurchaseHistory user={props.user} updateUser={props.updateUser} />} />
					</Switch>
			</MuiThemeProvider>
		</div>
	)
}

export default Content