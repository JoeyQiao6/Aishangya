import './index.less';
import home from "../../assets/imgs/footer/home.svg";
import shop from "../../assets/imgs/footer/shop.svg";
import profile from "../../assets/imgs/footer/profile.svg";
import mall from "../../assets/imgs/footer/mall.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer-box'>
      <div>
        <NavLink exact to="/" className="fontcolor">
          <i className='iconfont icon-home'></i>
          <p>首页</p></NavLink>
      </div>
      
      <div>
        <NavLink to="/shop" className="fontcolor">
          <i className='iconfont icon-shop'></i>
          <p>购物车</p></NavLink>
      </div>
      <div>
        <NavLink to="/profile" className="fontcolor">
          <i className='iconfont icon-profile'></i>
          <p>我的</p></NavLink>
      </div>
      <div>
        <NavLink to="/mall"className="fontcolor">
          <i className='iconfont icon-mall'></i>
          <p>关于</p></NavLink>
      </div>
    </div>
  )
}

export default Footer;