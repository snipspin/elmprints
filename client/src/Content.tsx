import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PosterGallery from './PosterGallery'
import FAQPageCom from './FAQPageCom'
import SignUpCom from './SignUpCom'
import ProfilePageCom from './ProfilePageCom'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import {green} from '@material-ui/core/colors'

const contentTheme = createMuiTheme({
	palette: {
		primary: {
			main: green['A700']
		}
	}
})
//'#096e25'

function Content() {
		return(
				<div className="main">
						<MuiThemeProvider theme={contentTheme}>
								<Switch>
									<Route exact path="/" component={SignUpCom} />
									<Route path="/postergallery" component={PosterGallery} />
									<Route path="/profile" component={ProfilePageCom} />
									<Route path="/faq" component={FAQPageCom} />
								</Switch>
						</MuiThemeProvider>
				</div>
		)
}
export default Content