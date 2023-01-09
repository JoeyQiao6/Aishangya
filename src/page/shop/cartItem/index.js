import React, { useState } from 'react';
import './index.less';
import { connect } from 'react-redux';
import { adjustQty, removeFromCart } from '../../../redux/shopping/shopping-action'
const CartItem = ({ itemData, removeFromCart, adjustQty }) => {

  const [input, setInput] = useState(itemData.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(itemData.id, e.target.value)
  };
  const decrement = (input) => {
    setInput(input - 1) > 2 ? setInput(input - 1) : setInput(1)
  };

  const increment = (input) =>{
    setInput(input + 1) 
  }
  return (
    <div className="shop-list-box">
      <div className='shop-img'><img src={itemData.img}></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove"> <p>{itemData.name}</p>
          <div onClick={() => removeFromCart(itemData.id)}>
            <p >移除</p></div>
        </div>
        <p>{itemData.des}</p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          <div className='count-box'>
            <div onClick={() => decrement(input)}> - </div>
            <div>
              <input min='1'
                type='number'
                id='qty'
                name='qty'
                value={input}
                onChange={onChangeHandler}
              ></input>
            </div>
            <div onClick={() => increment(input)}> + </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
