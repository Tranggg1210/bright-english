"use client";

import "./style.scss";

import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { postLogin, updateUserInfor } from "@src/services/auth";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { toast } from "react-toastify";
import _ from "lodash";
import CookieStorage from "@src/helpers/cookies";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const { email, password } = values;

      if (!email || !password) {
        toast.warning("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      setLoading(true);

      const user = await dispatch(postLogin({ email, password })).unwrap();

      if(!_.isEmpty(user)){
        CookieStorage.setCookie('access-token', user.accessToken);
        CookieStorage.setCookie('refresh-token', user.refreshToken);
        dispatch(updateUserInfor(user.user));

        toast.success("Đăng nhập thành công!");

        setTimeout(() => {
          router.push('/');
        }, 500);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="text-primary">Đăng Nhập</h2>
        <Form
          name="loginForm"
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập email của bạn"
              size="large"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size="large"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
