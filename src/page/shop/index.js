import './index.less';
import Footer from '../../components/footer';
import backW from '../../assets/imgs/details/back-w.svg'
import React from 'react';
import { connect, useSelector } from 'react-redux';
import CartItem from './cartItem'
import { cartSelector } from "../../redux/shopping/cart"
import { Link } from "react-router-dom"
const Shop = () => {
  const { total, cart, cartAmount } = useSelector(cartSelector)
  const pageHeight = document.documentElement.scrollHeight - 34 - 30 - 75 - 55 - 20;
  return (
    <div className="shop-box">
      <div className="shop-back">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>购物车</p>
      </div>
      <div className='box-list' style={{ height: pageHeight }}>
        {Object.keys(cart).map((key, index) => (
          <CartItem key={index} itemData={cart[key]} />
        ))}
      </div>
      <div className='total-box'>
        <div className='total-item'>
          <span>共</span>
          <span> {cartAmount}</span>
          <span>件</span></div>
        <div className='total-right'>
          <div className='total-price'>
            <span>￥</span>
            <span>{total}</span>
          </div>
          <Link to="/confirmPay" className='total-btn'>結算</Link>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default connect()(Shop);




