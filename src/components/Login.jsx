import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Input } from '@mui/material';
import { redirect } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';


const defaultUsername = "kminchelle";
const defaultPassword = "0lelplR";
export const Login = () => {
    const [email, setEmail] = useState(defaultUsername);
    const [password, setPassword] = useState(defaultPassword);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password, })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data,'shivam data');
            setLoading(false);
            if(data && data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data));
                alert("user logged in");
                window.location = '/';
            } else if(data && data.message) {
                alert(data.message);
            }
        })
        .then((e)=>{
            console.log(e);
            setLoading(false);
        });
    }
  return (
    <Box sx={{ flexGrow: 1 }} p={6}>
        <h1>
            Login Page
        </h1>
        <form onSubmit={handleSubmit}>
            <Grid padding={10} container justifyContent={"center"} alignItems={"center"} spacing={2}>
                <Grid item xs={12}>
                    <Input fullWidth type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Input fullWidth type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' type="submit">
                        Login
                    </Button>
                    {loading && <LoadingButton/>}
                </Grid>
            </Grid>
        </form>
    </Box>
  )
}
