// @flow
import React, { Component } from 'react';
import logo from '../../assets/pm2-large.png';
import './App.scss';
import ServerList from '../list/ServerList';
import { subscribeToList } from '../../utils/socket';

export default class App extends Component<{}> {
  constructor(props: any) {
    super(props);
    subscribeToList();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <ServerList />
        </div>
      </div>
    );
  }
}
