import React from "react";
import {Card} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";

const Widget = ({title, children, styleName, cover, extra, actions}) => {

  return (
    <Card title={<IntlMessages id={title} />} actions={actions} cover={cover} className={`gx-card-widget ${styleName}`} extra={extra}>
      {children}
    </Card>
  )
};

export default Widget;
Widget.defaultProps = {
  styleName: '',
};

Widget.propTypes = {
  title: PropTypes.string,
  extra: PropTypes.node,
  cover: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired
};
