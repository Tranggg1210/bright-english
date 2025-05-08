"use client";

import "./style.scss";

import React, { useState } from "react";
import {
  BookOutlined,
  FileOutlined,
  SnippetsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Logo from "@public/images/logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Người dùng", "/", <UserOutlined />),
  getItem("Topic", "/topic", <BookOutlined />),
  getItem("Từ vựng", "/vocabulary", <SnippetsOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App: React.FC<{ main: React.ReactNode }> = ({ main }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }} className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo-image">
          <Image src={Logo} alt="logo" />
        </div>
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (!key.toString().startsWith("sub")) {
              router.push(key.toString());
            }
          }}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {main}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
