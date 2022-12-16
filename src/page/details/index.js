import './index.less';
import React from 'react';
import list1 from '../../assets/imgs/home/list1.png'
import back from '../../assets/imgs/details/back.svg'
import unlike from '../../assets/imgs/home/unlike.svg'
import Count from '../../components/count';
import { notification } from 'antd';
import { useNavigate} from 'react-router-dom';

const Details = () => {
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
        <img src={list1}></img>
        <div className='back-like'>
          <img src={back} onClick={() => {
        navigate(-1)
      }}></img>
          <img src={unlike}></img>
        </div>
      </div>
      <div className='details-content'>
        <div className='details-name'>
          <p>甜辣腐竹 【爱尚鸭】</p>
          <p>￥400</p>
        </div>
        <div className='details-count'>
          <div className='details-num'>数量</div>
          <Count />
        </div>
        <div className='details-btn'>
          <div type="primary" onClick={openNotification}>加入购物车</div>
          <div>立即购买</div>
        </div>
        <div className='details-param'>
          <p>产品参数:</p>
          <p>口味：甜辣</p>
          <p>重量: 150g</p>
          <p>储藏方法：放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射</p>
          <p>赏味期限：14天</p>
        </div>
      </div>
    </div>
  );
}
export default Details;