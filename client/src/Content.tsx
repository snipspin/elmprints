import React from 'react'
import PosterGallery from './PosterGallery';
import SignUpCom from './SignUpCom'
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
          	<MuiThemeProvider theme={contentTheme}>
            	<SignUpCom />
            </MuiThemeProvider>
        )
    }
export default Content