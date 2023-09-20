import { useMsal } from "@azure/msal-react"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { ListProfiles } from "../services/adminService"

import { loginRequest } from "../authConfig"

import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";


export const ListProfilePage = () => {

    const { instance, inProgress, accounts } = useMsal();
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        if (!profiles && inProgress === InteractionStatus.None){
            instance.acquireTokenSilent(loginRequest)
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.accessToken;
                ListProfiles(accessToken).then((p) => setProfiles(p)).catch((error) => console.log(error))
            })
            .catch((error) => {
                if (error instanceof InteractionRequiredAuthError) {
                  instance
                    .acquireTokenPopup(loginRequest)
                    .then(function (accessTokenResponse) {
                      // Acquire token interactive success
                      let accessToken = accessTokenResponse.accessToken;
                      ListProfiles(accessToken).then((p) => setProfiles(p)).catch((error) => console.log(error))
                    })
                    .catch(function (error) {
                      // Acquire token interactive failure
                      console.log(error);
                    });
                }
                console.log(error);
              });
          }
    },[instance, accounts, inProgress, profiles])

    if (!profiles){
        return (
            <></>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
                <TableHead>
                    <TableCell>Username</TableCell>
                    <TableCell>Firstname</TableCell>
                    <TableCell>Lastname</TableCell>
                    <TableCell>DOB</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Address</TableCell>
                </TableHead>
                <TableBody>
                    {profiles.map((p) => (
                        <TableRow
                            key={p.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {p.username}
                            </TableCell>
                            <TableCell align="right">{p.firstname}</TableCell>
                            <TableCell align="right">{p.lastname}</TableCell>
                            <TableCell align="right">{p.dob}</TableCell>
                            <TableCell align="right">{p.mobile}</TableCell>
                            <TableCell align="right">{p.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}