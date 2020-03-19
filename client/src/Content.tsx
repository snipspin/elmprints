import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ArtGalleryCom from './ArtGalleryCom'
import PosterGalleryCom from './PosterGalleryCom'
import PosterDetail from './PosterDetail'
import FAQPageCom from './FAQPageCom'
import SignUpCom from './SignUpCom'
import ProfilePageCom from './ProfilePageCom'
import SignInWindowCom from './SignInWindowCom'
import ShowCartPageCom from './ShowCartPageCom'
import PaymentPageCom from './PaymentPageCom.js'
import ReceiptPageCom from './ReceiptPageCom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import {green} from '@material-ui/core/colors'
import { makeStyles }from '@material-ui/core/styles'
import styles from './styles';
import {Decoded} from './App'
import {User} from './dec'
export interface ContentProps {
	user: Decoded | null,
	updateUser: (newToken: string | null) => void
}
const contentTheme = createMuiTheme({
	palette: {
		primary: {
			main: green['A700']
		}
	}
})
//'#096e25'
const useStyles =  makeStyles(theme => (styles(theme)));
const Content: React.FC<ContentProps> = (props) => {
	const classes = useStyles();
		return(
				<div className={classes.root + " main"}>
						<MuiThemeProvider theme={contentTheme}>
								<Switch>
									<Route exact path="/" render={() => <SignUpCom user={props.user} updateUser={props.updateUser} />} />
									<Route path="/login" render={() => <SignInWindowCom user={props.user} updateUser={props.updateUser} />} />
									<Route path="/posters/:id" component={PosterDetail} />
									<Route path="/posters" render={() => <PosterGalleryCom />} />
									<Route path="/art/:id" component={PosterDetail} />
									<Route path="/art" render={() => <ArtGalleryCom />} />
									<Route path="/cart" render={() => <ShowCartPageCom />} />
									<Route path="/cart/payment" render={() => <PaymentPageCom />} />
									<Route path="/cart/receipt" render={() => <ReceiptPageCom />} />
									<Route path="/profile" render={() => <ProfilePageCom user={props.user} updateUser={props.updateUser} />} />
									<Route path="/faq" component={FAQPageCom} />
								</Switch>
						</MuiThemeProvider>
				</div>
		)
}
export default Content