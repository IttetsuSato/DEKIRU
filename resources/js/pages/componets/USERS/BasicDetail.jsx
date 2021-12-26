import React, { useState, useEffect, useMemo } from 'react';
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
import BasicDetailsEdit from './BasicDetailsEdit';
import { Link as LinkRouter } from 'react-router-dom';

export default function BasicDetail() {
    //星の設定部分
    const [userValue, setValue] = React.useState(2.5);
    const [user, setUser] = useState('');
    const id = 1;

    //ユーザ情報を取得しステートuserにセットする
    const getUserData = (id) => {
        axios
            .get('/api/users/' + id)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }
    useEffect(() => {
        getUserData(id);
      },[])

    return (
        <Box sx={{ flexGrow: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Avatar alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56 }} />
                </Grid>

                <Grid item xs={1}>
                <Button size="small" color="primary" component={LinkRouter} to="/componets/TopBar/BasicDetailsEdit" >編集</Button>
               

                </Grid>
                <Grid item xs={12}>
                    ハンドルネーム：
                    <label id="outlined-basic" variant="outlined" value="name" >
                        {user.name}
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <label id="outlined-basic" variant="outlined" value="userValue" >
                        評価：
                    </label>
                    <Rating name="read-only" value={userValue} readOnly />
                    <Link
                        component="button"
                        variant="body1"
                        onClick={() => {
                            console.info("I'm a button.");
                        }}
                    >
                        12
                    </Link>
                </Grid>

                <Grid item xs={12}> 
                    名前：
                    <label id="name" variant="outlined" value="name" >
                        {user.first_name + " " + user.last_name}
                    </label>                  
                </Grid>
                <Grid item xs={12}> 
                    生年月日：
                    <label id="birthday" variant="outlined" value="birthday" >
                        {user.birthday}
                    </label>                  
                </Grid>
                <Grid item xs={12}> 
                    性別：
                    <label id="sex" variant="outlined" value="sex" >
                        {user.sex}
                    </label>                    
                </Grid>
                <Grid item xs={12}>
                    年齢：
                    <label id="ages" variant="outlined" value="ages" >
                        {user.ages}
                    </label>                     
                </Grid>
                <Grid item xs={8}>
                    メールアドレス：
                    <label id="email" variant="outlined" value="email" >
                        {user.email}
                    </label>   
                </Grid>
                <Grid item xs={8}>
                    住所：
                    <label id="address" variant="outlined" value="address" >
                        {user.address}
                    </label>   
                </Grid>
                <Grid item xs={8}>
                    登録日：
                    <label id="created_at" variant="outlined" value="created_at" >
                        {user.created_at}
                    </label>  
                </Grid>
                <Grid item xs={1}>
                    <Button size="large">編集</Button>
                </Grid>
                <Grid item xs={8}>
                </Grid>
            </Grid>
        </Box>
    );
}