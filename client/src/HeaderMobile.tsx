import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import IconButton from '@material-ui/core/IconButton';
import HelpOutline from '@material-ui/icons/HelpOutline';
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

export interface HeaderMobileProps {
  user: Decoded | null,
  updateUser: (newToken: string | null) => void,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const HeaderMobile: React.FC<HeaderMobileProps> =(props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({top: false});

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
        <ListItem button key={'Home'}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button key={'Profile'}>
          <ListItemIcon><AccountCircleOutlined /></ListItemIcon>
          <ListItemText primary={'Profile'} />
        </ListItem>
        <ListItem button key={'Posters'}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary={'Posters'} />
        </ListItem>
        <ListItem button key={'Art'}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary={'Art'} />
        </ListItem>
        <ListItem button key={'FAQ'}>
          <ListItemIcon><HelpOutline /></ListItemIcon>
          <ListItemText primary={'FAQ'} />
        </ListItem>
      </List>
    </div>
  );

  const handleSearchTermChange = (value:string):void => {
    props.setSearchTerm(value)
  }

  return (
    <div className="headerMobileDiv">
        <div className="hamburgerDiv">
          <Button onClick={toggleDrawer('top', true)}>{
                <IconButton
                  style={{color: "rgb(255, 255, 255)"}}
                  aria-label="open drawer"
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
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