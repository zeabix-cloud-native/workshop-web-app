
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

import JsonView from '@uiw/react-json-view';

import jwt_decode from "jwt-decode";

import { SetupAccount, GetProfileByOID } from '../services/accountService';

import './CreateAccountPage.css'


export const CreateAccountPage = () => {

    const { instance } = useMsal();

    const [ firstname, setFirstname ] = useState();
    const [ lastname, setLastname ] = useState();
    const [ address, setAddress ] = useState();
    const [ mobile, setMobile ] = useState();
    const [ dob, setDob ] = useState(dayjs('2022-04-17'));
    const [ token, setToken ] = useState();
    const [ inprogress, setInprogress ] = useState(false);
    const [ profile, setProfile ] = useState(null);

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handleMobileChange = (event) => {
        setMobile(event.target.value)
    }

    const handleDobChange = (value) => {
        console.log(value)
        setDob(value)
    }

    const handleSubmit = () => {
        console.log("TODO");
        setInprogress(true);

        let dobStr = dob.format('DD/MM/YYYY')
        console.log(dobStr)

        SetupAccount(token, address, mobile, dobStr)
        .then((res) => {
            console.log(res)
            setProfile(res)
        })
        .catch((error) => console.error(error))

    }

    useEffect(() => {
        instance.acquireTokenSilent(loginRequest)
        .then((accessTokenResponse) => {
            let accessToken = accessTokenResponse.accessToken.replace('Bearer', '')
            setToken(accessToken);
            console.log(accessToken)
            let decoded = jwt_decode(accessToken);
            console.log(decoded)

            // Set Firstname
            setFirstname(decoded.given_name);
            setLastname(decoded.family_name)
            
            return GetProfileByOID(accessToken)
        })
        .then((res) => {
            console.log(res)
            setProfile(res)
        })
        .catch((error) => console.log(error))
    },[instance])

    if (profile != null){
        return (
            <>
                <Typography variant='h5' gutterBottom>Your account is already setup</Typography>
                <div className="flex flex-col h-screen justify-start">
                <JsonView value={profile} />
                </div>
                
            </>
        )
    } else {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{ 
            width: 400,
            m: 2,
            p: 2
            }}>
        <FormControl>
            <Grid container spacing={2}>
                <Grid item sx={12}>
                    <Typography fontFamily='roboto' variant='h4' gutterBottom>Setup Account</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h5' gutterBottom>{firstname + ' ' + lastname}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField label="Address" value={address} required id='address-input' multiline rows={4} sx={{width: 1}} onChange={handleAddressChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Mobile" required id='mobile-input' value={mobile} onChange={handleMobileChange} sx={{width: 1}}/>
                </Grid>
                <Grid item xs={12}>
                    <DemoContainer components={['DatePicker']} sx={{ width: 1}}>
                        <DatePicker label="Birthdate"  value={dob} required id='dob-input' onChange={handleDobChange} />
                    </DemoContainer>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={handleSubmit} disabled={inprogress}>Submit</Button>
                </Grid>
            </Grid>
        </FormControl>
        </Paper>
        </LocalizationProvider>
    )
    }
}