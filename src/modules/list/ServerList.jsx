// @flow
import React, { Component } from 'react';
import { List } from 'antd';
import { observer } from 'mobx-react';
import listStore from '../../store/ListStore';
import type { Server } from '../../store/ListStore';
import './ServersList.scss';
import ListItem from './ListItem';

type State = {
  loading: boolean;
}

@observer
export default class ServerList extends Component<{}, State> {
  state = {
    loading: false,
  }

  renderList(item: Server) {
    return <ListItem item={item} />
  }

  render() {
    return (
      <List
        className="servers-list"
        itemLayout="vertical"
        size="large"
        dataSource={listStore.list.peek()}
        loading={listStore.list.length === 0}
        renderItem={this.renderList}
      />
    );
  }
}
