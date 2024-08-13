import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import "./oneMore.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector, getOrderWithImageById, getImageByIds } from "../../redux/order/order"
import { cartSelector } from "../../redux/shopping/cart"
import Footer from '../../components/footer';
import Item from './item'

const OneMore = () => {
  const dispatch = useDispatch()
  const [para] = useState(useParams());
  const renderRef = useRef(true); // 防止useEffect执行两次
  const [products, setProducts] = useState({})
  const { currentOrder } = useSelector(orderSelector)
  const { cart } = useSelector(cartSelector)
  const pageHeight = document.documentElement.scrollHeight - 34 - 30 - 75 - 10;
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    dispatch(getOrderWithImageById(para.id))
  }, [para.id, dispatch])
  useEffect(() => {
    if (currentOrder.data) {
      const data = JSON.parse(currentOrder.data)
      const pids = []
      for (const key in data) {
        pids.push(data[key].pid)
        if (cart[key]) {
          data[key].count = cart[key].count
        } else {
          data[key].count = 0
        }
      }
      setProducts(data)
      dispatch(getImageByIds(pids))
    }
  }, [currentOrder, cart, dispatch])

  return (
    <div className="one_more">
      <div className="shop-back">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>再来一单</p>
      </div>
      <div style={{ overflowY: "auto", height: pageHeight }}>
        {Object.keys(products).map((key, index) => (
          <Item key={index} itemData={products[key]} />
        ))}
      </div>
      <Footer />
    </div >
  );
};

export default OneMore;
