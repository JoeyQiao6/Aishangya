import React from 'react';
import './index.less';
import { connect, useDispatch } from 'react-redux';
import Count from '../../../components/count';
import { adjustQty } from '../../../redux/shopping/shopping-action'
import { removeFromCart } from "../../../redux/shopping/cart"
const CartItem = ({ itemData }) => {
  const dispatch = useDispatch()
  // const [input, setInput] = useState(itemData.qty);

  // const onChangeHandler = (e) => {
  //   setInput(e.target.value);
  //   adjustQty(itemData.id, e.target.value)
  // };
  // const decrement = (input, id) => {
  //   const num = (input - 1) > 2 ? input - 1 : 1
  //   setInput(num)
  //   adjustQty(id, num)
  // };

  // const increment = (input, id) => {
  //   const num = input + 1;
  //   setInput(num)
  //   adjustQty(id, num)
  // }
  return (
    <div className="shop-list-box">
      <div className='shop-img'><img src={itemData.img} alt=""></img>
      </div>
      <div className="shop-des">
        <div className="shop-name-remove"> <p>{itemData.name}</p>
          <div onClick={() => dispatch(removeFromCart(itemData.pid))}>
            <p >移除</p></div>
        </div>
        <p>{itemData.des}</p>
        <p>￥{itemData.price}</p>
        <div className="shop-count">
          <Count itemData={itemData} />

          {/* <div className='count-box'>
            <div onClick={() => decrement(input, itemData.id)}> - </div>
            <div>
              <input min='1'
                type='number'
                id='qty'
                name='qty'
                value={input}
                onChange={onChangeHandler}
              ></input>
            </div>
            <div onClick={() => increment(input, itemData.id)}> + </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
