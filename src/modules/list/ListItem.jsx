// @flow
import React, { Component } from 'react';
import bind from 'autobind-decorator';
import { List, Icon, Row, Col } from 'antd';
import type { Server } from '../../store/ListStore';
import IconText from './IconText';
import routes from '../../utils/routes';
import { fetchData } from '../../utils';
import ServerIcon from './ServerIcon';
import moment from 'moment';
import Uptime from './Uptime';

type Props = {
  item: Server;
}

export default class ListItem extends Component<Props> {

  @bind
  onStart() {
    fetchData(`${routes.apiUrl}/pm2/start`, { id: this.props.item.pm_id })
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
        } else {
          console.log(res);
        }
      })
  }

  @bind
  onRestart() {
    fetchData(`${routes.apiUrl}/pm2/restart`, { id: this.props.item.pm_id })
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
        } else {
          console.log(res);
        }
      })
  }

  @bind
  onStop() {
    fetchData(`${routes.apiUrl}/pm2/stop`, { id: this.props.item.pm_id })
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
        } else {
          console.log(res);
        }
      })
  }

  render() {
    const { item } = this.props;
    return (
      <List.Item
        extra={
          <div className="extra-wrapper">
            <div>
              <ServerIcon status={item.pm2_env.status} />
            </div>
            <div>{item.pm2_env.status}</div>
            <div>{item.pm2_env.status === 'online' && <Uptime id={item.pm_id} />}</div>
          </div>
        }
        actions={[
          <IconText type="play-circle" text="Start Server" onClick={this.onStart} />,
          <IconText type="reload" text="Reload Server" onClick={this.onRestart} />,
          <IconText type="close-circle" text="Stop Server" onClick={this.onStop} />
        ]}
      >
        <List.Item.Meta
          // avatar={avatar(item)}
          title={item.name}
        />
        <Row type="flex">
          <Col span={6}>
            <div>
              Id: {item.pm_id} <br />
              pid: {item.pid}
            </div>
          </Col>
          <Col span={6}>Status: {item.pm2_env.status}</Col>
          <Col span={6}>

          </Col>
          <Col span={6}>

          </Col>
        </Row>
      </List.Item>
    );
  }
}
