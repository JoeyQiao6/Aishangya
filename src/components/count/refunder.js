
import React, { useEffect, useState, useRef } from 'react';
import './index.less';
import { connect } from 'react-redux';

const Count = ({ itemData, applyList, setApplyList, count }) => {
  // const [input, setInput] = useState(!cart["PID" + itemData.pid]?.count ? 0 : cart["PID" + itemData.pid]?.count);
  const [input, setInput] = useState(count);
  const renderRef = useRef(true); // 防止useEffect执行两次
  const [maxC, setMaxC] = useState(0);
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    let mc = itemData.count
    if (itemData.refund) {
      mc -= itemData.refund
    }
    setMaxC(mc)
  }, [itemData])

  const onChangeHandler = (e) => {
    e.preventDefault();
    const count = Number(e.target.value) >= 0 ? (Number(e.target.value) <= maxC ? Number(e.target.value) : maxC) : 0
    setInput(count);
    let applyob = Object.assign({}, applyList);
    applyob[itemData.pid] = count
    setApplyList(applyob)
  };
  const decrement = (input) => {
    if (input === 0) return
    const count = (input - 1) >= 1 ? Number(input - 1) : 0
    setInput(count)
    let applyob = Object.assign({}, applyList);
    applyob[itemData.pid] = count
    setApplyList(applyob)
  };

  const increment = (input) => {
    const count = input + 1
    if (count <= maxC) {
      setInput(count)
      let applyob = Object.assign({}, applyList);
      applyob[itemData.pid] = count
      setApplyList(applyob)
    }
  }

  return (
    <>
      {maxC > 0 ?
        (
          <div className='count-box'><div onClick={() => decrement(input)}> - </div>
            <div>
              <input min='0' max={maxC}
                type='number'
                name='qty'
                value={input}
                onChange={onChangeHandler}
              ></input>
            </div>
            <div onClick={() => increment(input)}> + </div>
          </div>)
        : (<span>已退货</span>)}
    </>
  );
}

export default connect()(Count);
