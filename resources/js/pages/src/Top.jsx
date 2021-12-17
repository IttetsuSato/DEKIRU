import React, { useState } from 'react';
import './assets/styles/style.css'
import { Grid } from '@material-ui/core';
import Header from './componets/Heder';
import TopBar from './componets/TopBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Copyright from './componets/Copyright';
import login from './componets/login'
import SignUp from './componets/SignUp';
import Basic from './componets/QUES/Basic';
import BasicDetail from './componets/USERS/BasicDetail';
import Confirm from './componets/QUES/Confirm';
import QuestionList from './componets/QUES/QuestionList';
import Mypage from './componets/USERS/Mypage';
import Notific from './componets/USERS/notific';
import Setting from './componets/USERS/setting';
import QuestionPage from './componets/QUES/QuestionPage';

export default function Top() {
    const [value, setValue] = useState("")

    function isValue(value) {
        if (value == "Mypage") {
            value = ""
        }
    }
    return (
        <Grid container direction="column">
            <Header setValue={setValue} />
            { value == "Mypage" ?
            <Mypage />
            : value == "notific" ?
                <Notific />
                : value == "setting" ?
                    <Setting />
                    : <>
                        <isValue />
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={login} />
                                <Route exact path="/componets/SignUp" component={SignUp} />
                                <Route exact path="/componets/TopBar" component={TopBar} />
                                <Route exact path={"/componets/TopBar/QuettionPage"} component={QuestionPage} />
                                <Route exact path={"/componets/TopBar/Question"} component={Basic} />
                                <Route exact path={"/componets/TopBar/QuestionList"} component={QuestionList} />
                                <Route exact path={"/componets/TopBar/Mypage"} component={Mypage} />
                                <Route exact path={"/componets/TopBar/Question/Detail"} component={BasicDetail} />
                                <Route exact path={"/componets/TopBar/Question/Detail/Confirm"} component={Confirm} />
                            </Switch>
                        </BrowserRouter>
                    </>
            }
            <Copyright sx={{ mt: 5 }} />
        </Grid>
    );
}
