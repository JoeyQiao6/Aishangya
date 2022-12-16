import './index.less';
import Footer from '../../components/footer';
import backW from '../../assets/imgs/details/back-w.svg'
import React, { useState, useContext} from 'react';
import Count from '../../components/count';
import list1 from '../../assets/imgs/home/list1.png'

const CartContext = React.createContext();

const Shop = () => {
  const [remove, setRemove] = useState(true);
  const value= useContext(CartContext)
  console.log(value);
  
  return (
    <div className="shop-box">
      <div className="shop-back">
        <img src={backW}></img>
        <p>购物车</p>
      </div>
      {/* {cart?.map((products, index)=>(
        <div className="shop-list-box">
          <div className='shop-img'><img src={products.img}></img>
          </div>
          <div className="shop-des">
            <div className="shop-name-remove"> <p>{products.name}</p>
              <div onClick={() => { setRemove(false) }}>
                <p >移除</p></div>
            </div>
            
            <p>{products.des}</p>
            <p>{products.price}</p>
            <div className="shop-count">
              <Count />
            </div>
          </div>
        </div> 
      ))} */}
        
      <Footer />
    </div>
  );
}
export default Shop;




