import React from "react";
import "./index.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { useNavigate } from "react-router-dom";
import list1 from "../../assets/imgs/home/list1.png";

const OrderCard = () => {
  const negative = useNavigate();

  return (
    <div className="order_page">
      <div className="order_name">
        <img src={backW} alt=""></img> <p>订单管理</p>
      </div>
      <div className="order_card">
        <div className="order_number">
          <p>订单编号: 23455</p>
          <p className="order_state">交易成功</p>
        </div>
        <div
          className="order_content"
          onClick={() => {
            negative("/orderDetail");
          }}
        >
          <div className="order_img">
            <img src={list1} alt=""></img>
          </div>
          <div className="order_text">
            <p>订单创建时间：2023-03-21</p>
            <p>总件数：8件</p>
            <p>总金额：3000円</p>
          </div>
        </div>
        <div className="order_again">再来一单</div>
      </div>
    </div>
  );
};

export default OrderCard;
