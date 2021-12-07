import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import Example from './pages/Example';
import Home from './pages/Home';
import PostEdit from './pages/PostEdit';
import Skyway from './pages/Skyway';
import UserIndex from './pages/User/UserIndex';
import DekiruApp from './pages/src/DekiruApp.jsx';

//開発用サブページのルーティング
  function App() {
    return (
        <div>
            <Switch>
              <Route path='/' exact component={DekiruApp} />
              <Route path='/users' exact component={UserIndex} />
              <Route path='/example' exact component={Example} />
              <Route path='/post/edit/:id' exact component={PostEdit} />
              <Route path='/skyway' exact component={Skyway} />
            </Switch>
        </div>
    );
}

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'))