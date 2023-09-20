import * as React from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Drawer from '@mui/material/Drawer';
import { loginRequest } from "../authConfig";
import { Box, Button, Container, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const AuthButton = () => {
    const { instance } = useMsal()

    const handleLoginPopup = () => {
        instance.loginPopup(loginRequest).catch((error) => console.log(error))
    }

    const handleLogoutPopup = () => {
        instance.logoutPopup().catch((error) => console.log(error))
    }

    return (
        <>
            <AuthenticatedTemplate>
                <Button
                    variant='contained'
                    onClick={handleLogoutPopup}
                >
                    Logout
                </Button>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Button
                    variant='contained'
                    onClick={handleLoginPopup}
                >
                    Login with AzureAD
                </Button>
            </UnauthenticatedTemplate>
        </>
    )
}

export const PageLayout = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return(
        <Box sx={{ display: 'flex'}}>
            <AppBar position='fixed' open={open}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <IconButton
                            color='inherit'
                            aria-label='open menu'
                            onClick={handleDrawerOpen}
                            edge='start'
                            sx={{mr: 2, ...(open && { display: 'none' }) }}                       
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            variant='h6'
                            noWrap
                            component='a'
                            href='/'
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'roboto',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                            }}>
                                Workshop
                            </Typography>
                            <AuthButton />
                    </Toolbar>
                </Container>

            </AppBar>
            <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem to='/' component={RouterLink}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem to='/products' component={RouterLink}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem to='/register' component={RouterLink}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Setup Account" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem to='/profiles-lite' component={RouterLink}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Summary Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem to='/product-with-stock' component={RouterLink}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Product with Stock" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem to='/admin' component={RouterLink}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin Page" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <AuthenticatedTemplate>
                    {props.children}
                </AuthenticatedTemplate>
            </Main>
        </Box>
    )
}