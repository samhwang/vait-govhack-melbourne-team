import { useState } from 'react';
import { useToggle } from 'rooks';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  Container,
  Grid,
  TextField,
  ListItem,
  ListItemText,
  Fab,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import WarningIcon from '@material-ui/icons/Warning';
import Copyright from './Copyright';
import MenuItem from './MenuItem';
import SubscribeFormBody from './SubscribeFormBody';
import EmergengyFormBody from './EmergengyFormBody';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: '#66c172',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'flex',
    'flex-direction': 'row',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  searchBox: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  searchWhite: {
    color: 'white !important',
  },
  flexGrow1: {
    'flex-grow': 1,
  },
  widthFull: {
    width: '100%',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  warningIcon: {
    position: 'absolute',
    right: '2em',
    bottom: '2em',
  },
}));

function SharedLayout({ children }) {
  const classes = useStyles();
  const [openDrawer, toggleOpenDrawer] = useToggle(false);
  const handleDrawerOpen = () => toggleOpenDrawer(true);
  const handleDrawerClose = () => toggleOpenDrawer(false);

  const [showSubscribeModal, toggleSubscribeModal] = useToggle(false);
  const openModal = () => toggleSubscribeModal(true);
  const closeModal = () => toggleSubscribeModal(false);

  const [showEmergencyModal, toggleEmergencyModal] = useToggle(false);
  const openEmergencyModal = () => toggleEmergencyModal(true);
  const closeEmergencyModal = () => toggleEmergencyModal(false);

  const [alertContent, setAlertContent] = useState({
    type: 'success',
    message: '',
  });
  const [showAlert, toggleAlert] = useToggle(false);
  const openAlert = ({ type = 'success', message = '' }) => {
    setAlertContent({ type, message });
    toggleAlert(true);
  };
  const closeAlert = () => {
    toggleAlert(false);
    setAlertContent({ type: 'success', message: '' });
  };

  const menuItems = [
    { item: 'Dashboard', path: '/' },
    { item: 'Map', path: '/map' },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      {showSubscribeModal && (
        <SubscribeFormBody
          closeModal={closeModal}
          handleDrawerClose={handleDrawerClose}
          openAlert={openAlert}
        />
      )}
      {showEmergencyModal && (
        <EmergengyFormBody closeModal={closeEmergencyModal} />
      )}
      {!showSubscribeModal && !showEmergencyModal && (
        <>
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
          >
            <Toolbar className={`${classes.toolbar} ${classes.widthFull}`}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="openDrawer drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  openDrawer && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <form
                className={`${classes.searchBox} ${classes.flexGrow1}`}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Search here"
                  className={`${classes.widthFull} ${classes.searchWhite}`}
                />
              </form>
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !openDrawer && classes.drawerPaperClose
              ),
            }}
            open={openDrawer}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {menuItems.map(({ item, path }) => (
                <MenuItem key={item} item={item} path={path} />
              ))}
              <ListItem button onClick={openModal}>
                <ListItemText primary="Subscribe" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {showAlert && (
                  <Alert
                    variant="filled"
                    severity={alertContent.type}
                    onClose={closeAlert}
                  >
                    {alertContent.message}
                  </Alert>
                )}
                {children}
              </Grid>
              <Fab
                color="secondary"
                variant="extended"
                className={classes.warningIcon}
                onClick={openEmergencyModal}
              >
                <WarningIcon className={classes.extendedIcon} />
                Emergency
              </Fab>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </>
      )}
    </div>
  );
}

export default SharedLayout;
