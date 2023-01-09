import './index.less';
// import home from "../../assets/imgs/footer/home.svg";
// import shop from "../../assets/imgs/footer/shop.svg";
// import profile from "../../assets/imgs/footer/profile.svg";
// import mall from "../../assets/imgs/footer/mall.svg";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

const Footer = ({cart}) => {
  const [cartCount, setCartCount] = useState(0);

  //useEffect 會一直刷新
  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

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
        <span>{cartCount}</span>
      </div>
      <div>
        <NavLink to="/profile" className="fontcolor">
          <i className='iconfont icon-profile'></i>
          <p>我的</p></NavLink>
      </div>
      <div>
        <NavLink to="/mall" className="fontcolor">
          <i className='iconfont icon-mall'></i>
          <p>关于</p></NavLink>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  }
}
export default connect(mapStateToProps)(Footer);