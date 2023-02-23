import React from 'react';
import './index.less';
import logo from "../../assets/imgs/profile/logo1.png";
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import picture from "../../assets/imgs/login/picture.png"
import edit from "../../assets/imgs/login/edit.png"
import { Link } from "react-router-dom"

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  }
  return (
    <div className='register'>
      <div className='login-logo'>
        <img src={logo} alt=""></img>
      </div>
      <div className='login-picture'>
        <img src={picture} alt=""></img>
        <img src={edit} alt=""></img>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入您的电话!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="电话号码" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入您的邮箱!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码！',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Link to="/Login" className="login-form-forgot" >
            已有账号？立即登录!
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
