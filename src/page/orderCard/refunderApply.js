import './refunderApply.less';
import Footer from '../../components/footer';
import backW from '../../assets/imgs/details/back-w.svg'
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import RefunderItem from './item/refunder'
import { getOrderById, orderSelector, getImageByIds } from "../../redux/order/order"
import instance from '../../service/request';
import { message } from 'antd';
const RefunderApply = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const negative = useNavigate();
  const { currentOrder } = useSelector(orderSelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const dispatch = useDispatch()
  const pageHeight = document.documentElement.scrollHeight - 34 - 30 - 75 - 55 - 20;
  const [para] = useState(useParams());
  const [data, setData] = useState({});
  const [applyList, setApplyList] = useState({})
  const [total, setTotal] = useState(0)
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    dispatch(getOrderById(para.id))
  }, [para.id, dispatch])
  useEffect(() => {
    if (currentOrder.data) {
      let dt = JSON.parse(currentOrder.data)
      for (var key in dt) {
        if (typeof dt[key] === 'string') {
          dt[key] = JSON.parse(dt[key])
        }
      }
      setData(dt)
      const pids = []
      for (const key in dt) {
        pids.push(dt[key].pid)
      }
      dispatch(getImageByIds(pids))
    }
  }, [currentOrder, dispatch])
  useEffect(() => {
    let count = 0
    let amount = 0
    for (const key in applyList) {
      amount += applyList[key] * data['PID' + key].price
      count += applyList[key]
    }
    setTotal(amount)
    setAmount(count)
  }, [applyList])
  const refunder = () => {
    instance.post("/apis/youshan-m/merchantrefunder/createRefunder", { id: para.id, object: applyList }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        negative("/refunderDetail/" + val.rid);
        window.location.reload();
      } else {
        messageApi.open({
          type: 'error',
          content: val.data.results,
        });
      }
    })
  };
  return (
    <div className="shop-box">
      {contextHolder}
      <div className="shop-back">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>申请退货</p>
      </div>
      <div className='box-list' style={{ height: pageHeight }}>
        {Object.keys(data).map((key, index) => (
          <RefunderItem key={index} itemData={data[key]} applyList={applyList} setApplyList={setApplyList} count={0} />
        ))}
      </div>
      <div className='total-box'>
        <div className='total-item'>
          <span>共</span>
          <span> {amount}</span>
          <span>件</span></div>
        <div className='total-right'>
          <div className='total-price'>
            <span>￥</span>
            <span>{total}</span>
          </div>
          <button className='total-btn' onClick={refunder}>退货</button>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default connect()(RefunderApply);




