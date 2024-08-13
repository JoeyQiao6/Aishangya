import './index.less';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Footer from '../../components/footer';
import Personal from '../../components/personal';
import Search from '../../components/search';
import MenuItem from './menuItem';
import { connect, useSelector, useDispatch } from 'react-redux';
import { homeSectionCategoryInit, dictionarySelector } from '../../redux/common/dictionary'
import { commodityHomeAsync, commoditySelector, SET_PAGES, SET_HASMORE, SET_PRODUCTS_INIT } from '../../redux/commodity/commodity'

import { Tabs, Swiper } from 'antd-mobile'
import { DemoBlock } from './utils.js'
import InfiniteScroll from 'react-infinite-scroll-component';
const Home = () => {
  const dispatch = useDispatch()
  const { products, hasMore, rows, pages, searchItem, searchItemState } = useSelector(commoditySelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const swiperRef = useRef(null)
  const elementRef = useRef(null);
  const { commodityCategory, categoryList } = useSelector(dictionarySelector)
  const [categoroyIndex, setCategoryIndex] = useState(0)
  const [resState, setResState] = useState([true, true])
  const pageHeight = document.documentElement.scrollHeight - 96 - 40 - 42 - 55 - 10;


  useEffect(() => {
    if (products.length > 0) {
      let resStatebak = resState
      resStatebak[categoroyIndex] = true
      setResState(resStatebak)
    }
  }, [products, categoroyIndex, resState])
  useEffect(() => {
    if (categoryList.length === 0 || searchItemState) return
    let pagesbak = [categoroyIndex === 0 ? 1 : 0, categoroyIndex === 1 ? 1 : 0]
    dispatch(SET_PAGES([0, 0]))
    dispatch(SET_HASMORE([true, true]))
    dispatch(SET_PRODUCTS_INIT([]))
    setResState([true, true])
    const para = {
      page: pagesbak[categoroyIndex],
      // 这个是一页显示多少个数据
      rows,
      //查找时 根据名字或者分类进行查找
      condition: {
        title: searchItem,
        category: categoryList[categoroyIndex]
      }
    }
    dispatch(commodityHomeAsync(para, [true, true], categoroyIndex, pagesbak))
  }, [searchItem, dispatch, categoroyIndex])
  const fetchMoreData = useCallback((pr) => {
    if (categoryList.length === 0 || searchItemState) return
    const pagesbak = Object.assign({}, pages);
    let index = pr !== undefined ? pr : categoroyIndex
    pagesbak[index] = pagesbak[index] + 1
    // dispatch(SET_PAGES(pagesbak))
    const para = {
      page: pagesbak[index],
      // 这个是一页显示多少个数据
      rows,
      //查找时 根据名字或者分类进行查找
      condition: {
        title: searchItem,
        category: categoryList[index]
      }
    }
    dispatch(commodityHomeAsync(para, hasMore, index, pagesbak))
  }, [categoroyIndex, categoryList, dispatch, hasMore, pages, rows])
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    if (categoryList.length === 0) {
      dispatch(homeSectionCategoryInit())
    }
    if (categoryList.length > 0 && products.length === 0) {
      fetchMoreData()
    }
  }, [dispatch, categoryList, fetchMoreData, products.length])

  async function getProducts(pr) {
    let index = pr !== undefined ? pr : categoroyIndex
    let resStatebak = resState
    try {
      if (!hasMore[index] || !resState[index]) {
        return
      }
      resStatebak[index] = false
      setResState(resStatebak)
      fetchMoreData(index)
    } finally {
      resStatebak[index] = true
      setResState(resStatebak)
    }
  }

  return (
    <>
      <Personal />
      <Search />
      <div className="home" ref={elementRef}>
        <div className='tabs-box'>
          <DemoBlock padding='0'>
            <Tabs
              activeKey={commodityCategory[categoroyIndex]?.id}
              onChange={key => {
                const index = commodityCategory.findIndex(item => item.id === Number(key))
                setCategoryIndex(index)
                swiperRef.current?.swipeTo(index)
                const index1 = products.findIndex(item => Number(item.category) === Number(commodityCategory[index].type))
                if (index1 < 0) {
                  getProducts(index)
                }
              }}
            >
              {commodityCategory.map(item => (
                <Tabs.Tab title={< div ><img src={item.image} alt=""></img> <p>{item.title}</p></div>} key={item.id} />
              ))}
            </Tabs>
            <Swiper
              direction='horizontal'
              loop
              indicator={() => null}
              ref={swiperRef}
              defaultIndex={categoroyIndex}
              onIndexChange={index => {
                setCategoryIndex(index)
              }}
            >
              {commodityCategory.length > 0 ? commodityCategory?.map(item => (
                <Swiper.Item key={item.id}>
                  <div className='productList' >
                    <InfiniteScroll
                      dataLength={products.length}
                      next={getProducts}
                      hasMore={hasMore[categoroyIndex]}
                      height={pageHeight}
                      loader={<h4>Loading...</h4>}
                      refreshFunction={getProducts}
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
                      {products?.map((prod, index) => (
                        item.type === prod.category ?
                          <MenuItem key={index} itemData={prod} />
                          : ""
                      ))
                      }
                    </InfiniteScroll>
                  </div>
                </Swiper.Item>

              )) : <Swiper.Item ></Swiper.Item>}
            </Swiper>
          </DemoBlock>
        </div >
      </div >
      <Footer />
    </>
  );
};
export default connect()(Home);
