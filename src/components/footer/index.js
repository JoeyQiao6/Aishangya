import './index.less';
// import home from "../../assets/imgs/footer/home.svg";
// import shop from "../../assets/imgs/footer/shop.svg";
// import profile from "../../assets/imgs/footer/profile.svg";
// import mall from "../../assets/imgs/footer/mall.svg";
import { NavLink } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import React from 'react';
import { cartSelector } from "../../redux/shopping/cart"

const Footer = () => {
  const { cartAmount } = useSelector(cartSelector)

  return (
    <div className='footer-box'>
      <div>
        <NavLink to="/" className="fontcolor" exact="true">
          <i className='iconfont icon-home'></i>
          <p>首页</p></NavLink>
      </div>

      <div style={{ position: 'relative' }}>
        <NavLink to="/shop" className="fontcolor">
          <i className='iconfont icon-shop'></i>
          <p>购物车</p></NavLink>
        <span>{cartAmount}</span>
      </div>
      <div>
        <NavLink to="/like" className="fontcolor">
          <i className='iconfont icon-mall'></i>
          <p>我的收藏</p></NavLink>
      </div>
      <div>
        <NavLink to="/profile" className="fontcolor">
          <i className='iconfont icon-profile'></i>
          <p>我的</p></NavLink>
      </div>
    </div>
  )
}
export default connect()(Footer);
