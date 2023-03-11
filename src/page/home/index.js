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
  const [page, setPage] = useState(1)
  const [scrollableDivRef] = useState([useRef(null), useRef(null)]);
  const [lodingState, setLodingState] = useState(false)
  const [categoroyIndex, setCategoryIndex] = useState(0)
  const [categoroyChangeState, setCategoryCategoroyChangeState] = useState(true)
  const handleScroll = () => {
    if (lodingState) return
    const { scrollTop, clientHeight, scrollHeight } = scrollableDivRef[categoroyIndex].current;
    if (scrollHeight - scrollTop === clientHeight) {
      // 执行你需要的操作
      console.log('到达底部了');
      setLodingState(true)
      setTimeout(() => {
        getProducts()
      }, 2000);
    }
  };
  useEffect(() => {
    if (lodingState)
      setLodingState(false)
  }, [products])
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
    const para = {
      page: page,
      // 这个是一页显示多少个数据
      rows: 10,
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
  useEffect(() => {
    if (categoroyIndex > 0 && categoroyChangeState) {
      getProducts()
      setCategoryCategoroyChangeState(false)
    }
  }, [categoroyIndex])
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
                    {lodingState ? <div>loding ...</div> : ""}
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
// {products?.map((prod, index) => (
//   cc.type === prod.category ?
//     <MenuItem key={index} itemData={prod} /> : ""
// ))
// }