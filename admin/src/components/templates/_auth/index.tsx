"use client";

import './style.scss';  

import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    const { email, password } = values;

    if (!email || !password) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng nhập đầy đủ thông tin.',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: 'Đăng nhập thành công',
        description: 'Chào mừng bạn quay lại!',
      });
    }, 1000);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 className='text-primary'>Đăng Nhập</h2>
        <Form
          name="loginForm"
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
            help={<span className="custom-error-message">Vui lòng nhập email của bạn!</span>}
            >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập email của bạn"
              size='large'
              className="custom-input" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            help={<span className="custom-error-message">Vui lòng nhập mật khẩu!</span>}
            >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
              size='large'
              className="custom-input" 
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
