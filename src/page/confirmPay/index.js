import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import backW from '../../assets/imgs/details/back-w.svg'
import addImg from '../../assets/imgs/confirmPay/address.png'
import morethen from '../../assets/imgs/profile/morethen.png';
import pay from '../../assets/imgs/confirmPay/pay.png';
// import choose from '../../assets/imgs/confirmPay/choose.png';
import { useSelector, useDispatch } from "react-redux";
import { cartSelector, clearCart, setTakeTime, getTakeTimeType, getRate, getAddress, getPayment, setPaymentSelect, getFare, resetFare, setKF } from "../../redux/shopping/cart"
import CartItem from '../shop/cartItem';
import { Drawer, Radio, message } from 'antd';
import instance from "../../service/request"
const ConfirmPay = () => {
  const dispatch = useDispatch()
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { takeTime, takeTimeType, rate, kf, payment, total, cart, cartAmount, paymentSelect, fareKFOb, addrSelect, fareLimitADDRESSOb, fareCODOb, svf, yf } = useSelector(cartSelector)
  const [paymentState, setPaymentState] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    dispatch(getFare())
    dispatch(getAddress())
    dispatch(getPayment())
    dispatch(getRate())
    dispatch(getTakeTimeType())
  }, [dispatch])
  useEffect(() => {
    if (addrSelect.id && Object.keys(fareLimitADDRESSOb).length !== 0) {
      dispatch(resetFare("address"))
    }
  }, [dispatch, total, addrSelect, fareLimitADDRESSOb])
  useEffect(() => {
    if (Object.keys(paymentSelect).length !== 0 && Object.keys(fareCODOb).length !== 0)
      dispatch(resetFare("payment"))
  }, [dispatch, paymentSelect, fareCODOb])
  const paymentSelet = (ele) => {
    dispatch(setPaymentSelect(ele))
    setPaymentState(false)
  }
  const onChangeKF = (e) => {
    dispatch(setKF(e.target.value))
  };
  const onChangeTT = (e) => {
    dispatch(setTakeTime(e.target.value))
  };
  const save = () => {
    if (Object.keys(cart).length === 0) {
      return messageApi.open({
        type: 'error',
        content: '请选择购买商品',
      });
    }
    if (Object.keys(addrSelect).length === 0) {
      return messageApi.open({
        type: 'error',
        content: '请选择收货地址',
      });
    }
    const order = {
      paid: 0,
      payid: 0,
      status: 0, //订单状态||radiobox|*等待付款=>0,已付款=>1,已发货=>2,订单取消=>3,货到付款=>4,货到付款已发货=>5,订单完成=>6
      uid: 0, //订单用户编号
      pay: paymentSelect?.id, //支付方式
      uname: "", //订单用户
      umail: "", //订单用户邮箱
      mobile: "", //订单用户手机
      name: addrSelect?.receive, //收货人姓名
      phone: addrSelect?.phone, //收货人电话
      city: addrSelect?.city, //收货人省市
      zip: addrSelect?.postcode, //收货人邮编
      address: addrSelect?.prefecture + " " + addrSelect?.city + " " + addrSelect?.town + " " + addrSelect?.address, //收货人地址
      fapiao: "", //需要发票
      taitou: "", //发票抬头
      pi: "", //物流单号
      view: "",
      view2: "",
      total: total, //订单金额
      svf: svf, //货到付款运费
      memo: "", //订单备注
      data: "",
      wechat: addrSelect?.socialaccount, //微信
      socialtype: addrSelect?.socialtype,
      wuliu: "", //物流
      totald: 0,
      yf: yf, //运费
      ld: kf === "冷冻" ? fareKFOb[kf].fare : 0, //冷冻
      lc: kf === "冷藏" ? fareKFOb[kf].fare : 0, //冷藏
      shtime: takeTime, //    时间段
      rate: rate, //汇率
    }
    let pidlist = [];
    for (let key in cart) {
      pidlist.push(cart[key].pid);
    }
    if (pidlist.length > 0) {
      instance.post('/apis/youshan-m/merchantcommodity/getListByIds', pidlist).then((val) => {
        if (val.data.success) {
          val = val.data.results;
          let res = {};
          val.forEach((element) => {
            res["PID" + element.id] = {
              pid: element.id,
              title: element.title,
              count: cart["PID" + element.id].count,
              unit: element.unit,
              price: element.price,
              total: element.price * cart["PID" + element.id].count,
              pident: "",
            };
          });
          order.data = JSON.stringify(res);
          instance.post('/apis/youshan-m/merchantorder/createOrder', order).then((val) => {
            console.log(val);
            if (val.data.success) {
              dispatch(clearCart())
              messageApi.open({
                type: 'success',
                content: '已下单，请付款',
              });
            } else {
              messageApi.open({
                type: 'error',
                content: val.data.results,
              });
            }
          })
        }
      });
    }
  }
  return (
    <div className='ConfirmPay-box'>
      {contextHolder}
      <div className='CP-header'>
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>确认订单</p>
      </div>
      <div className='CP-body'>
        <div className='address-box' onClick={() => { window.location.href = "/#/addressAll" }}>
          <div className='address-left'>
            <img src={addImg} alt=""></img>
            <div className='address-infor'>
              <p>{addrSelect?.postcode} {addrSelect?.prefecture} {addrSelect?.city} {addrSelect?.town} {addrSelect?.address}</p>
              <span>{addrSelect?.receive}</span>
              <span>{addrSelect?.phone}</span>
            </div>
          </div>
          <div className='address-right'>
            <img src={morethen} alt=""></img>
          </div>
        </div>
        <div className='paymentMethod-box' onClick={() => { setPaymentState(true) }}>
          <div className='PM-left'>
            <img src={pay} alt=""></img>
            <p>支付方式</p>
          </div>
          <div className='PM-right'>
            <p>{paymentSelect?.title}</p>
            <img src={morethen} alt=""></img>
          </div>
        </div>
        {/* <div className='point-box'>
          <div className='point-title'>
            积分
          </div>
          <div className='point-body'>
            <div className='point-price'>
              <div className='point-price-left'>
                <p>本次积分</p>
                <p>过往积分</p>
              </div>
              <div className='point-price-right'>
                <p>77500</p>
                <p>9000</p>
              </div>
            </div>
            <div className='use-point'>
              <p>可用积分: 1000</p>
              <div>
                <p>使用积分</p>
                <img src={choose} alt=""></img>
              </div>
            </div></div>

        </div> */}

        这里是购买的商品~
        <div className='product-list'>
          {Object.keys(cart).map((key, index) => (
            <CartItem key={index} itemData={cart[key]} />
          ))}
          <div className='yf'>
            <Radio.Group value={kf} onChange={onChangeKF}>
              {
                Object.keys(fareKFOb).map((key) => (
                  <Radio key={fareKFOb[key].id} value={fareKFOb[key].title}>{fareKFOb[key].title}</Radio>
                ))
              }
            </Radio.Group>
          </div>
          <div className='social-type'>
            <label>送货时间：</label>
            <Radio.Group value={takeTime} onChange={onChangeTT}>
              {
                takeTimeType?.map((ele) => (
                  <Radio key={ele.id} value={ele.value}>{ele.display}</Radio>
                ))
              }
            </Radio.Group>
          </div>
          <div className='price-list'>
            <div className='PL-title'>
              价格明细
            </div>
            <div className='PD-body'>
              <div className='PD-body-text'>
                <div className='PD-left'>
                  <div >
                    <span>商品总价</span>
                  </div>
                  {paymentSelect?.title === "货到付款" ? (
                    <div >
                      <span>货到付款附加手续费</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {yf > 0 ? (
                    <div >
                      <span>运费</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {fareKFOb[kf]?.title ? (
                    <div >
                      <span>{fareKFOb[kf].title}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className='PD-right'>
                  <div >
                    <span>{total}</span>
                  </div>
                  {paymentSelect?.title === "货到付款" ? (
                    <div >
                      <span>{svf}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {yf > 0 ? (
                    <div >
                      <span>{yf}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {fareKFOb[kf]?.fare ? (
                    <div >
                      <span>{fareKFOb[kf].fare}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className='price-total'>
                <div>
                  <p>合计</p>
                </div>
                {rate > 0 ?
                  <div >
                    <span>{Math.floor((total + yf + svf + fareKFOb[kf]?.fare) * rate)}元(RMB)</span>
                  </div> : ""
                }

                <div>
                  <span>{total + yf + svf + fareKFOb[kf]?.fare}円</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='total-box'>
        <div className='total-item'>
          <span>共</span>
          <span> {cartAmount}</span>
          <span>件</span></div>
        <div className='total-right'>
          <div className='total-price'>
            <span></span>
            <span>{total + yf + svf + fareKFOb[kf]?.fare}円</span>
          </div>
          <button className='total-btn' onClick={() => { save() }}>去支付</button>
        </div>
      </div>
      <Drawer
        title="支付方式"
        placement="bottom"
        closable={false}
        onClose={() => { setPaymentState(false) }}
        open={paymentState}
        key="bottom"
        className="payment-drawer"
      >
        <div>
          {payment.map((ele) => (
            <div key={ele.id} onClick={() => { paymentSelet(ele) }} >{ele.title}</div>
          ))}
        </div>
      </Drawer>
    </div >
  );
}

export default ConfirmPay;
