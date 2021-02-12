import React from 'react';
import { Table } from 'antd';

import './DefaultTable.css';

const defaultTable = props => {
  return (
    <Table
      bordered
      {...props}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default defaultTable;
