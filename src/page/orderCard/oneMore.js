import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import "./oneMore.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector, getOrderWithImageById, getImageByIds } from "../../redux/order/order"
import { cartSelector } from "../../redux/shopping/cart"
import Item from './item'

const OneMore = () => {
  const negative = useNavigate();
  const dispatch = useDispatch()
  const [para] = useState(useParams());
  const renderRef = useRef(true); // 防止useEffect执行两次
  const [products, setProducts] = useState({})
  const { currentOrder } = useSelector(orderSelector)
  const { cart } = useSelector(cartSelector)

  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    dispatch(getOrderWithImageById(para.id))
  }, [dispatch])
  useEffect(() => {
    if (currentOrder.data) {
      const data = JSON.parse(currentOrder.data)
      console.log(data);
      const pids = []
      for (const key in data) {
        pids.push(data[key].pid)
        console.log(cart[key])
        if (cart[key]) {
          data[key].count = cart[key].count
        } else {
          data[key].count = 0
        }
      }
      setProducts(data)
      dispatch(getImageByIds(pids))
    }
  }, [currentOrder])

  return (
    <div className="one_more">
      <div className="shop-back">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>再来一单</p>
      </div>
      {Object.keys(products).map((key, index) => (
        <Item key={index} itemData={products[key]} />
      ))}
      {/* <div className='total-box'>
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
      </div> */}
    </div >
  );
};

export default OneMore;
