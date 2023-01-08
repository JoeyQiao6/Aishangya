import './index.less';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import unlike1 from '../../assets/imgs/home/unlike1.svg'
import unlike from '../../assets/imgs/home/unlike.svg'
// import like from '../../assets/imgs/home/like.svg'
import add from '../../assets/imgs/home/add.svg'
// import add1 from '../../assets/imgs/home/add1.svg'

const CartContext = React.createContext();

let MenuData = [
  
]

const Menulist = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  // 定义一个名为 addToCart 的函数。该函数接受一个参数，表示要添加到购物车中的商品。函数内部，使用 spread 操作符（...）将购物车数组展开，然后将要添加的商品添加到数组的末尾。最后，它使用 setCart 函数来更新购物车的状态。
  const addToCart = (products) => {
    setCart([...cart, products]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <div className='list-box'>
        <div className='list-box'>
          {MenuData?.map((products, index) => (
            <div className='list' key={index}>
              <div className='list-img' onClick={() => {
                navigate('/details')
              }}>
                <img src={products.img} alt=""></img>
                <div className='like-box'>
                  <img src={unlike} alt=""></img>
                </div>
              </div>
              <div className='list-content-box'>
                <div className='list-content'>
                  <p className='list-name'>{products.name}</p>
                  <p>￥{products.price}</p>
                </div>
                <div className='list-add' onClick={() => addToCart(products)}>
                  <img src={add} alt=""></img>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CartContext.Provider>
  )

}
export default Menulist;
