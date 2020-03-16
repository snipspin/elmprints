import { Theme } from '@material-ui/core';
const styles = (theme: Theme) => {
    return ({
        root: {
            width: '100%',
          },
          heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            color: 'black',
          },
    });
    }
export default styles