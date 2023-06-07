import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.less";
import moment from 'moment'
import backW from "../../assets/imgs/details/back-w.svg";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { orderSelector, getOrderById, getImageByIds } from "../../redux/order/order"
import { dictionarySelector, getOrderState } from "../../redux/common/dictionary"
import instance from '../../service/request';
import { Modal } from 'antd-mobile'
const OrderDetail = () => {
  const navigate = useNavigate();
  const [para] = useState(useParams());
  const dispatch = useDispatch()
  const { currentOrder, commoditys } = useSelector(orderSelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { orderState } = useSelector(dictionarySelector)
  const [products, setProducts] = useState({})
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    dispatch(getOrderState())
    dispatch(getOrderById(para.id))
  }, [dispatch])
  useEffect(() => {
    if (currentOrder.data) {
      const data = JSON.parse(currentOrder.data)
      setProducts(data)
      const pids = []
      for (const key in data) {
        pids.push(data[key].pid)
      }
      dispatch(getImageByIds(pids))
    }
  }, [currentOrder])

  const formatDate = (date) => {
    return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss')
  }
  const updateOrder = async (status, msg) => {
    const result = await Modal.confirm({
      content: '确定要' + msg + '吗?',
    })
    if (result) {
      const data = { id: currentOrder.id, status }
      instance.post("/apis/youshan-m/merchantorder/updateOrderById", data).then((val) => {
        if (val.data.success) {
          console.log("success")
          dispatch(getOrderById(para.id))
        }
      })
    }
  }
  return (
    <div className="order_detail">
      <div className="order_detail_name">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>订单详情</p>
      </div>
      <div className="customer_infor_card">
        <div className="order_time">
          <p>已下单 {formatDate(currentOrder.authenmodify)}</p>
          <p>{currentOrder?.address}</p>
          <p>{currentOrder?.name} {currentOrder?.phone}</p>
        </div>
      </div>
      <div className="order_infor_card_box">
        <div className="order_list">
          {Object.keys(products).map((key) => (
            <div className="order_infor_card" key={key}>
              <div className="order_infor">
                <div>
                  <img src={commoditys[products[key]?.pid]?.image} alt=""></img>
                </div>
                <div>
                  <p>{products[key]?.title}</p>
                  <p>/{products[key]?.unit}</p>
                </div>
                <div>
                  <p>
                    <span>实付:</span>
                    <span>{products[key]?.total}円</span>
                  </p>
                  <p>
                    <span>单价:</span>
                    <span>{products[key]?.price}円</span>
                  </p>
                  <p>×{products[key]?.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 超过退款时间久变成申请售后 */}
        <div className="other-infor">
          <div className="info">
            <p>实付款</p>
            <p>订单总额</p>
            <p>附加费用</p>
            <p>订单编号：</p>
            <p>订单创建时间</p>
            <p>状态</p>
            <p>付款方式</p>
          </div>
          <div className="info">
            <p>{currentOrder?.total + currentOrder?.yf + currentOrder?.lc + currentOrder?.ld + currentOrder?.svf}円</p>
            <p>{currentOrder?.total}円 </p>
            <p>{currentOrder?.yf > 0 && '运费(' + currentOrder?.yf + '円)'} {'冷藏/冷冻(' + (currentOrder?.lc + currentOrder?.ld) + '円)'} {currentOrder?.svf > 0 && ' 货到付款附加费用(' + currentOrder?.svf + '円)'}</p>
            <p>{currentOrder?.id}</p>
            <p>{formatDate(currentOrder?.authenappend)}</p>
            <p>{orderState[currentOrder?.status]}</p>
            <p>{currentOrder?.payNm}</p>
          </div>

          {currentOrder?.status === 1 && <div className="refund" onClick={() => { updateOrder(7, "退款") }}>退款</div>}
          {currentOrder?.status === 7 && <div className="refund" onClick={() => { updateOrder(1, "取消退款") }}>取消退款</div>}
          {currentOrder?.status === 0 && (<div className="paymentcancel"><div className="payment" onClick={() => { updateOrder(3, "取消订单") }}>取消订单</div><div className="payment" onClick={() => { navigate("/payment/" + currentOrder?.id); }}>付款</div></div>)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
