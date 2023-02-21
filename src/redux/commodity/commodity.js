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
}
export const commoditySlice = createSlice({
  name: 'commodity',
  initialState,
  reducers: {
    SET_PRODUCTS: (state, { payload }) => {
      state.products = payload
    },
    SET_CURRENTITEM:(state, { payload }) =>{
      state.currentItem = payload
    }
  },
})
export const { SET_PRODUCTS, SET_CURRENTITEM } = commoditySlice.actions
export function commodityHomeAsync(para) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    const para1 = {
      page: 1,
      // 这个是一页显示多少个数据
      rows: 10,
      //查找时 根据名字或者分类进行查找
      condition: {
        id: para.id,
        home: para.home,
        title: para.title,
        category: para.category
      }
    }
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post('/apis/youshan-m/merchantcommodity/selectByParam', para1).then((val) => {
      //val是后端返回来的数据
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_PRODUCTS(val))
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
//导出commodity ，让他可以在其他的页面使用，使用方法如下：
// import { getCommodity, commoditySelector } from "../../redux/commodity/commodity"
export const commoditySelector = (state) => state.commodity;

export default commoditySlice.reducer
