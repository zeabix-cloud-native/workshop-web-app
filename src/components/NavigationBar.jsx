import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { loginRequest } from '../authConfig';

export const NavigationBar = () => {

    const {instance} = useMsal();

    const handleLoginRedirect = () => {
        //instance.loginRedirect(loginRequest).catch((error) => console.log(error));
        instance.loginPopup(loginRequest).catch((error) => console.log(error))
        console.log("Login")
    };

    const handleLogoutRedirect = () => {
        instance.logoutPopup().catch((error) => console.log(error));
        console.log("Logout")
    };

    const AuthButton = () => {
        return (
            <>
                <AuthenticatedTemplate>
                    <Button 
                    variant='contained'
                    onClick={handleLogoutRedirect}                    
                    >Logout</Button>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Button 
                    variant='contained'
                    onClick={handleLoginRedirect}
                    >Login by Azure</Button>
                </UnauthenticatedTemplate>
            </>
        )
    }

    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            noWrap
                            component='a'
                            href='/'
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                              }}
                        >
                            Workshop
                        </Typography>
                        <AuthButton />
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}