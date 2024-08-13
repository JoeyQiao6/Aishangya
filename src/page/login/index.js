import React, { useEffect, useRef, useState } from "react";
import "./index.less";
import logo from "../../assets/imgs/logo/logo1.png";
import gongzhonghao from "../../assets/imgs/logo/gongzhonghao.jpg";
import { LockOutlined, UserOutlined, QrcodeOutlined, MessageOutlined, WechatOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import CaptchaImage from "../../components/login/code";
import instance from "../../service/request";
import { message } from 'antd';
import { ImageViewer } from 'antd-mobile'
import { faIR } from "date-fns/locale";
const Login = () => {
  const captchaImageRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [msg, setMsg] = useState("还未通过审批，请耐心等待或联系客服人员")
  const [msgState, setMsgState] = useState(false)
  const [imgVisible, setImgVisible] = useState(false);
  useEffect(() => {
    instance.post("/apis/youshan-m/index/").then((val) => {
      if (val.data.success) {
        window.location.href = "/#/";
      }
    })
  }, []); //防抖
  const onFinish = (values) => {
    instance.post("/apis/youshan-m/index/login", values).then((val) => {
      if (val.data.success) {
        window.location.href = "/#/";
        setMsgState(false)
        localStorage.setItem("loginState", true)
        window.location.reload();
      } else {
        switch (val.data.results) {
          case "0":
            setMsg("还未通过审批，请耐心等待或联系客服人员")
            setMsgState(true)
            break
          case "2":
            setMsg("您的账号已被禁用，请联系客服人员")
            setMsgState(true)
            break
          default:
            messageApi.open({
              type: 'error',
              content: val.data.results,
            });
            setMsgState(false)
        }
        localStorage.setItem("loginState", false)
        captchaImageRef.current.click();
      }
    });
  };

  return (
    <>
      {msgState ?
        <div style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", /* 如果需要水平居中 */
          height: "100vh"
        }}>
          <div style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <MessageOutlined />
            {msg}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginTop: "20px" }} /* 添加一些间距，让按钮和文字之间有一定的空隙 */
              onClick={() => setImgVisible(true)}
            >
              <WechatOutlined />
              联系客服人员
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => setMsgState(false)}
              style={{ marginTop: "20px" }} /* 添加一些间距，让按钮和文字之间有一定的空隙 */
            >
              返回
            </Button>
            <ImageViewer
              image={gongzhonghao}
              visible={imgVisible}
              onClose={() => {
                setImgVisible(false)
              }}
            />
          </div>
        </div> :

        <div className="login">
          {contextHolder}
          <div className="login-logo">
            <img src={logo} alt=""></img>
          </div>
          <div className="weclome">
            <p>爱尚鴨</p>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              rememberMe: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="uname"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input
                autoComplete="username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
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
                autoComplete="current-password"
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
            {/* <Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="/">
            忘记密码?
          </a>
        </Form.Item> */}

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
      }
    </>
  );
};

export default Login;
