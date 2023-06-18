// 这段代码是一个使用 Redux 和 Redux Toolkit 的商品列表和商品详情的相关操作代码。其中：

// commoditySlice 通过 createSlice 创建了一个名为 commodity 的 Redux slice，其中包含了 products 和 currentItem 两个 state，以及 SET_PRODUCTS 和 SET_CURRENTITEM 两个 reducer。

// commodityHomeAsync 是一个异步 action，它会向服务器请求商品列表数据，然后将请求结果作为 SET_PRODUCTS 的参数进行 dispatch，从而更新 Redux store 中的 products state。

// getCommodity 是另一个异步 action，它会向服务器请求指定商品的详情数据，然后将请求结果作为 SET_CURRENTITEM 的参数进行 dispatch，从而更新 Redux store 中的 currentItem state。

// commoditySelector 是一个 selector，它可以获取 Redux store 中的 commodity state。

// 这段代码主要实现了对商品列表和商品详情的数据获取和更新操作，并且使用了 Redux Toolkit 提供的 createSlice 和 createAsyncThunk 等 API 简化了 Redux 相关代码的编写。

import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';

const initialState = {
  products: [],
  currentItem: null,
  hasMore: [true, true],
  rows: 10
}
export const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {
    SET_HASMORE: (state, { payload }) => {
      state.hasMore = payload
    },
    SET_PRODUCTS: (state, { payload }) => {
      state.products = state.products.concat(payload)
    },
    SET_CURRENTITEM: (state, { payload }) => {
      state.currentItem = payload
    },
    SET_PRODUCTS_COUNT: (state, { payload }) => {
      let productsbak = JSON.parse(JSON.stringify(state.products))
      for (let i = 0; i < productsbak.length; i++) {
        if (typeof (payload.id) === "string") {
          if (productsbak[i].id === payload.pid) {
            productsbak[i].count = payload.count;
            break;  // 购物车
          }
        } else {
          if (productsbak[i].id === payload.id) {
            productsbak[i].count = payload.count;
            break;  // 首页
          }
        }
      }
      state.products = productsbak
    }
  },
})
export const { SET_PRODUCTS, SET_CURRENTITEM, SET_HASMORE, SET_PRODUCTS_COUNT } = commoditySlice.actions
export function commodityHomeAsync(para, hasMore, categoroyIndex) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post('/apis/youshan-m/merchantcommodity/selectByParam', para).then((val) => {
      //val是后端返回来的数据
      if (val.data.success) {
        val = val.data.results
        console.log(val);
        // val.forEach(element => {
        //   element.count = 1
        // });
        dispatch(SET_PRODUCTS(val))
        if (val.length % para.rows > 0) {
          let hasMorebak = JSON.parse(JSON.stringify(hasMore))
          hasMorebak[categoroyIndex] = false
          dispatch(SET_HASMORE(hasMorebak))
        }
      }
    })
  }
}
export function getCommodity(id) {
  return async (dispatch) => {
    instance.get('/apis/youshan-m/merchantcommodity/getCommodityById/' + id).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_CURRENTITEM(val))
      }
    })
  }
}
export function setProductCount(itemData, num) {
  return async (dispatch) => {
    let productbak = JSON.parse(JSON.stringify(itemData))
    productbak.count = num
    dispatch(SET_PRODUCTS_COUNT(productbak))
  }
}
//导出commodity ，让他可以在其他的页面使用，使用方法如下：
// import { getCommodity, commoditySelector } from "../../redux/commodity/commodity"
export const commoditySelector = (state) => state.commodity;

export default commoditySlice.reducer
