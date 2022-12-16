import React, { useState } from 'react';
import './index.less';

const Count = () => {
  // 初始化状态，可以在这里指定初始值
  const [count, setCount] = useState(1);

  // 定义一个函数来处理点击减号按钮的事件
  const handleClickMinus = () => {
    // 更新状态，注意要保证count>0
    setCount(count > 2 ? count - 1 : 1);
  }

  return (
    <div className='count-box'>
      <div onClick={handleClickMinus}> - </div>
      <div>
        <input type="number" min="1"
          value={count}
          onChange={event =>
            setCount(parseInt(event.target.value))}
        >
        </input>
      </div>
      <div onClick={() => setCount(count + 1)}>+</div>
    </div>
  );
}

export default Count;
