import './index.less';
import Footer from '../../components/footer';
import backW from '../../assets/imgs/details/back-w.svg'
import React, { useState, useEffect } from 'react';
import list1 from '../../assets/imgs/home/list1.png'
import { connect, useSelector } from 'react-redux';
import CartItem from './cartItem'
import { cartSelector } from "../../redux/shopping/cart"
import { Link } from "react-router-dom"
const Shop = ({ }) => {
  const { total, cart, cartAmount } = useSelector(cartSelector)
  console.log(cart)
  return (
    <div className="shop-box">
      <div className="shop-back">
        <img src={backW}></img>
        <p>购物车</p>
      </div>
      {Object.keys(cart).map((key, index) => (
        <CartItem key={index} itemData={cart[key]} />
      ))}
      <div className='total-box'>
        <div className='total-item'>
          <span>共</span>
          <span> {cartAmount}43</span>
          <span>件</span></div>
        <div className='total-right'>
          <div className='total-price'>
            <span>￥</span>
            <span>189000{total}</span>
          </div>
          <Link to="/confirmPay" className='total-btn'>結算</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connect()(Shop);




