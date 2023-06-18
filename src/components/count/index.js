
import React, { useEffect, useState, useRef } from 'react';
import './index.less';
import { connect, useDispatch, useSelector } from 'react-redux';
import { adjustQty, removeFromCart, cartSelector } from '../../redux/shopping/cart'
import { orderSelector } from '../../redux/order/order'
import { commoditySelector, setProductCount } from '../../redux/commodity/commodity'
import { setLikeCount } from "../../redux/like/like"

const Count = ({ itemData }) => {
  const dispatch = useDispatch()
  const { cart, cartProducts, addCartState } = useSelector(cartSelector)
  const { oneMoreProducts } = useSelector(orderSelector)
  const { products } = useSelector(commoditySelector)
  // const [input, setInput] = useState(!cart["PID" + itemData.pid]?.count ? 0 : cart["PID" + itemData.pid]?.count);
  const [input, setInput] = useState(0);
  const renderRef = useRef(true); // 防止useEffect执行两次
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    setInput(itemData.count)
  }, [itemData])

  const onChangeHandler = (e) => {
    const num = Number(e.target.value) >= 0 ? Number(e.target.value) : 0
    setInput(num);
    dispatch(adjustQty(itemData, num, cart))
    dispatch(setProductCount(itemData, num))
    dispatch(setLikeCount(itemData, num))
  };
  const decrement = (itemData, input) => {
    if (!addCartState) return
    if (input === 0) return
    let pd = products.find(item => item.id === itemData.pid)
    if (!pd) {
      pd = cartProducts.find(item => item.id === itemData.pid)
    }
    const num = (input - 1) >= 1 ? Number(input - 1) : 0
    dispatch(num > 0 ? adjustQty(itemData, num, cart) : removeFromCart(itemData))
    dispatch(setProductCount(itemData, num))
    dispatch(setLikeCount(itemData, num))
    setInput(num)
  };

  const increment = (itemData, input) => {
    if (!addCartState) return
    const count = input + 1
    let pd = products.find(item => item.id === itemData.pid)
    if (!pd) {
      pd = cartProducts.find(item => item.id === itemData.pid)
    }
    if (!pd) {
      pd = oneMoreProducts.find(item => item.id === itemData.pid)
    }
    if (pd && pd.total >= count) {
      const num = Number(input + 1);
      setInput(num)
      dispatch(adjustQty(itemData, num, cart))
      dispatch(setProductCount(itemData, num))
      dispatch(setLikeCount(itemData, num))
    }
  }

  return (
    <div className='count-box'>
      <div onClick={() => decrement(itemData, input)}> - </div>
      <div>
        <input min='0'
          type='number'
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
