
import React, { useState, useEffect } from 'react';
import './index.less';
import { connect, useDispatch, useSelector } from 'react-redux';
import { adjustQty, removeFromCart, cartSelector } from '../../redux/shopping/cart'

const Count = ({ itemData }) => {
  const dispatch = useDispatch()
  const { cart } = useSelector(cartSelector)
  const [input, setInput] = useState(!cart[["PID" + itemData.pid]]?.count ? 0 : cart[["PID" + itemData.pid]]?.count);
  const onChangeHandler = (e) => {
    const num = Number(e.target.value) >= 0 ? Number(e.target.value) : 0
    setInput(num);
    dispatch(adjustQty(itemData, num))
  };
  const decrement = (itemData, input) => {
    const num = (input - 1) >= 1 ? Number(input - 1) : 0
    setInput(num)
    dispatch(num > 0 ? adjustQty(itemData, num) : removeFromCart(itemData.id))
  };

  const increment = (itemData, input) => {
    const num = Number(input + 1);
    setInput(num)
    dispatch(adjustQty(itemData, num))
  }

  return (
    <div className='count-box'>
      <div onClick={() => decrement(itemData, input)}> - </div>
      <div>
        <input min='0'
          type='number'
          id='qty'
          name='qty'
          value={input}
          onChange={onChangeHandler}
        ></input>
      </div>
      <div onClick={() => increment(itemData, input)}> + </div>
    </div>
  );
}

export default connect()(Count);
