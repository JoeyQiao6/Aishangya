import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.less";
import moment from 'moment'
import backW from "../../assets/imgs/details/back-w.svg";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { orderSelector, getOrderById, getImageByIds } from "../../redux/order/order"
import { dictionarySelector, getOrderState, getLogisticsType } from "../../redux/common/dictionary"
import instance from '../../service/request';
import { Modal } from 'antd-mobile'
import { message } from 'antd'
import { Paper, IconButton, Input } from "@mui/material";
import { Send } from "@mui/icons-material";

const OrderDetail = () => {
  const navigate = useNavigate();
  const [para] = useState(useParams());
  const dispatch = useDispatch()
  const { currentOrder, commoditys } = useSelector(orderSelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { orderState, logisticsType } = useSelector(dictionarySelector)
  const [products, setProducts] = useState({})
  const [ordernumber, setOrdernumber] = useState("");
  const [memo, setMemo] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const changeordernumber = (e) => {
    setOrdernumber(e.target.value)
  }
  const pageHeight = document.documentElement.scrollHeight - 30 - 50 - 17;
  const changeMemo = (e) => {
    setMemo(e.target.value)
  }
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    dispatch(getOrderState())
    dispatch(getOrderById(para.id))
    dispatch(getLogisticsType())
  }, [para.id, dispatch])
  useEffect(() => {
    if (currentOrder.data) {
      const data = JSON.parse(currentOrder.data)
      setProducts(data)
      console.log(currentOrder);
      setMemo(currentOrder.memo === null ? "" : currentOrder.memo)
      setOrdernumber(currentOrder.ordernumber === null ? "" : currentOrder.ordernumber)
      const pids = []
      for (const key in data) {
        pids.push(data[key].pid)
      }
      dispatch(getImageByIds(pids))
    }
  }, [currentOrder, dispatch])

  const formatDate = (date) => {
    return moment(Number(date)).format('YYYY-MM-DD HH:mm:ss')
  }
  const updateOrder = async (status, msg) => {
    const result = await Modal.confirm({
      content: '确定' + msg + '吗?',
    })
    if (result) {
      const data = { id: currentOrder.id, status }
      instance.post("/apis/youshan-m/merchantorder/updateOrderById", data).then((val) => {
        if (val.data.success) {
          dispatch(getOrderById(para.id))
        }
      })
    }
  }
  const submit = () => {
    const data = { id: currentOrder.id, ordernumber, memo }
    instance.post("/apis/youshan-m/merchantorder/updateOrderById", data).then((val) => {
      if (val.data.success) {
        messageApi.open({
          type: 'success',
          content: '发送成功',
        });
      }
    })
  }

  return (
    <div className="order_detail">
      {contextHolder}
      <div className="order_detail_name">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>订单详情</p>
      </div>
      <div style={{ height: pageHeight, overflowY: "auto" }}>
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
              {currentOrder?.wuliu !== "" && <p>物流</p>}
              {currentOrder?.pi !== "" && <p>物流订单号：</p>}
              <p>付款方式</p>
              {/* <p>付款凭证</p> */}
              <p>备注</p>
            </div>
            <div className="info">
              <p>{currentOrder?.total + currentOrder?.yf + currentOrder?.svf}円</p>
              <p>{currentOrder?.total}円 </p>
              <p>{currentOrder?.yf > 0 && '运费(' + currentOrder?.yf + '円)'}<br></br>
                {/* {'冷藏/冷冻(' + (currentOrder?.lc + currentOrder?.ld) + '円)'} */}
                {currentOrder?.svf > 0 && ' 货到付款附加费用(' + currentOrder?.svf + '円)'}</p>
              <p>{currentOrder?.id}</p>
              <p>{formatDate(currentOrder?.authenappend)}</p>
              <p>{orderState[currentOrder?.status]}</p>
              <p>{logisticsType[currentOrder?.wuliu]} </p>
              <p>{currentOrder?.pi}</p>
              <p>{currentOrder?.payNm}</p>
              {/* <Paper sx={{ height: 30, display: 'flex', alignItems: 'center', width: 200 }} >
                <Input value={ordernumber} onChange={changeordernumber} />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => { submit() }}>
                  <Send />
                </IconButton>
              </Paper> */}
              <Paper sx={{ height: 30, display: 'flex', alignItems: 'center', width: 200 }} >
                <Input value={memo} onChange={changeMemo} />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => { submit() }}>
                  <Send />
                </IconButton>
              </Paper>
            </div>

            {currentOrder?.status === 1 && <div className="refund" onClick={() => { updateOrder(7, "退款") }}>退款</div>}
            {currentOrder?.status === 7 && <div className="refund" onClick={() => { updateOrder(1, "取消退款") }}>取消退款</div>}
            {currentOrder?.status === 0 && (<div className="paymentcancel"><div className="paymentc" onClick={() => { updateOrder(3, "取消订单") }}>取消订单</div><div className="payment" onClick={() => { navigate("/payment/" + currentOrder?.id); }}>付款</div></div>)}
            {currentOrder?.status === 4 && <div className="refund" onClick={() => { updateOrder(3, "取消订单") }}>取消订单</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
