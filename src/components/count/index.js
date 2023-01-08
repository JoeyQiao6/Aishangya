import React, { useState } from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootReducer';
const Count = () => {
  // 初始化状态，可以在这里指定初始值
  

  // 定义一个函数来处理点击减号按钮的事件
  // 更新状态，注意要保证count>0
  // const handleClickMinus = () => {
  //   setCount(count > 2 ? count - 1 : 1);
  // }
  const count = useSelector((state) => { return state.counter.count });
  const dispatch = useDispatch()
  const [input, setInput] = useState(count|| 1);
  return (
    <div className='count-box'>
      {/* <div onClick={() => dispatch(decrement())}> - </div> */}
      <div>
        <input type="number" min="1"
          value={input}
          onChange={event => setInput(parseInt(event.target.value))}
        >
        </input>
      </div>
      {/* <div onClick={() => dispatch(increment())}>+</div> */}
    </div>
  );
}

export default Count;
