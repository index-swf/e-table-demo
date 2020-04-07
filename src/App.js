import React from "react";
import "./styles.css";
import ETable from '../ETable';
import { Input } from 'antd';
import "antd/dist/antd.css";

const columns = [
  {
    dataIndex: 'domain',
    title: '域名',
    editor: <Input />,
    width: 200,
  },
  {
    dataIndex: 'path',
    title: '路径',
    editor: <Input />,
    width: 160,
  },
  {
    dataIndex: 'group',
    title: '流量分组',
    editor: <Input />,
    width: 160,
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

const defaultValue = [ // nginx 注册配置参数
        { 
            "domain": "qa.koala.biztech.sogou", // 域名
            "path": "/", // 路径
            "group": "default", // 流量分组
            "proxyReadTimeout": "300s", 
            "proxyConnectTimeout": "2s",
            "clientMaxBodySize": "100M"
        },
        { 
            "domain": "qa.koala.biztech.sogou", // 域名
            "path": "/socket.io/", // 路径
            "group": "default", // 流量分组
            "proxyReadTimeout": "300s", 
            "proxyConnectTimeout": "2s",
            "clientMaxBodySize": "100M"
        }
    ];
export default function App() {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="App">
      <h1>e-table</h1>
      <ETable value={value} onChange={setValue} columns={columns} />
    </div>
  );
}
