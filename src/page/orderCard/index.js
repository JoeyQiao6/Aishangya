import React, { useEffect, useRef } from "react";
import moment from 'moment'
import "./index.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { useNavigate } from "react-router-dom";
import list1 from "../../assets/imgs/home/list1.png";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector, getOrder } from "../../redux/order/order"
import { dictionarySelector, getOrderState } from "../../redux/common/dictionary"

const OrderCard = () => {
  const negative = useNavigate();
  const dispatch = useDispatch()
  const { orders } = useSelector(orderSelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { orderState } = useSelector(dictionarySelector)
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    dispatch(getOrderState())
    dispatch(getOrder())
  }, [dispatch])
  const formatDate = (date) => {
    return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss')
  }
  return (
    <div className="order_page">
      <div className="order_name">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img> <p>订单管理</p>
      </div>
      <div className="order_list">
        {orders.length > 0 &&
          orders?.map((order, index) => (
            <div key={index} className="order_card">
              <div className="order_number">
                <p>订单编号: {order.id}</p>
                <p className="order_state">{orderState[order.status]}</p>
              </div>
              <div
                className="order_content"
                onClick={() => {
                  negative("/orderDetail/" + order.id);
                }}
              >
                <div className="order_img">
                  <img src={list1} alt=""></img>
                </div>
                <div className="order_text">
                  <p>订单创建时间：{formatDate(order.authenmodify)}</p>
                  <p>人民币：{(order.total * order.rate).toFixed(2)}元</p>
                  <p>总金额：{order.total}円</p>
                </div>
              </div>
              <div className="order_again" onClick={() => {
                negative("/oneMore/" + order.id);
              }}>再来一单</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default OrderCard;
