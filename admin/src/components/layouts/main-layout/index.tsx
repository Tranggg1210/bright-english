"use client";

import "./style.scss";

import React, { useState } from "react";
import {
  BookOutlined,
  SnippetsOutlined,
  UserOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Button } from "antd";
import Logo from "@public/images/logo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LocalStorage from "@src/helpers/local-storage";
import CookieStorage from "@src/helpers/cookies";

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
  getItem("Chủ đề", "/topic", <BookOutlined />),
  getItem("Từ vựng", "/vocabulary", <SnippetsOutlined />),
  getItem("Liên hệ", "/contact", <MailOutlined />),
  getItem("Báo cáo", "/report", <ExclamationCircleOutlined />),
  getItem("Bài tập", "/exercise", <FormOutlined />),
  getItem("Hội thoại", "/conversation", <MessageOutlined />),
];

const App: React.FC<{ main: React.ReactNode }> = ({ main }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    LocalStorage.removeLocalStorage(undefined, true);
    CookieStorage.removeCookie(undefined, true);
    router.push("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div
          className="logo-image"
          style={{ padding: 16, textAlign: "center" }}
        >
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
          style={{ flex: 1 }}
        />
        <div
          style={{
            padding: 16,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            marginTop: "120px"
          }}
        >
          <Button danger block onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
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
