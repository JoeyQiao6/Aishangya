
import React, { useState } from 'react';
import './index.less';
import { connect } from 'react-redux';
import { adjustQty,removeFromCart  } from '../../redux/shopping/shopping-action'

// import { increment, decrement } from '../../redux/rootReducer';
const Count = ({itemData, removeFromCart, adjustQty}) => {

  const [input, setInput] = useState(itemData.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(itemData.id, e.target.value)
  };
  const decrement = (input) => {
    setInput(input) > 1 ? setInput(input - 1) : setInput(1)
  };

  const increment = (input) =>{
    setInput(input + 1) 
  }

  return (
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
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
export default connect(null, mapDispatchToProps)(Count);
