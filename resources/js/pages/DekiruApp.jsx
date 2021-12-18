
import React from 'react';
import './assets/styles/style.css'
import Top from './Top.jsx';


export default class DekiruApp extends React.Component {
  //初期化メソッド
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Top />
    );
  }
}