// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import listStore from '../../store/ListStore';

type Props = {
  id: number
}

@observer
export default class Uptime extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <span>{listStore.upTime.get(this.props.id)}</span>
  }
}
