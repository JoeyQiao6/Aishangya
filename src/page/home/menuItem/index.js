import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import Count from '../../../components/count';
const CartItem = (({ itemData }) => {
  let idata = JSON.parse(JSON.stringify(itemData));
  idata["pid"] = idata.id
  return (
    <div className="shop-list-box" >
      <div className='shop-img'><img src={itemData.image} alt=""></img>
      </div>
      <div className="shop-des">
        <p>{itemData.title}</p>
        <p>{itemData.total}{itemData.unit}</p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          {itemData.total > 0 ? <Count itemData={idata} /> : "暂无产品"}
        </div>
      </div>
    </div>
  );
})
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
