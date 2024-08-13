import React, { useState } from 'react';
import './index.less';
import { connect } from 'react-redux';
import CountSec from '../../../components/count/CountSec'
const CartItem = ({ itemData }) => {
  const [visible, setVisible] = useState(false)
  let idata = JSON.parse(JSON.stringify(itemData));
  idata["id"] = idata.pid
  itemData = idata
  return (
    <div className="ordercard-item-list-box">
      <div className='shop-img'><img src={itemData.image} alt=""></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove">
          <p>{itemData.title}</p>
        </div>

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
