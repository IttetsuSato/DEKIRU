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
    const [formData, setformDataUser] = useState({ user_name: ''});

    const { formDataUser} = props;
    
    //入力値を投げる
    const EditBasicDetails = async() => {
        await axios
            .post('/api/users', formDataUser)
            .then((res) => {
                console.log(res);
                setformDataUser('');
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
                <TextField name="user_name" label="ハンドルネーム" variant="outlined" value={formDataUser.user_name} />
                    {/* <TextField name="user_name" label="ハンドルネーム" variant="outlined" value="dd" /> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField id="name" label="名前" variant="outlined" value={formDataUser} /> */}
                    {/* <TextField id="name" label="名前" variant="outlined" value="test" /> */}
                </Grid>

                <Grid item xs={1}>
                    <Button variant="contained" color="primary" onClick={EditBasicDetails} >保存</Button>
                </Grid>
                <Grid item xs={8}>
                </Grid>
            </Grid>
        </Box>
      )
  }
  
  export default BasicDetailsEdit

