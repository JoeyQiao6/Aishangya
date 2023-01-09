import './index.less';
import React, { useEffect } from 'react';
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
import { Tabs } from 'antd';
import { Carousel } from 'antd'
import Menulist from '../../components/menulist';
import instance from '../../service/request';
import { connect } from 'react-redux';
const Home = (products) => {
  // const onChange = (currentSlide) => {
  //   console.log(currentSlide);
  // };
  useEffect(() => {
    return () => {
      instance.get('/common/metaLand/myLandDetail')
    }
  })
  return (
    <>
      <Personal />
      <Search />
      <div className="home">
        <div className='banner' >
          <Carousel autoplay>
            <div>
              <h3 ><img alt='' src={banner4}></img></h3>
            </div>
            <div>
              <h3 ><img alt='' src={banner2}></img></h3>
            </div>
            <div>
              <h3 ><img alt='' src={banner3}></img></h3>
            </div>
            <div>
              <h3 ><img alt='' src={banner1}></img></h3>
            </div>
          </Carousel>
        </div>
        <div className='category'>
          <div className='category-name'><img alt='' className='duck' src={Duck}></img>
            <p>鸭类</p></div>
          <div className='category-name'><img alt='' src={chicken}></img>
            <p>鸡类</p></div>
          <div className='category-name'><img alt='' src={Cattle}></img>
            <p>牛肉类</p></div>
          <div className='category-name'><img alt='' src={vegetable}></img>
            <p>蔬菜类</p>
          </div>
        </div>
        <div className='tabs-box'>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: (
                  <div>
                    <img alt='' src={tabs1}></img>
                    <p>推荐</p>
                  </div>
                ),
                key: 1,
                children:
                  <div className='list-box'>
                    {products.products.map((prod) => (
                      <Menulist key={prod.id} productData={prod} />
                    ))}
                  </div>
              },
              {
                label: (
                  <div>
                    <img alt='' src={tabs2}></img>
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
                    <img alt='' src={tabs}></img>
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
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.shop.products
  }
}
export default connect(mapStateToProps)(Home);