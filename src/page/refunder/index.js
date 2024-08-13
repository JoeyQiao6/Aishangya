import React, { useEffect, useRef, useState } from "react";
import moment from 'moment'
import "./index.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { useNavigate } from "react-router-dom";
import list1 from "../../assets/imgs/home/list1.png";
import { useSelector, useDispatch } from "react-redux";
import { refunderSelector, getRefunder, cancel } from "../../redux/refunder/refunder"
import { dictionarySelector, getRefunderState } from "../../redux/common/dictionary"
import Footer from '../../components/footer';
import { Dropdown, Radio, Space, Calendar, Button } from 'antd-mobile'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'antd-mobile'
const OrderCard = () => {
  const negative = useNavigate();
  const dispatch = useDispatch()
  const { refunders, hasMore, rows, page } = useSelector(refunderSelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const { refunderState } = useSelector(dictionarySelector)
  const pageHeight = document.documentElement.scrollHeight - 34 - 30 - 75 - 20 - 42;
  const ref = useRef(null)
  const [state, setState] = useState("-1")
  const [createDate, setCreateDate] = useState(() => null)

  async function search(val) {
    let pagebak = val ? val : page;
    pagebak = val === 0 ? 1 : pagebak + 1
    const para = {
      page: pagebak,
      // 这个是一页显示多少个数据
      rows: rows,
      //查找时 根据名字或者分类进行查找
      condition: {
        state: state,
        searchFDate: createDate !== null ? new Date(formatDate(createDate[0], 'YYYY-MM-DD') + ' 00:00:00').getTime() : "",
        searchSDate: createDate !== null ? new Date(formatDate(createDate[1], 'YYYY-MM-DD') + ' 23:59:59').getTime() : ""
      }
    }
    dispatch(getRefunder(para, hasMore))
  }
  const cancelRefunder = async (rid) => {
    const result = await Modal.confirm({
      content: '确定要取消吗?',
    })
    if (result) {
      dispatch(cancel(rid))
      window.location.reload();
    }
  }
  useEffect(() => {
    // if (!renderRef.current) {
    //   // 防止useEffect执行两次
    //   return
    // }
    // renderRef.current = false
    search(0)
    if (refunderState.length === 0) {
      dispatch(getRefunderState())
    }
  }, [dispatch, state, refunderState.length])
  const formatDate = (date, format) => {
    return moment(Number(date)).format(format)
  }
  return (
    <div className="order_page">
      <div className="order_name">
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img> <p>退货管理</p>
      </div>
      <Dropdown ref={ref}>
        <Dropdown.Item key='state' title='状态'>
          <div style={{
            padding: 12, backgroundColor: '#312020'
          }}>
            <Radio.Group value={state} onChange={val => {
              setState(val)
            }}>
              <Space direction='vertical' block>
                <Radio block value='-1'>
                  全部
                </Radio>
                {refunderState.length !== 0 &&
                  Object.keys(refunderState).map((key) => (
                    <Radio block value={key} key={key}>
                      {refunderState[key]}
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
          dataLength={refunders.length}
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
          {refunders.length > 0 &&
            refunders?.map((refunder, index) => (
              <div key={index} className="order_card">
                <div className="order_number">
                  <p>编号: {refunder.rid}    (订单编号：{refunder.oid})</p>
                  <p className="order_state">{refunderState[refunder.state]}</p>
                </div>
                <div
                  className="order_content"
                >
                  <div className="order_img">
                    <img src={list1} alt=""></img>
                  </div>
                  <div className="order_text">
                    <p>订单更新时间：{refunder.updatetime}</p>
                    <p>人民币：{(refunder.total * refunder.rate).toFixed(2)}元</p>
                    <p>总金额：{refunder.total}円</p>
                  </div>
                </div>
                {refunder.state === 0 &&
                  <div className="order_cancel" onClick={() => {
                    cancelRefunder(refunder.rid)
                  }}>取消</div>}
                <div className="order_again" onClick={() => {
                  negative("/refunderDetail/" + refunder.rid);
                }}>查看详情</div>
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
