import './index.less';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../components/footer';
import Personal from '../../components/personal';
import Search from '../../components/search';
import { Tabs } from 'antd';
import MenuItem from './menuItem';
import { connect, useSelector, useDispatch } from 'react-redux';
import { homeSectionCategoryInit, dictionarySelector } from '../../redux/common/dictionary'
import { commodityHomeAsync, commoditySelector } from '../../redux/commodity/commodity'

const Home = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(commoditySelector)
  const { commodityCategory, categoryList } = useSelector(dictionarySelector)
  const renderRef = useRef(true); // 防止useEffect执行两次
  const [pages, setPages] = useState([0, 0])
  const rows = 10
  const [reqState, setReqState] = useState([false, false])
  const [scrollableDivRef] = useState([useRef(null), useRef(null)]);
  const [lodingState, setLodingState] = useState([false, false])
  const [categoroyIndex, setCategoryIndex] = useState(0)
  const [categoroyChangeState, setCategoryCategoroyChangeState] = useState(true)
  const handleScroll = () => {
    if (lodingState[categoroyIndex]) return
    const { scrollTop, clientHeight, scrollHeight } = scrollableDivRef[categoroyIndex].current;

    if (scrollHeight - scrollTop === clientHeight) {
      // 执行你需要的操作
      let lodingStatebak = lodingState
      lodingStatebak[categoroyIndex] = true
      setLodingState(lodingStatebak)
      setTimeout(() => {
        getProducts()
      }, 1000);
    }
  };
  useEffect(() => {
    let lodingStatebak = lodingState
    lodingStatebak[categoroyIndex] = false
    setLodingState(lodingStatebak)
    if (products.length % rows > 0) {
      let reqStatebak = reqState
      reqStatebak[categoroyIndex] = true
      setReqState(reqStatebak)
    }

  }, [products.length])
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    if (categoryList.length === 0) {
      dispatch(homeSectionCategoryInit())
    }
    if (categoryList.length > 0 && products.length === 0) {
      getProducts()
    }
  }, [dispatch, categoryList])
  const getProducts = () => {
    if (reqState[categoroyIndex]) {
      return
    }
    pages[categoroyIndex] += 1
    const para = {
      page: pages[categoroyIndex],
      // 这个是一页显示多少个数据
      rows,
      //查找时 根据名字或者分类进行查找
      condition: {
        title: "",
        category: categoryList[categoroyIndex]
      }
    }
    dispatch(commodityHomeAsync(para))
  }
  const getChangeCategory = (index) => {
    setCategoryIndex(index)
  }
  // useEffect(() => {
  //   if (categoroyIndex > 0 && categoroyChangeState) {
  //     getProducts()
  //     setCategoryCategoroyChangeState(false)
  //   }
  // }, [categoroyIndex])
  return (
    <>
      <Personal />
      <Search />
      <div className="home">
        <div className='tabs-box'>
          <Tabs
            onChange={getChangeCategory}
            defaultActiveKey="1"
            items={commodityCategory?.map((cc, index) => (
              {
                label: (
                  <div>
                    <img src={cc.image}></img>
                    <p>{cc.title}</p>
                  </div>
                ),
                key: index,
                children:
                  <div className='productList' ref={scrollableDivRef[index]} onScroll={handleScroll}>
                    {products?.map((prod, index) => (
                      cc.type === prod.category ?
                        <MenuItem key={index} itemData={prod} />
                        : ""
                    ))
                    }
                    {lodingState[categoroyIndex] ? <div className='loading'>加载中 ...</div> : ""}
                    {reqState[categoroyIndex] ? <div className='loading'>已经加载完了 ...</div> : ""}
                  </div>
              }
            ))}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default connect()(Home);
