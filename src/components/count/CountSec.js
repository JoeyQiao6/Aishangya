
import React, { useState } from 'react';
import './index.less';
import { connect, useDispatch, useSelector } from 'react-redux';
import { cartSelector, addToCart } from '../../redux/shopping/cart'
import { Toast, Popup, Button, Modal } from 'antd-mobile'

const CountSec = ({ itemData, visible, setVisible }) => {
  const dispatch = useDispatch()
  const { cart, addCartState } = useSelector(cartSelector)
  const [input, setInput] = useState(1);
  let idata = JSON.parse(JSON.stringify(itemData));
  idata["pid"] = idata.id
  const onChangeHandler = (e) => {
    const num = Number(e.target.value) >= 0 ? Number(e.target.value) : 0
    setInput(num);
  };
  const decrement = (itemData, input) => {
    if (!addCartState) return
    if (input === 1) return
    const num = (input - 1) >= 1 ? Number(input - 1) : 0
    setInput(num)
  };

  const increment = (itemData, input) => {
    if (!addCartState) return
    const count = input + 1
    if (itemData && itemData.total >= count) {
      setInput(count)
    }
  }
  const Count = ({ itemData, input }) => {
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
  const addCart = async () => {
    const result = await Modal.confirm({
      content: '是否添加此商品？',
    })
    if (result) {
      dispatch(addToCart(itemData, input, cart))
      Toast.show({
        icon: 'success',
        content: '已添加一个到购物车',
      })
      setInput(1)
      setVisible(false)
    }
  }
  return (
    <div>
      <Popup
        visible={visible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#624545',
        }}
        onMaskClick={() => {
          setVisible(false)
        }}
        onClose={() => {
          setVisible(false)
        }}
      >
        <div className="shop-count">
          {itemData.total > 0 ? <Count itemData={idata} input={input} /> : "暂无产品"}
          <div style={{ paddingTop: '10px' }}>
            <Button color='warning' style={{ float: 'left' }} onClick={addCart}>添加购物车</Button>
            <Button color='warning' style={{ float: 'right', width: '120px' }} onClick={() => {
              setInput(1)
              setVisible(false)
            }}>取消</Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default connect()(CountSec);
