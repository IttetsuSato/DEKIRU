import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './pages/assets/styles/style.css'
import { Grid } from '@material-ui/core';
import Header from './pages/componets/Heder';
import TopBar from './pages/componets/TopBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Copyright from './pages/componets/Copyright';
import login from './pages/componets/login'
import SignUp from './pages/componets/SignUp';
import Basic from './pages/componets/QUES/Basic';
import BasicDetail from './pages/componets/USERS/BasicDetail';
import Confirm from './pages/componets/QUES/Confirm';
import QuestionList from './pages/componets/QUES/QuestionList';
import Mypage from './pages/componets/USERS/Mypage';
import Notific from './pages/componets/USERS/notific';
import Setting from './pages/componets/USERS/setting';
import QuestionPage from './pages/componets/QUES/QuestionPage';
import PostEdit from './pages/PostEdit';
import Skyway from './pages/Skyway';
import UserIndex from './pages/User/UserIndex';

export default function Top() {
    const [value, setValue] = useState("")

    return (
        <Grid container direction="column">
            <Header setValue={setValue} />
            { value == "Mypage" ?
            <Mypage />
            : value == "notific" ?
                <Notific />
                : value == "setting" ?
                    <Setting />
                    : <div>
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
                            <Route path='/users' exact component={UserIndex} />
                            <Route path='/post/edit/:id' exact component={PostEdit} />
                            <Route path='/skyway' exact component={Skyway} />
                        </Switch>
                    </div>
            }
            <Copyright sx={{ mt: 5 }} />
        </Grid>
    );
}

ReactDOM.render((
  <BrowserRouter>
    <Top />
  </BrowserRouter>
), document.getElementById('app'))