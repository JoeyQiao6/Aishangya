import React, { useEffect, useState, useRef } from 'react';
import './index.less';
import { connect, useDispatch, useSelector } from 'react-redux';
import Count from '../../../components/count';
import { adjustQty, removeFromCart, cartSelector } from '../../../redux/shopping/cart'
import { orderSelector } from '../../../redux/order/order'
const CartItem = ({ itemData }) => {
  const dispatch = useDispatch()
  const [buttonState, setButtonState] = useState(false)
  const onemore = () => {
    setButtonState(true)
    console.log(itemData);
    const count = itemData.count + 1
    let pd = oneMoreProducts.find(item => item.id === itemData.pid)
    if (pd && pd.total >= count) {
      itemData.count = count
      dispatch(adjustQty(itemData, count, cart))
    }
  }
  const { cart, cartProducts, addCartState } = useSelector(cartSelector)
  const { oneMoreProducts } = useSelector(orderSelector)
  return (
    <div className="ordercard-item-list-box">
      <div className='shop-img'><img src={itemData.image} alt=""></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove">
          <p>{itemData.title}</p>
        </div>
        <p></p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          {buttonState ? <Count itemData={itemData} /> : <div className="order_again" onClick={() => { onemore() }}>再来一单</div>}

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
