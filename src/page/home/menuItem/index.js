import React from "react";
import "./index.less";
import { connect, useDispatch } from "react-redux";
import Count from "../../../components/count";
import unlike from "../../../assets/imgs/home/unlike1.svg";
import like from "../../../assets/imgs/home/like.svg";
import { updateLike } from "../../../redux/commodity/commodity"
const CartItem = ({ itemData }) => {
  const dispatch = useDispatch()
  const toggleLike = (data) => {
    dispatch(updateLike({ pid: data.id }))
  };

  let idata = JSON.parse(JSON.stringify(itemData));
  idata["pid"] = idata.id;

  return (
    <div className="shop-list-box">
      <div className="shop-list">
        <div className="shop-img">
          <img src={itemData.image} alt=""></img>
        </div>
        <div className="shop-des">
          <p>{itemData.title}</p>
          <p>
            {itemData.total}
            {itemData.unit}
          </p>
          <p>￥{itemData.price}</p>
          <div className="shop-count">
            {itemData.total > 0 ? <Count itemData={idata} /> : "暂无产品"}
          </div>
        </div>
      </div>
      <div className="shop-like" onClick={() => { toggleLike(itemData) }}>
        <img src={itemData.love ? like : unlike} alt="" />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(null, mapDispatchToProps)(CartItem);
