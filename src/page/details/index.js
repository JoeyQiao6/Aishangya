import './index.less';
import React, { useEffect, useState, useRef } from 'react';
// import list1 from '../../assets/imgs/home/list1.png'
import back from '../../assets/imgs/details/back.svg'
import unlike from '../../assets/imgs/home/unlike.svg'
import { connect, useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer';
import Count from '../../components/count';
import { getCommodity, commoditySelector } from "../../redux/commodity/commodity"
import { addToCart } from "../../redux/shopping/cart"

const Details = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //取URL的参数 
  const [para] = useState(useParams());
  //想要用reducer页面的方法 就必须要用useSelector传参传进去
  // commoditySelector = commoditySlice 里面有 {products: [],
  // currentItem: null,} 所以可以拿到currentItem
  const { currentItem } = useSelector(commoditySelector);
  const renderRef = useRef(true); // 防止useEffect执行两次
  // useEffect会一进来就会执行
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    console.log(currentItem)
    if (!currentItem) {
      dispatch(getCommodity(para.id))
    }
  }, [dispatch, currentItem, para.id])//防抖
  
  const openNotification = () => {
    notification.open({
      message: '添加成功，在购物车等亲',
      duration: 2,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  return (
    <div className="details-box">
      <div className="details-img">
        <img src={currentItem?.image} alt=""></img>
        <div className='back-like'>
          <img src={back} onClick={() => {
            navigate(-1)
          }} alt=""></img>
          <img src={unlike} alt=""></img>
        </div>
      </div>
      <div className='details-content'>
        <div className='details-name'>
          <p>{currentItem?.title}</p>
          <p>￥{currentItem?.price}</p>
        </div>
        <div className='details-count'>
          <div className='details-num'>数量</div>
          <Count itemData={currentItem} />
        </div>
        <div className='details-btn'>
          <div type="primary" onClick={() => openNotification(dispatch(addToCart(currentItem?.id)))}>加入购物车</div>
          <div>立即购买</div>
        </div>
        <div className='details-param'>
          <p>产品参数:</p>
          <p>口味：{currentItem?.des}</p>
          <p>重量: {currentItem?.weight}</p>
          <p>储藏方法：{currentItem?.storageMethod}</p>
          <p>赏味期限：{currentItem?.time}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default connect()(Details);