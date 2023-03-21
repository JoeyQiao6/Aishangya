import './App.css';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./common.sass";
import Home from './page/home';
import Profile from './page/profile';
import Shop from './page/shop';
import Mall from './page/mall';
import Detail from './page/details';
import Login from './page/login';
import Register from './page/register';
import ConfirmPay from './page/confirmPay';
import Address from './page/address';
import AddressAll from './page/addressAll/index';
// 这个Provider基本上与共享状态的上文方式相同，用这个Provider 包装 <App />
import { connect, useDispatch } from "react-redux";
import { useEffect, useRef } from 'react';
import { getCart } from "./redux/shopping/cart"
// import { Redirect } from 'react-router-dom'
const App = (currentItem) => {
  const dispatch = useDispatch()
  const renderRef = useRef(true); // 防止useEffect执行两次
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    dispatch(getCart())
  }, [])
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} ></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/mall' element={<Mall />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/confirmPay' element={<ConfirmPay />}></Route>
        <Route path='/addressList' element={<Address />}></Route>
        <Route path='/addressAll' element={<AddressAll />}></Route>
        {/* 怎么重新定位到默认页面,Redirect 用不了 */}
        {!currentItem ? (
          <Navigate replace to="/" />
        ) : (
          <Route exact path='/details/:id' element={<Detail />}></Route>
        )}
      </Routes>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    // currentItem: state.shop.currentItem,
  };
};
export default connect(mapStateToProps)(App);

