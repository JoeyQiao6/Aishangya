import './index.less';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Footer from '../../components/footer';
import Item from './item'
import {
  Layout,
  Typography,
} from "antd";
import backW from '../../assets/imgs/details/back-w.svg'
import { getLike, likeSelector } from "../../redux/like/like"
const { Header } = Layout;
const { Title } = Typography;
const Like = () => {
  const dispatch = useDispatch()
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { likes } = useSelector(likeSelector)
  const pageHeight = document.documentElement.scrollHeight - 34 - 30 - 75 - 10;
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    dispatch(getLike({}))
  }, [dispatch])
  return (
    <div className="like">
      <Header >
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <Title>我的收藏</Title>
      </Header>
      <div style={{ overflowY: "auto", height: pageHeight }}>
        {Object.keys(likes).map((key, index) => (
          <Item key={index} itemData={likes[key]} />
        ))}
      </div>
      <Footer />

    </div>
  );
}
export default Like;
