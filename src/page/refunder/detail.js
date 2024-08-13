import React, { useEffect, useRef, useState } from 'react';
import './detail.less';
import backW from '../../assets/imgs/details/back-w.svg'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { refunderSelector, getRefunderById, updateRefunder } from "../../redux/refunder/refunder"
import { dictionarySelector, getRefunderState } from "../../redux/common/dictionary"
import Footer from '../../components/footer';
import { Paper, IconButton, Input } from "@mui/material";
import { Send } from "@mui/icons-material";

const ConfirmPay = () => {
  const { refunderState } = useSelector(dictionarySelector)
  const dispatch = useDispatch()
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { currentRefunder } = useSelector(refunderSelector)
  const [count, setCount] = useState(0)
  const [memo, setMemo] = useState("")
  const changeMemo = (e) => {
    setMemo(e.target.value)
  }
  const [para] = useState(useParams());
  const [refunderOb, setRefunderOb] = useState();
  const submit = () => {
    dispatch(updateRefunder({ memo, rid: currentRefunder.rid }))
  }
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   dispatch(getRefunderById(para.id))
    //   if (refunderState.length === 0) {
    //     dispatch(getRefunderState())
    //   }
    // }
    dispatch(getRefunderById(para.id))
    if (refunderState.length === 0) {
      dispatch(getRefunderState())
    }
  }, [dispatch, refunderState.length])
  useEffect(() => {
    if (currentRefunder.data) {
      setMemo(currentRefunder.memo === null ? "" : currentRefunder.memo)
      setRefunderOb(JSON.parse(currentRefunder.data))
    }
  }, [currentRefunder])
  useEffect(() => {
    if (refunderOb) {
      let c = 0
      for (var key in refunderOb) {
        if (refunderOb.hasOwnProperty(key)) { // 用于过滤继承的属性
          c += refunderOb[key].count
        }
      }
      setCount(c)
    }
  }, [refunderOb])
  const pageHeight = document.documentElement.scrollHeight - 60 - 60;
  return (
    <div className='ConfirmPay-box'>
      <div className='CP-header'>
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>退货订单 (状态：{refunderState[currentRefunder?.state]})</p>
      </div>
      <div className='CP-body'>
        <div className='product-list' style={{ height: pageHeight }}>
          {refunderOb && Object.keys(refunderOb).map((key, index) => (
            <div className="product-list-box" key={index}>
              <div className="product-des">
                <div className="product-name">
                  <p>{refunderOb[key].title}</p>
                </div>
              </div>
              <div className="product-price">￥{refunderOb[key].price} X {refunderOb[key].count}</div>
            </div>
          ))}
          <div>
            <div>备注</div>
            <div>
              <Paper sx={{ height: 30, display: 'flex', alignItems: 'center', width: 300 }} >
                <Input value={memo} onChange={changeMemo} />
                <IconButton color="primary" sx={{ p: '20px' }} aria-label="directions" onClick={() => { submit() }}>
                  <Send />
                </IconButton>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <div className='total-box'>
        <div className='total-item'>
          <span>共</span>
          <span> {count}</span>
          <span>件</span></div>
        <div className='total-right'>
          <div className='total-price'>
            <span></span>
            <span style={{ fontSize: "20px" }}>{currentRefunder?.total}円 (<span style={{ fontSize: '14px', color: 'wheat' }}>RMB:{(currentRefunder?.total * currentRefunder?.rate).toFixed(2)}元</span>)</span>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default ConfirmPay;
