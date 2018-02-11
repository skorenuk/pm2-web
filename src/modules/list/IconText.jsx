import React, { PureComponent } from 'react';
import { Icon } from 'antd';

type Props = {
  type: string;
  text: string;
  onClick: Function;
}

export default class IconText extends PureComponent<Props> {
  render() {
    const { type, text, onClick } = this.props;
    return (
      <span onClick={onClick}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
  }
}
