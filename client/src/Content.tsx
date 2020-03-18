import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PosterGallery from './PosterGallery'
import PosterDetail from './PosterDetail'
import FAQPageCom from './FAQPageCom'
import SignUpCom from './SignUpCom'
import ProfilePageCom from './ProfilePageCom'
import SignInWindowCom from './SignInWindowCom'
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
									<Route path="/posters" render={() => <PosterGallery rowCategoryOne={'Bestsellers'} rowCategoryTwo={'Featured'} />} />
									<Route path="/art/:id" component={PosterDetail} />
									<Route path="/art" render={() => <PosterGallery rowCategoryOne={'Bestsellers'} rowCategoryTwo={'Featured'} />} />
									<Route path="/profile" render={() => <ProfilePageCom user={props.user} updateUser={props.updateUser} />} />
									<Route path="/faq" component={FAQPageCom} />
								</Switch>
						</MuiThemeProvider>
				</div>
		)
}
export default Content