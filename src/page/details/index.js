import './index.less';
import React from 'react';
import list1 from '../../assets/imgs/home/list1.png'
import back from '../../assets/imgs/details/back.svg'
import unlike from '../../assets/imgs/home/unlike.svg'
import { addToCart } from '../../redux/shopping/shopping-action';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../../components/footer';

const Details = ({ addToCart }) => {
  const navigate = useNavigate()
  const searchParams = useSearchParams()
  const [cartDetail, setCatdetail] = useState({})
  const cartId = searchParams.get('cartId');
  useEffect(() => {
    getDetaileById(cartId).then(res => {
      setCatdetail(res)
    })
  }, [])
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
        <img src={cartDetail.img}></img>
        <div className='back-like'>
          <img src={back} onClick={() => {
            navigate(-1)
          }}></img>
          <img src={unlike}></img>
        </div>
      </div>
      <div className='details-content'>
        <div className='details-name'>
          <p>{cartDetail.desTitle}</p>
          <p>￥{cartDetail.price}</p>
        </div>
        <div className='details-count'>
          <div className='details-num'>数量</div>
          {/* 這裏應該有個輸入框 */}
        </div>
        <div className='details-btn'>
          {/* onClick={openNotification} */}
          <div type="primary" onClick={() => openNotification(addToCart(cartDetail.id))}>加入购物车</div>
          <div>立即购买</div>
        </div>
        <div className='details-param'>
          <p>产品参数:</p>
          <p>口味：{cartDetail.des}</p>
          <p>重量: {cartDetail.weight}</p>
          <p>储藏方法：{cartDetail.storageMethod}</p>
          <p>赏味期限：{cartDetail.time}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);