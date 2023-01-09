import './index.less';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, loadCurrentItem } from '../../redux/shopping/shopping-action';
// import unlike1 from '../../assets/imgs/home/unlike1.svg'
import unlike from '../../assets/imgs/home/unlike.svg'
// import like from '../../assets/imgs/home/like.svg'
import add from '../../assets/imgs/home/add.svg'
// import add1 from '../../assets/imgs/home/add1.svg'




const Menulist = ({ productData, addToCart,loadCurrentItem }) => {
  const navigate = useNavigate()
  // 定义一个名为 addToCart 的函数。该函数接受一个参数，表示要添加到购物车中的商品。函数内部，使用 spread 操作符（...）将购物车数组展开，然后将要添加的商品添加到数组的末尾。最后，它使用 setCart 函数来更新购物车的状态。


  return (
    <>
      <div className='list'>
        <div className='list-img' onClick={() => {
          navigate(`/details/${productData.id}`)
        }}>
          <img src={productData.img} onClick={() =>loadCurrentItem(productData)} alt=""></img>
          <div className='like-box'>
            <img src={unlike} alt=""></img>
          </div>
        </div>
        <div className='list-content-box'>
          <div className='list-content'>
            <p className='list-name'>{productData.name}</p>
            <p>￥{productData.price}</p>
          </div>
          <div className='list-add' onClick={() => addToCart(productData.id)}>
            <img src={add} alt=""></img>
          </div>
        </div>
      </div>
    </>
  )
  //發送函數

}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item))
  };
}
export default connect(null, mapDispatchToProps)(Menulist);
