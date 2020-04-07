import React from "react";
import "./styles.css";
import ETable from '../ETable';
import { Input } from 'antd';

const columns = [
  {
    dataIndex: 'domain',
    title: '域名',
    editor: <Input />,
  },
  {
    dataIndex: 'path',
    title: '路径',
    editor: <Input />,
  },
  {
    dataIndex: 'group',
    title: '流量分组',
    editor: <Input />,
  },
  {
    dataIndex: 'proxyReadTimeout',
    title: 'proxyReadTimeout',
    editor: <Input />,
    width: 60,
  },
  {
    dataIndex: 'proxyConnectTimeout',
    title: 'proxyConnectTimeout',
    editor: <Input />,
    width: 60,
  },
  {
    dataIndex: 'clientMaxBodySize',
    title: 'clientMaxBodySize',
    editor: <Input />,
    width: 60,
  },
];

export default function App() {
  const [value, setValue] = React.useState([]);

  return (
    <div className="App">
      <h1>e-table</h1>
      <ETable value={value} onChange={setValue} columns={columns} />
    </div>
  );
}
