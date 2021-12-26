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
import BasicDetail from './pages/componets/USERS/BasicDetail';
import Confirm from './pages/componets/QUES/CreateQuestion3';
import QuestionList from './pages/componets/QUES/QuestionList';
import Mypage from './pages/componets/USERS/Mypage';
import Notific from './pages/componets/USERS/notific';
import Setting from './pages/componets/USERS/setting';
import QuestionPage from './pages/componets/QUES/QuestionPage';
import PostEdit from './pages/PostEdit';
import Skyway from './pages/skyway/Skyway';
import UserIndex from './pages/Sample/UserIndex';
import BasicDetailsEdit from './pages/componets/USERS/BasicDetailsEdit';

export default function Top() {
    const [value, setValue] = useState("");
    const [useHeader, setUseHeader] = useState(true);

    return (
        <Grid container direction="column">
          { useHeader && <Header setValue={setValue} /> }
            { value == "notific" ?
                <Notific />
                : value == "setting" ?
                    <Setting />
                    : 
                      <Switch>
                          <Route exact path="/" component={login} />
                          <Route exact path="/myPage" component={Mypage} />
                          <Route exact path="/componets/SignUp" component={SignUp} />
                          <Route exact path="/componets/TopBar" component={TopBar} />
                          <Route exact path={"/componets/TopBar/QuettionPage"} component={QuestionPage} />
                          <Route exact path={"/componets/TopBar/QuestionList"} component={QuestionList} />
                          <Route exact path={"/componets/TopBar/Mypage"} component={Mypage} />
                          <Route exact path={"/componets/TopBar/Question/Detail"} component={BasicDetail} />
                          <Route exact path={"/componets/TopBar/Question/Detail/Confirm"} component={Confirm} />
                          <Route exact path={"/componets/TopBar/BasicDetailsEdit"} component={BasicDetailsEdit} />

                          <Route path='/sample' exact component={UserIndex} />
                          <Route path='/post/edit/:id' exact component={PostEdit} />
                          <Route path='/skyway' exact component={Skyway} />
                      </Switch>
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