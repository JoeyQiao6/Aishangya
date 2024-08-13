import "./App.css";
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./common.sass";
import Home from "./page/home/index";
import Profile from "./page/profile";
import Shop from "./page/shop";
import Like from "./page/like";
import Login from "./page/login";
import Register from "./page/register";
import ConfirmPay from "./page/confirmPay";
import OrderCard from "./page/orderCard";
import RefunderList from "./page/refunder"
import RefunderDetail from "./page/refunder/detail"
import RefunderApply from "./page/orderCard/refunderApply"
import OneMore from "./page/orderCard/oneMore";
import OrderDetail from "./page/orderDetail";
import Payment from "./page/payment"
import WhatIsTradeId from "./page/payment/what"
import AddressAll from "./page/addressAll/index";
import UpdateProfile from "./page/updateProfile/index";
import { connect, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getCart } from "./redux/shopping/cart";
import { getUserInfo } from "./redux/profile/profile";
import 'default-passive-events'
const App = (currentItem) => {
  const dispatch = useDispatch();
  const renderRef = useRef(true); // 防止useEffect执行两次
  const [loginState, setLoginState] = useState(false)
  useEffect(() => {
    // if (!renderRef.current) {
    //   // 防止useEffect执行两次
    //   return
    // }
    // renderRef.current = false
    if (localStorage.getItem("loginState") === 'true') {
      setLoginState(true)
    } else {
      window.location.href = "/#/login";
    }
  });
  useEffect(() => {
    if (loginState) {
      dispatch(getUserInfo());
      dispatch(getCart());
    }
  }, [dispatch, loginState]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/like" element={<Like />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/confirmPay" element={<ConfirmPay />}></Route>
        <Route path="/addressAll" element={<AddressAll />}></Route>
        <Route path="/orderCard" element={<OrderCard />}></Route>
        <Route path="/refunderApply/:id" element={<RefunderApply />}></Route>
        <Route path="/refunderList" element={<RefunderList />}></Route>
        <Route path="/refunderDetail/:id" element={<RefunderDetail />}></Route>
        <Route path="/updateProfile" element={<UpdateProfile />}></Route>
        <Route path="/orderDetail/:id" element={<OrderDetail />}></Route>
        <Route exact path="/payment/:id" element={<Payment />}></Route>
        {/* <Route exact path="/details/:id" element={<Detail />}></Route> */}
        <Route exact path="/onemore/:id" element={<OneMore />}></Route>
        <Route exact path="/whatistradeid" element={<WhatIsTradeId />}></Route>
      </Routes>
    </Router>
  );
};
const mapStateToProps = (state) => {
  return {
    // currentItem: state.shop.currentItem,
  };
};
export default connect(mapStateToProps)(App);
