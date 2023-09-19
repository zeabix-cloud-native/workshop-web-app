import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../authConfig"

import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";

import { GetProfile } from "../services/profileService"
import { useEffect, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BadgeIcon from '@mui/icons-material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import CallIcon from '@mui/icons-material/Call';
import HomeIcon from '@mui/icons-material/Home';

export const ProfileCard = (props) => {
    const { instance, inProgress, accounts } = useMsal();
    const [data, setData] = useState(null);
    
    

    useEffect(() => {
        if (!data && inProgress === InteractionStatus.None){
            instance.acquireTokenSilent(loginRequest)
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.accessToken;
                GetProfile(props.id, accessToken).then((p) => setData(p)).catch((error) => console.log(error))
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                  instance
                    .acquireTokenPopup(loginRequest)
                    .then(function (accessTokenResponse) {
                      // Acquire token interactive success
                      let accessToken = accessTokenResponse.accessToken;
                      GetProfile(props.id, accessToken).then((p) => setData(p)).catch((error) => console.log(error))
                    })
                    .catch(function (error) {
                      // Acquire token interactive failure
                      console.log(error);
                    });
                }
                console.log(error);
              });
          }
    },[instance, accounts, inProgress, data])

    if (!data){
        return (
            <CircularProgress />
        )
    }

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            { data.username.toUpperCase().charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="setting">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={ data.firstname + " " + data.lastname }
                    subheader={ data.username }
                />
                
                <CardContent>
                    <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: red[500] }}>
                                    <BadgeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={ data.firstname + ' ' + data.lastname} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: red[500] }}>
                                    <CakeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="12/11/1980" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: red[500] }}>
                                    <CallIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="+66 (0) 88 888-8888" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: red[500] }}>
                                    <HomeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="100/100 Sukhumvit rd, Silom, Bangrak, Bangkok, 10200" />
                        </ListItem>
                    </List>

                </CardContent>

            </Card>
        </>
    )
}