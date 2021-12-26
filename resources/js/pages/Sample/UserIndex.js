import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../../components/MainTable';
import UserCreateForm from './components/UserCreateForm';


//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
  card: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  }
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'email', '編集', '完了'];

function UserIndex() {
  //定義したスタイルを利用するための設定
  const classes = useStyles();
  
  //usersの状態を管理する
  const [users, setUsers] = useState([]);

  //フォームの入力値を管理する
  const [formData, setFormData] = useState({name:'', email:'', password:''});
  
  //画面に到着したらgetUsersDataを呼ぶ
  useEffect(() => {
    getUsersData();
  },[])

  //一覧情報を取得しステートusersにセットする
  const getUsersData = () => {
    axios
        .get('/api/users')
        .then(response => {
            setUsers(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
  }
  
  //入力がされたら（都度）入力値を変更するためのfunction
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    formData[key] = value;
    let data = Object.assign({}, formData);
    setFormData(data);
  }

  const createUser = async() => {
    //空だと弾く
    if(formData == ''){
        return;
    }
    //入力値を投げる
    await axios
        .post('/api/users', {
            name: formData.name,
            email: formData.email,
            password: '12345678',
        })
        .then((res) => {
            const tempUsers = users
            tempUsers.push(res.data);
            setUsers(tempUsers)
            setFormData('');
        })
        .catch(error => {
            console.log(error);
        });
  }
  
  //空配列として定義する
  let rows = [];
  //usersの要素ごとにrowsで使える形式に変換する
  users.map((user) =>
      rows.push({
          name: user.name,
          content: user.email,
          editBtn: <Button color="secondary" variant="contained" key={user.id}  href={`/users/edit/${user.id}`}>編集</Button>,
          deleteBtn: <Button color="primary" variant="contained">完了</Button>,
      })
  );
  
  return (
    <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>ユーザー一覧</h1>

                        <Card className={classes.card}>
                            <UserCreateForm data={formData} btnFunc={createUser} inputChange={inputChange}/>
                        </Card>
                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserIndex;