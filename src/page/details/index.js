import './index.less';
import React from 'react';
import list1 from '../../assets/imgs/home/list1.png'
import back from '../../assets/imgs/details/back.svg'
import unlike from '../../assets/imgs/home/unlike.svg'
import { addToCart } from '../../redux/shopping/shopping-action';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';

const Details = ({ currentItem, addToCart }) => {
  const navigate = useNavigate()

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
        <img src={currentItem.img}></img>
        <div className='back-like'>
          <img src={back} onClick={() => {
            navigate(-1)
          }}></img>
          <img src={unlike}></img>
        </div>
      </div>
      <div className='details-content'>
        <div className='details-name'>
          <p>{currentItem.desTitle}</p>
          <p>￥{currentItem.price}</p>
        </div>
        <div className='details-count'>
          <div className='details-num'>数量</div>
          {/* 這裏應該有個輸入框 */}
        </div>
        <div className='details-btn'>
          {/* onClick={openNotification} */}
          <div type="primary" onClick={() => openNotification(addToCart(currentItem.id))}>加入购物车</div>
          <div>立即购买</div>
        </div>
        <div className='details-param'>
          <p>产品参数:</p>
          <p>口味：{currentItem.des}</p>
          <p>重量: {currentItem.weight}</p>
          <p>储藏方法：{currentItem.storageMethod}</p>
          <p>赏味期限：{currentItem.time}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);