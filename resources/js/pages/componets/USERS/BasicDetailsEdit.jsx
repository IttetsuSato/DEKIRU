import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function BasicDetailsEdit(props) {

    const {user} = props;
    const id = 1;

    //入力値を投げる
    const EditBasicDetails = async(id) => {
      console.log(user);
        await axios
            .put('/api/users/'+ id, user)
            .then((res) => {
                console.log(res);
              })
            .catch(error => {
              console.log(error);
            });
          }

      return (
        <Box sx={{ flexGrow: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Avatar alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56 }} />
                </Grid>
    
                <Grid item xs={12}>
                <TextField name="user_name" label="ハンドルネーム" variant="outlined" value={user.user_name} />
    
                </Grid>
                <Grid item xs={12}>
                  <TextField id="name" label="名前" variant="outlined" value={user.name} /> 

                </Grid>

                <Grid item xs={1}>
                    <Button variant="contained" color="primary" onClick={()=>{EditBasicDetails(user.id)}} >保存</Button>
                </Grid>
                <Grid item xs={8}>
                </Grid>
            </Grid>
        </Box>
      )
  }
  
  export default BasicDetailsEdit

