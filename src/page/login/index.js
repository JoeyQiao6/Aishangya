import React, { useEffect, useRef } from 'react';
import './index.less';
import logo from "../../assets/imgs/profile/logo1.png";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import CaptchaImage from "../../components/login/code"
import instance from '../../service/request';
const Login = () => {
  const renderRef = useRef(true); // 防止useEffect执行两次
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    instance.post("/apis/logout")
  }, [])//防抖
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    instance.post("/apis/login", values).then((val) => {
      if (val.data.success) {
        window.location.href = "/#/"
      } else {
        alert(val.data.results)
      }
    })
  }
  return (
    <div className='login'>
      <div className='login-logo'>
        <img src={logo} alt=""></img>
      </div>
      <div className='weclome'>
        <p>欢迎您登录</p>
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
          name="uname"
          rules={[
            {
              required: true,
              message: '请输入您的电话或者邮箱!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="电话号码或者邮箱" />
        </Form.Item>
        <Form.Item
          name="upass"
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
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="验证码"
          />
        </Form.Item>
        <CaptchaImage />
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            忘记密码?
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <Link to="/register">立即注册!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
