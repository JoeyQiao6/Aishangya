
import React, { useState } from 'react';
import './index.less';
import { connect, useDispatch } from 'react-redux';
import { adjustQty } from '../../redux/shopping/cart'

const Count = ({ itemData }) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState(!itemData?.count ? 1 : itemData?.count);

  const onChangeHandler = (e) => {
    const num = Number(e.target.value) > 0 ? Number(e.target.value) : 1
    setInput(num);
    dispatch(adjustQty(itemData, num))
  };
  const decrement = (itemData, input) => {
    const num = (input - 1) > 2 ? Number(input - 1) : 1
    setInput(num)
    dispatch(adjustQty(itemData, num))
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
        <input min='1'
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
