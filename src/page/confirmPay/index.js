import React from 'react';
import './index.less';
import backW from '../../assets/imgs/details/back-w.svg'
import address from '../../assets/imgs/confirmPay/address.png'
import morethen from '../../assets/imgs/profile/morethen.png';
import pay from '../../assets/imgs/confirmPay/pay.png';
import choose from '../../assets/imgs/confirmPay/choose.png';
import { Link } from "react-router-dom"

const ConfirmPay = () => {
  return (
    <div className='ConfirmPay-box'>
      <div className='CP-header'>
        <img src={backW} alt=""></img>
        <p>确认订单</p>
      </div>
      <div className='CP-body'>
        <div className='address-box'>
          <div className='address-left'>
            <img src={address} alt=""></img>
            <div className='address-infor'>
              <p>埼玉县川口市芝园町3-9-112</p>
              <span>乔乔</span>
              <span>07015120606</span>
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
            <p>请选择</p>
            <img src={morethen} alt=""></img>
          </div>
        </div>
        <div className='point-box'>
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

        </div>

        这里是购买的商品~
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
                <div>
                  <span>积分抵扣</span>
                </div>
              </div>
              <div className='PD-right'>
                <div>
                  <span>￥</span>
                  <span>14555</span>
                </div>
                <div>
                  <span>￥</span>
                  <span>288</span>
                </div>
                <div>
                  <span>￥</span>
                  <span>288</span>
                </div>
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
    </div>
  );
}

export default ConfirmPay;
