import React, {MouseEvent} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import {Omit} from '@material-ui/types'
import {Link, LinkProps} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import HelpOutline from '@material-ui/icons/HelpOutline';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBarMobile from './SearchBarMobile'
import {Decoded} from './App'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top';
export interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
}
function ListItemLink(props: ListItemLinkProps) {
  const {icon, primary, to} = props
  const renderLink = React.useMemo (
    () =>
      React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to],   
  )
  return (
    <ListItem button component={renderLink}>
      {icon? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}
export interface HeaderMobileProps {
  user: Decoded | null,
  updateUser: (newToken: string | null) => void,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}
const HeaderMobile: React.FC<HeaderMobileProps> =(props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({top: false});
  const handleLogout = (e: MouseEvent<any>) => {
    e.preventDefault()
    localStorage.removeItem('mernToken')
    props.updateUser(null)
  }

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
        <ListItemLink to="/profile" primary="Profile" icon={<AccountCircleOutlined />} />
        <ListItemLink to="/posters" primary="Posters" icon={<ExitToAppIcon />} />
        <ListItemLink to="/art" primary="Art" icon={<ExitToAppIcon />} />
        <ListItemLink to="/faq" primary="FAQ" icon={<HelpOutline />} />
        {props.user && 
          <ListItem button onClick={(e: MouseEvent<any>) => handleLogout(e)}>
            <ListItemIcon><HighlightOffOutlinedIcon /></ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </ListItem>

        }
      </List>
    </div>
  );
  const handleSearchTermChange = (value:string):void => {
    props.setSearchTerm(value)
  }

  return (
    <div className="headerMobileDiv">
        <div className="hamburgerDiv">
          <Button onClick={toggleDrawer('top', true)}> { 
            <MenuIcon
              style={{color: "rgb(255, 255, 255)", marginTop: "5px"}}
              aria-label="open drawer"
            />
          }</Button>
        </div>
        <SearchBarMobile onChange={handleSearchTermChange} />
        <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
          {list('top')}
        </Drawer>
    </div>
  );
}
export default HeaderMobile