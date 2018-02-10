// @flow
import React, { Component } from 'react';
import bind from 'autobind-decorator';
import { List, Avatar, Menu, Dropdown, Icon } from 'antd';

import icon from '../../assets/29558-200.png';
import { observer } from 'mobx-react';
import listStore from '../../store/ListStore';
import type { Server } from '../../store/ListStore';
import './ServersList.scss';
import { fetchData } from '../../utils';
import routes from '../../utils/routes';

const { Item: ListItem } = List;
const { Meta } = ListItem;

type EventKey = "start" | "restart" | "stop";
type ClickedItem = {
  props: {
    pm_id: number;
    eventKey: EventKey;
  };
}


@observer
export default class ServerList extends Component<{}> {

  @bind
  onItemClick({ domEvent, item }: { domEvent: Event, item: ClickedItem }) {
    console.log(item.props);
    this.processClickAction(item.props.eventKey, item.props.pm_id);
    //.bind(this, item.pm_id)
    /*fetchData(`${routes.apiUrl}/pm2/restart`, { id })
      .then((res) => {
        if (res && res.data) {
          const server = res.data[0];
          listStore.updateServer(server);
        }
      })*/
  }

  processClickAction(eventKey: EventKey, id: number) {
    let server: Server = listStore.getServer(id);
    switch (eventKey) {
      case 'start':
        console.log(`Do ${eventKey}`);
        console.log(server)
        break;
      case 'restart':
        console.log(`Do ${eventKey}`);
        console.log(server)
        break;
      case 'stop':
        console.log(`Do ${eventKey}`);
        console.log(server)
        break;
    }
  }

  render() {
    return (
      <List
        className="servers-list"
        itemLayout="horizontal"
        dataSource={listStore.list.peek()}
        renderItem={(item: Server) => (
          <ListItem>
            <Meta
              avatar={<Avatar src={icon} />}
              title={item.name}
              description={
                <div>
                  Id: {item.pm_id} Status: {item.pm2_env.status} <br />
                  pid: {item.pid}
                </div>
              }
            />
            <Dropdown
              overlay={
                <Menu onClick={this.onItemClick}>
                  <Menu.Item key="start" pm_id={item.pm_id}>
                    Start server
                  </Menu.Item>
                  <Menu.Item key="restart" pm_id={item.pm_id}>
                    Reload server
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="stop" pm_id={item.pm_id}>
                    Stop server
                  </Menu.Item>
                </Menu>
              }
              trigger={['click', 'contextMenu']}>
              <a className="ant-dropdown-link" href="#" onClick={(e: Event) => {
                e.stopPropagation();
                e.preventDefault();
              }}>
                Click me <Icon type="down" />
              </a>
            </Dropdown>
          </ListItem>
        )}
      />
    );
  }
}
