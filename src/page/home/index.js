import './index.less';
import React from 'react';
import Footer from '../../components/footer';
import Personal from '../../components/personal';
import Search from '../../components/search';
import banner1 from '../../assets/imgs/home/banner1.png'
import banner2 from '../../assets/imgs/home/banner2.png'
import banner3 from '../../assets/imgs/home/banner3.png'
import banner4 from '../../assets/imgs/home/banner4.png'
import Duck from '../../assets/imgs/home/Duck.svg'
import chicken from '../../assets/imgs/home/chicken.svg'
import Cattle from '../../assets/imgs/home/Cattle.svg'
import vegetable from '../../assets/imgs/home/vegetable.svg'
import tabs1 from '../../assets/imgs/home/tabs1.svg'
import tabs2 from '../../assets/imgs/home/tabs2.svg'
import tabs from '../../assets/imgs/home/tabs.svg'
import { useNavigate } from 'react-router-dom';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { Carousel } from 'antd'
import Menulist from '../../components/menulist';

const Home = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <>
      <Personal />
      <Search />
      <div className="home">
        <div className='banner' >
          <Carousel autoplay>
            <div>
              <h3 ><img src={banner4}></img></h3>
            </div>
            <div>
              <h3 ><img src={banner2}></img></h3>
            </div>
            <div>
              <h3 ><img src={banner3}></img></h3>
            </div>
            <div>
              <h3 ><img src={banner1}></img></h3>
            </div>
          </Carousel>
        </div>
        <div className='category'>
          <div className='category-name'><img className='duck' src={Duck}></img>
            <p>鸭类</p></div>
          <div className='category-name'><img src={chicken}></img>
            <p>鸡类</p></div>
          <div className='category-name'><img src={Cattle}></img>
            <p>牛肉类</p></div>
          <div className='category-name'><img src={vegetable}></img>
            <p>蔬菜类</p></div>
        </div>
        <div className='tabs-box'>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: (
                  <div>
                    <img src={tabs1}></img>
                    <p>推荐</p>
                  </div>
                ),
                key: 1,
                children: <Menulist />
              },
              {
                label: (
                  <div>
                    <img src={tabs2}></img>
                    <p>爱尚鸭甜辣熟食</p>
                  </div>
                ),
                key: 2,
                children: <Menulist />
                ,
              },
              {
                label: (
                  <div>
                    <img src={tabs}></img>
                    <p>久久鸭麻辣熟食</p>
                  </div>
                ),
                key: 3,
                children: <Menulist />
                ,
              },
            ]}
          />

        </div>

      </div>
      <Footer/>

    </>
  );
}
export default Home;