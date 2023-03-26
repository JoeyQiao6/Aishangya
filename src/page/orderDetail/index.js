import React from "react";
import "./index.less";
import list1 from "../../assets/imgs/home/list1.png";
import backW from "../../assets/imgs/details/back-w.svg";

const OrderDetail = () => {
  return (
    <div className="order_detail">
      <div className="order_detail_name">
        <img src={backW} alt=""></img>
        <p>订单详情</p>
      </div>
      <div className="customer_infor_card">
        <div className="order_time">
          <p>已下单 03-19-12:32</p>
          <p>送至 友谊大街和38路交叉口几栋几楼</p>
          <p>乔力波 07015120606</p>
        </div>
      </div>
      <div className="order_infor_card_box">
        <div className="order_infor_card">
          <div className="order_infor">
            <div>
              <img src={list1} alt=""></img>
            </div>
            <div>
              <p>无骨鸡柳</p>
              <p>500g</p>
              <p>甜辣</p>
            </div>
            <div>
              <p>
                <span>实付:</span>
                <span>￥600円</span>
              </p>
              <p>
                <span>单价:</span>
                <span>￥300円</span>
              </p>
              <p>×2</p>
            </div>
          </div>
          {/* 超过退款时间久变成申请售后 */}
          <div className="refund">退款</div>
        </div>
        <div className="other-infor">
          <div>
            <p>实付款</p>
            <p>订单编号：</p>
            <p>订单创建时间</p>
            <p>付款时间</p>
            <p>付款方式</p>
            <p>发货时间</p>
          </div>
          <div>
            <p>￥600円</p>
            <p>123456789</p>
            <p>2023-03-19 12:32:25</p>
            <p>2023-03-19 12:32:55</p>
            <p>PayPay</p>
            <p>2023-03-19 12:32:55</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
