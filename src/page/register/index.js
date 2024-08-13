import React from 'react';
import './index.less';
import logo from "../../assets/imgs/logo/logo1.png";
import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined, ShopOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link } from "react-router-dom"
import instance from '../../service/request';
import { Dialog } from 'antd-mobile'
const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const pageHeight = document.documentElement.scrollHeight - 75;
  const onFinish = (values) => {
    instance.post('/apis/common/merchantuseradd/add', values).then((val) => {
      if (val.data.success) {
        Dialog.alert({
          content: val.data.results,
          closeOnMaskClick: true,
        })
        window.location.href = "/#/Login"
      } else {
        messageApi.open({
          type: 'error',
          content: val.data.results,
        });
      }
    })
  }
  return (
    <div className='register' >
      {contextHolder}
      <div className='login-logo'>
        <img src={logo} alt="" onClick={() => { window.location.href = "/#/" }}></img>
      </div>
      <Form
        style={{ overflowY: "auto", height: pageHeight }}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          uname: ""
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="unick"
          autoComplete="off"
          rules={[
            {
              required: true,
              message: '请输入店铺名称!',
            },
          ]}
        >
          <Input prefix={<ShopOutlined className="site-form-item-icon" />} placeholder="店铺名称" />
        </Form.Item>
        <Form.Item
          name="name"
          autoComplete="off"
        >
          <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="公司名" />
        </Form.Item>
        <Form.Item
          name="uname"
          autoComplete="off"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="upass"
          autoComplete="current-password"
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
          name="umail"
          autoComplete="off"
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: '请输入电话!',
            },
          ]}
        >
          <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="电话" />
        </Form.Item>
        <Form.Item>
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
