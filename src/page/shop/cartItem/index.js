import React from 'react';
import './index.less';
import { connect, useDispatch } from 'react-redux';
import Count from '../../../components/count';
import { removeFromCart } from "../../../redux/shopping/cart"
const CartItem = ({ itemData }) => {
  const dispatch = useDispatch()

  return (
    <div className="shop-list-box">
      <div className='shop-img'><img src={itemData.image} alt=""></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove"> <p>{itemData.title}</p>
          <div onClick={() => dispatch(removeFromCart(itemData))}>

            
            <p >移除</p></div>
        </div>
        <p></p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          <Count itemData={itemData} />
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
