import React, { useState,useEffect} from 'react';
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



    



function BasicDetailsEdit() {
    //const [user, setFormData] = useState(props); // valueをstateで管理
    //const {user, setValue} = props;
    const id = 1;
    //const user = props;
    // const [user, setFormData] = useState({ user_name: props, first_name:"", last_name:"", birthday:""
    //                                     ,sex:"" , ages:"", email:"", address:"" , id:""});
    const [user, setUser] = useState('');

    //ユーザ情報を取得しステートuserにセットする
    const getUserData = (id) => {
        axios
            .get('/api/users/' + id)
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }
    useEffect(() => {
        getUserData(id);
    },[])


    //入力値を投げる
    const EditBasicDetails = async(id) => {
      console.log(user);
        await axios
            .put('/api/users/'+ id, user)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
              })
            .catch(error => {
              console.log(error);
            });
          }

          const inputChange = (e) => {
            const key = e.target.name;
            const value = e.target.value;
            user[key] = value;
            
            let data = Object.assign({}, user);
            setUser(data);
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
                <TextField name="user_name" label="ハンドルネーム" variant="outlined" defaultValue={user.user_name} onChange={inputChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="first_name" label="名前(姓)" variant="outlined" defaultValue={user.first_name} onChange={inputChange} /> 
                </Grid>
                <Grid item xs={12}>
                  <TextField id="last_name" label="名前(名)" variant="outlined" defaultValue={user.last_name} onChange={inputChange}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField id="birthday" label="生年月日" variant="outlined" defaultValue={user.birthday} onChange={inputChange}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField id="sex" label="性別" variant="outlined" defaultValue={user.sex} onChange={inputChange}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField id="ages" label="年齢" variant="outlined" defaultValue={user.ages} onChange={inputChange}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email" label="メールアドレス" variant="outlined" defaultValue={user.email} onChange={inputChange}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField id="address" label="住所" variant="outlined" defaultValue={user.address} onChange={inputChange}/> 
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

