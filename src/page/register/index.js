import React from 'react';
import './index.less';
import logo from "../../assets/imgs/profile/logo1.png";
import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import picture from "../../assets/imgs/login/picture.png"
import edit from "../../assets/imgs/login/edit.png"
import { Link } from "react-router-dom"
import instance from '../../service/request';
import { Dialog } from 'antd-mobile'
const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    instance.post('/apis/common/merchantuseradd/add', values).then((val) => {
      console.log(val);
      if (val.data.success) {

        Dialog.alert({
          content: '创建成功',
          closeOnMaskClick: true,
        })
        window.location.href = "/#/Login"
      }
    })
  }
  return (
    <div className='register'>
      <div className='login-logo'>
        <img src={logo} alt="" onClick={() => { window.location.href = "/#/" }}></img>
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
          <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="店铺名称" />
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
