// @flow
import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.scss';
import { fetchData } from '../../utils';
import routes from '../../utils/routes';
import ServerList from '../list/ServerList';
import listStore from '../../store/ListStore';

export default class App extends Component<{}> {
  constructor(props: any) {
    super(props);
    fetchData(`${routes.apiUrl}/pm2/list`)
      .then((res) => {
        if (res && res.data) {
          listStore.addServer(res.data);
          console.log(res.data);
        }
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <ServerList />
        </div>
      </div>
    );
  }
}
