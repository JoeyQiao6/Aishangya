import './index.less';
import Footer from '../../components/footer';
import backW from '../../assets/imgs/details/back-w.svg'
import React, { useState, useEffect } from 'react';
import list1 from '../../assets/imgs/home/list1.png'
import { connect, useSelector } from 'react-redux';
import CartItem from './cartItem'
import { cartSelector } from "../../redux/shopping/cart"
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
      <div>
        <div className='total-item'>共計：{cartAmount}件產品</div>
        <div className='total-price'>￥{total}</div>
        <div className='total-price'>結算</div>
      </div>
      <Footer />
    </div>
  );
}

export default connect()(Shop);




