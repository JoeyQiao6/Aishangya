import "./index.less";
import React from "react";
import Profiler from "../../assets/imgs/profile/profile.png";
import Personal from "../../components/personal";
import hisShopping from "../../assets/imgs/profile/hisShopping.png";
import personalCenter from "../../assets/imgs/profile/personal-center.png";
import address from "../../assets/imgs/profile/address.png";
import logout from "../../assets/imgs/profile/logout.png";
import help from "../../assets/imgs/profile/help.png";
import morethen from "../../assets/imgs/profile/morethen.png";
import Footer from "../../components/footer";
import instance from "../../service/request";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const negative = useNavigate();
  const logoutfunc = () => {
    instance.post("/apis/logout").then(() => {
      window.location.href = "/#/login";
      window.location.reload();
    });
  };
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
        <div>
          <div>
            <img src={help} alt=""></img>
            <p>帮助中心</p>
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
    </div>
  );
};
export default Profile;
