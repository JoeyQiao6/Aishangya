import React, { useEffect } from 'react';
import './refunder.less';
import Count from '../../../components/count/refunder';
import { orderSelector } from "../../../redux/order/order"
import { connect, useSelector } from 'react-redux';

const CartItem = ({ itemData, applyList, setApplyList, count }) => {
  const { commoditys } = useSelector(orderSelector)

  useEffect(() => {
    console.log(itemData);
    console.log(commoditys[itemData.pid]?.image);
    console.log(itemData.pid);
  }, [commoditys])
  useEffect(() => {
    console.log(applyList);
  }, [applyList])
  return (
    <div className="shop-cartitem-list-box">
      <div className='shop-img'><img src={commoditys[itemData.pid]?.image} alt=""></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove"> <p>{itemData.title}</p>

        </div>
        <p></p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          <Count itemData={itemData} applyList={applyList} setApplyList={setApplyList} count={count} />
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
