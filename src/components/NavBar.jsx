import React, { useState } from 'react';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// material-ui/styles
import { makeStyles } from '@material-ui/core/styles';
// material-ui/core
import { 
  AppBar, 
  Toolbar, 
  Drawer, 
  Divider, 
  List,
  ListSubheader, 
  ListItem,
  ListItemIcon,
  ListItemText, 
  Typography, 
  IconButton 
} from '@material-ui/core';
// material-ui/icons
import MenuIcon from '@material-ui/icons/Menu';
import StorageIcon from '@material-ui/icons/Storage';
import CodeIcon from '@material-ui/icons/Code';
import GitHubIcon from '@material-ui/icons/GitHub';
// material-ui/colors
import { red, grey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: red[900]
  },
  icon: {
    marginRight: theme.spacing(3)
  },
  list: {
    width: 320,
  },
  appTitle: {

  },
  appSideBarIcon: {
    marginRight: theme.spacing(3),
    color: red[900]
  },
  sideBarIcon: {
    color: grey[800]
  },
  sideBarLink: {
    color: red[900],
    textDecoration: "none"
  }
}));

const NavBar = () => {
  const [state, setState] = useState(false);

  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  
    setState(open);
  };
  
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <ListItemText>
            <h2>
              <FontAwesomeIcon icon="viruses" className={classes.appSideBarIcon}/>
              Covid-19 Tracker
            </h2>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader>
          CREATED BY
        </ListSubheader>
        <ListItem>
          <ListItemIcon className={classes.sideBarIcon}>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText>
            <a href="https://jmjaropojop-web-developer.netlify.app/" className={classes.sideBarLink}>
            Jerome Mico S. Jaropojop
            </a>  
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.sideBarIcon}>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText>
            <a href="https://github.com/jmjaro-dev" className={classes.sideBarLink}>
            jmjaro-dev
            </a>
          </ListItemText>
        </ListItem>
        <ListSubheader>
          API REFERENCE
        </ListSubheader>
        <ListItem>
          <ListItemIcon className={classes.sideBarIcon}>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText>
            <a href="https://corona.lmao.ninja/docs" className={classes.sideBarLink}>
            https://corona.lmao.ninja/docs
            </a>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  )
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <FontAwesomeIcon icon="viruses" className={classes.icon} />
            Covid-19 Tracker
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;