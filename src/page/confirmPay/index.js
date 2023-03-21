import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import backW from '../../assets/imgs/details/back-w.svg'
import addImg from '../../assets/imgs/confirmPay/address.png'
import morethen from '../../assets/imgs/profile/morethen.png';
import pay from '../../assets/imgs/confirmPay/pay.png';
import choose from '../../assets/imgs/confirmPay/choose.png';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getAddress, getPayment } from "../../redux/shopping/cart"
import { cartSelector } from "../../redux/shopping/cart"
import CartItem from '../shop/cartItem';
const ConfirmPay = () => {
  const dispatch = useDispatch()
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { address, payment, total, cart, cartAmount } = useSelector(cartSelector)
  const [addrSelect, setAddrSelect] = useState(0)
  const [paymentSelect, setPaymentSelect] = useState(0)
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    dispatch(getAddress())
    dispatch(getPayment())
  }, [])
  useEffect(() => {
    if (address.length > 0) {
      address.forEach((element, index) => {
        if (element.state === 1) {
          setAddrSelect(index)
        }
      });
    }
  }, [address])
  return (
    <div className='ConfirmPay-box'>
      <div className='CP-header' onClick={() => { window.history.back() }}>
        <img src={backW} alt=""></img>
        <p>确认订单</p>
      </div>
      <div className='CP-body'>
        <div className='address-box' onClick={() => { window.location.href = "/#/addressList" }}>
          <div className='address-left'>
            <img src={addImg} alt=""></img>
            <div className='address-infor'>
              <p>{address[addrSelect]?.postcode} {address[addrSelect]?.prefecture} {address[addrSelect]?.city} {address[addrSelect]?.town} {address[addrSelect]?.address}</p>
              <span>{address[addrSelect]?.receive}</span>
              <span>{address[addrSelect]?.phone}</span>
            </div>
          </div>
          <div className='address-right'>
            <img src={morethen} alt=""></img>
          </div>
        </div>
        <div className='paymentMethod-box'>
          <div className='PM-left'>
            <img src={pay} alt=""></img>
            <p>支付方式</p>
          </div>
          <div className='PM-right'>
            <p>{payment.length > 0 ? payment[paymentSelect].title : "请选择"}</p>
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
          <div className='price-list'>
            <div className='PL-title'>
              价格明细
            </div>
            <div className='PD-body'>
              <div className='PD-body-text'>
                <div className='PD-left'>
                  <div>
                    <span>商品总价</span>
                    <span>共<span>1</span>件宝贝</span>
                  </div>
                  <div>
                    <span>快递费用</span>
                    <span>详情点击</span>
                  </div>
                  {/* <div>
                  <span>积分抵扣</span>
                </div> */}
                </div>
                <div className='PD-right'>
                  <div>
                    <span>￥</span>
                    <span>{total}</span>
                  </div>
                  <div>
                    <span>￥</span>
                    <span>288</span>
                  </div>
                  {/* <div>
                  <span>￥</span>
                  <span>288</span>
                </div> */}
                </div>
              </div>
              <div className='price-total'>
                <div>
                  <p>合计</p>
                </div>
                <div>
                  <span>￥</span>
                  <span>288</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='total-box'>
        <div className='total-item'>
          <span>共</span>
          <span> 43</span>
          <span>件</span></div>
        <div className='total-right'>
          <div className='total-price'>
            <span>￥</span>
            <span>189000</span>
          </div>
          <Link to="/confirmPay" className='total-btn'>去支付</Link>
        </div>
      </div>
      <div className='select-op'>
        <div>微信付款</div>
        <div>PayPay</div>
        <div>银行付款</div>
        <div>D card</div>
      </div>
    </div>
  );
}

export default ConfirmPay;
