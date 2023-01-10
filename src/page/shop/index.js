import './index.less';
import Footer from '../../components/footer';
import backW from '../../assets/imgs/details/back-w.svg'
import React, { useState, useEffect } from 'react';
import list1 from '../../assets/imgs/home/list1.png'
import { connect } from 'react-redux';
import CartItem from './cartItem'

const Shop = ({ cart }) => {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    getDetaileByIds(cart).then(res => {
      setCatdetail(res)
    })
  }, [])
  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalItems, totalPrice, setTotalItems, setTotalPrice])

  return (
    <div className="shop-box">
      <div className="shop-back">
        <img src={backW}></img>
        <p>购物车</p>
      </div>
      {cart.map((item) => (
        <CartItem key={item.id} itemData={item} />))}
      <div>
        <div className='total-item'>共計：{totalItems}件產品</div>
        <div className='total-price'>￥{totalPrice}</div>
        <div className='total-price'>結算</div>
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart
  }
}
export default connect(mapStateToProps)(Shop);




