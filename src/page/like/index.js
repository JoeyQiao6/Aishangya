import './index.less';
import React from 'react';
import Footer from '../../components/footer';
import {
  Layout,
  Typography,
} from "antd";
import backW from '../../assets/imgs/details/back-w.svg'
const { Header } = Layout;
const { Title } = Typography;
const Like = () => {
  return (
    <div className="like">
      <Header >
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <Title>我的收藏</Title>
      </Header>
      <Footer />

    </div>
  );
}
export default Like;
