import React, { useEffect, useRef } from "react";
import "./index.less";
import logo from "../../assets/imgs/profile/logo1.png";
import { LockOutlined, UserOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import CaptchaImage from "../../components/login/code";
import instance from "../../service/request";
const Login = () => {
  const renderRef = useRef(true); // 防止useEffect执行两次
  const captchaImageRef = useRef(null);
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false;
      return;
    }
  }, []); //防抖
  const onFinish = (values) => {
    instance.post("/apis/login", values).then((val) => {
      if (val.data.success) {
        window.location.href = "/#/";
        window.location.reload();
      } else {
        alert(val.data.results);
        captchaImageRef.current.click();
      }
    });
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img src={logo} alt=""></img>
      </div>
      <div className="weclome">
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
              message: "请输入您的电话或者邮箱!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="电话号码或者邮箱"
          />
        </Form.Item>
        <Form.Item
          name="upass"
          rules={[
            {
              required: true,
              message: "请输入您的密码！",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <div className="code-box">
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码！",
              },
            ]}
          >
            <Input
              prefix={<QrcodeOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="验证码"
            />
          </Form.Item>
          <CaptchaImage ref={captchaImageRef} />
        </div>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="/">
            忘记密码?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <Link to="/register">立即注册!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
