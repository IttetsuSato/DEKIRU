import React from 'react';
import './assets/styles/style.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './componets/SignUp';
import Signin from './componets/login';
import Top from './Top';


export default class App extends React.Component {
  //初期化メソッド
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/componets/SignUp" component={SignUp} />
          <Route exact path="/Top" component={Top} />
        </Switch>
      </BrowserRouter>
    );
  }
}
