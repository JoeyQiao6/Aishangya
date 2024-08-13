import React, { useEffect, useRef, useState } from "react";
import moment from 'moment'
import "./index.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { useNavigate } from "react-router-dom";
import list1 from "../../assets/imgs/home/list1.png";
import { useSelector, useDispatch } from "react-redux";
import { orderSelector, getOrder } from "../../redux/order/order"
import { dictionarySelector, getOrderState } from "../../redux/common/dictionary"
import Footer from '../../components/footer';
import { Dropdown, Radio, Space, Calendar, Button } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
const OrderCard = () => {
  const negative = useNavigate();
  const dispatch = useDispatch()
  const { orders, hasMore, rows, page } = useSelector(orderSelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { orderState } = useSelector(dictionarySelector)
  const pageHeight = document.documentElement.scrollHeight - 34 - 30 - 75 - 20 - 42;
  const [createDate, setCreateDate] = useState(() => null)
  const [status, setStatus] = useState("-1")
  const ref = useRef(null)
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    if (orderState.length === 0) {
      dispatch(getOrderState())
    }
    search(0)
  }, [dispatch, status])
  const formatDate = (date, format) => {
    return moment(Number(date)).format(format)
  }
  async function search(val) {
    let pagebak = val ? val : page;
    pagebak = val === 0 ? 1 : pagebak + 1
    const para = {
      page: pagebak,
      // 这个是一页显示多少个数据
      rows: rows,
      //查找时 根据名字或者分类进行查找
      condition: {
        status: status,
        searchFDate: createDate !== null ? new Date(formatDate(createDate[0], 'YYYY-MM-DD') + ' 00:00:00').getTime() : "",
        searchSDate: createDate !== null ? new Date(formatDate(createDate[1], 'YYYY-MM-DD') + ' 23:59:59').getTime() : ""
      }
    }
    dispatch(getOrder(para, hasMore))
  }
  return (
    <div className="order_page">
      <div className="order_name">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img> <p>订单管理</p>
      </div>
      <Dropdown ref={ref}>
        <Dropdown.Item key='status' title='状态'>
          <div style={{
            padding: 12, backgroundColor: 'white'
          }}>
            <Radio.Group value={status} onChange={val => {
              setStatus(val)
            }}>
              <Space direction='vertical' block>
                <Radio block value='-1'>
                  全部
                </Radio>
                {orderState.length !== 0 &&
                  Object.keys(orderState).map((key) => (
                    <Radio block value={key} key={key}>
                      {orderState[key]}
                    </Radio>
                  ))
                }
              </Space>
            </Radio.Group>
          </div>
        </Dropdown.Item>
        <Dropdown.Item key='bizop' title='订单创建时间'>
          <div style={{ padding: 12, color: 'black' }}>

            <Calendar
              selectionMode='range'
              defaultValue={createDate}
              onChange={val => {
                setCreateDate(val)
              }}
            />

          </div>
          <div style={{ padding: '0 12px 12px' }}>
            <Button
              color='primary'
              block
              onClick={() => {
                search(0)
                ref.current?.close()
              }}
            >
              确定
            </Button>
          </div>
        </Dropdown.Item>
      </Dropdown>
      <div className="order_list" style={{ height: pageHeight }}>
        <InfiniteScroll
          dataLength={orders.length}
          next={search}
          hasMore={hasMore}
          height={pageHeight}
          loader={<h4>Loading...</h4>}
          refreshFunction={search}
          pullDownToRefresh
          pullDownToRefreshThreshold={10}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8593; Release to refresh
            </h3>
          }
        >
          {orders.length > 0 &&
            orders?.map((order, index) => (
              <div key={index} className="order_card">
                <div className="order_number">
                  <p>订单编号: {order.id}</p>
                  <p className="order_state">{orderState[order.status]}</p>
                </div>
                <div
                  className="order_content"
                  onClick={() => {
                    negative("/orderDetail/" + order.id);
                  }}
                >
                  <div className="order_img">
                    <img src={list1} alt=""></img>
                  </div>
                  <div className="order_text">
                    <p>订单创建时间：{formatDate(order.authenmodify, 'YYYY-MM-DD HH:mm:ss')}</p>
                    <p>人民币：{(order.total * order.rate).toFixed(2)}元</p>
                    <p>总金额：{order.total}円</p>
                  </div>
                </div>
                <div className="order_again" onClick={() => {
                  negative("/oneMore/" + order.id);
                }}>再来一单</div>
                {(order.status === 2 || order.status === 5 || order.status === 7 || order.status === 10 || order.status === 12) &&
                  <div className="refunder" onClick={() => {
                    negative("/refunderApply/" + order.id);
                  }}>退货</div>
                }

              </div>
            ))
          }
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
};

export default OrderCard;
