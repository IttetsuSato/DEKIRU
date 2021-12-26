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

export default function BasicDetail() {
    //星の設定部分
    const [userValue, setValue] = React.useState(2.5);
    const [user, setUser] = useState([]);
    const id =1;
    //ユーザ情報を取得しステートuserにセットする
    const getUserData = (id) => {
        axios
            .get('/api/users/' + '1')
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
                    <Button size="large" >変更</Button>
                </Grid>
                <Grid item xs={12}>
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
                    <TextField id="outlined-basic" label="名前" variant="outlined" value="山中大輔" />
                </Grid>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="メールアドレス" variant="outlined" value="aaaa@gmiail.com" />
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