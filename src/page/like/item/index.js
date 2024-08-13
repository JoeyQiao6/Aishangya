import React, { useState } from 'react';
import './index.less';
import { connect } from 'react-redux';
import { delLike } from '../../../redux/like/like'
import { useDispatch } from "react-redux";
import CountSec from '../../../components/count/CountSec'
import { Modal } from 'antd-mobile'
const CartItem = ({ itemData }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  let idata = JSON.parse(JSON.stringify(itemData));
  idata["pid"] = idata.id
  const remove = async (id) => {
    const result = await Modal.confirm({
      content: '是否移除此商品？',
    })
    if (result) {
      dispatch(delLike(id))
    }
  };
  return (
    <div className="ordercard-item-list-box">
      <div className='shop-img'><img src={itemData.image} alt=""></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove">
          <p>{itemData.title}</p>
          <div onClick={() => remove(itemData.id)}>
            <p >移除</p></div>
        </div>
        <p></p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          <div className="order_again" onClick={() => { setVisible(true) }}>添加购物车</div>
        </div>
        <CountSec visible={visible} setVisible={setVisible} itemData={itemData} />
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
