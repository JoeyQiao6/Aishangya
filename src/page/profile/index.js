import "./index.less";
import React, { useState } from "react";
import Profiler from "../../assets/imgs/profile/baidao.png";
import Personal from "../../components/personal";
import hisShopping from "../../assets/imgs/profile/hisShopping.png";
import personalCenter from "../../assets/imgs/profile/personal-center.png";
import address from "../../assets/imgs/profile/address.png";
import logout from "../../assets/imgs/profile/logout.png";
import morethen from "../../assets/imgs/profile/morethen.png";
import Footer from "../../components/footer";
import instance from "../../service/request";
import { useNavigate } from "react-router-dom";
import { ImageViewer } from 'antd-mobile'
import gongzhonghao from "../../assets/imgs/logo/gongzhonghao.jpg";
import { WechatOutlined } from "@ant-design/icons";
const Profile = () => {
  const negative = useNavigate();
  const logoutfunc = () => {
    instance.post("/apis/youshan-m/index/logout").then(() => {
      localStorage.setItem("loginState", false)
      window.location.href = "/#/login";
    });
  };

  const [imgVisible, setImgVisible] = useState(false);
  return (
    <div className="profile">
      <div className="profile-header">
        <img src={Profiler} alt=""></img>
        <p>Profile</p>
      </div>
      <Personal />
      <div className="profile-list">
        <div onClick={() => {
          negative("/orderCard");
        }}>
          <div>
            <img src={hisShopping} alt=""></img>
            <p>订单管理</p>
          </div>
          <img src={morethen} alt=""></img>
        </div>
        <div onClick={() => {
          negative("/refunderList");
        }}>
          <div>
            <img src={hisShopping} alt=""></img>
            <p>退货管理</p>
          </div>
          <img src={morethen} alt=""></img>
        </div>
        <div
          onClick={() => {
            negative("/addressAll");
          }}
        >
          <div>
            <img src={address} alt=""></img>
            <p>地址管理</p>
          </div>
          <img src={morethen} alt=""></img>
        </div>
        <div onClick={() => {
          negative("/updateProfile");
        }}>
          <div>
            <img src={personalCenter} alt="" style={{ width: '20px', height: '20px' }} ></img>
            <p>修改个人信息</p>
          </div>
          <img src={morethen} alt=""></img>
        </div>
        <div onClick={() => {
          setImgVisible(true)
        }}>
          <div>
            <img src={personalCenter} alt="" style={{ width: '20px', height: '20px' }} ></img>
            <p>联系客服人员</p>
          </div>
          <img src={morethen} alt=""></img>
        </div>
        <div
          onClick={() => {
            logoutfunc();
          }}
        >
          <div>
            <img src={logout} alt=""></img>
            <p>登出</p>
          </div>
          <img src={morethen} alt=""></img>
        </div>
      </div>
      <Footer />
      <ImageViewer
        image={gongzhonghao}
        visible={imgVisible}
        onClose={() => {
          setImgVisible(false)
        }}
      />
    </div>
  );
};
export default Profile;
