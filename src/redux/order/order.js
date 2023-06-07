import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';

const initialState = {
  orders: [],
  currentOrder: {},
  commoditys: {},
  oneMoreProducts: [], // 再来一个的 商品列表
}
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    SET_ONEMOREPRODUCTS(state, { payload }) {
      state.oneMoreProducts = payload
    },
    SET_ORDERS: (state, { payload }) => {
      state.orders = payload
    },
    SET_CURRENTORDER: (state, { payload }) => {
      state.currentOrder = payload
    },
    SET_COMMODITYS: (state, { payload }) => {
      state.commoditys = payload
    },
  },
})
export const { SET_ONEMOREPRODUCTS, SET_ORDERS, SET_CURRENTORDER, SET_COMMODITYS } = orderSlice.actions
export function getOrder(para) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    const para = {
      page: 1,
      // 这个是一页显示多少个数据
      rows: 5,
      //查找时 根据名字或者分类进行查找
      condition: {
      }
    }
    instance.post("/apis/youshan-m/merchantorder/getOrder", para).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_ORDERS(val))
      }
    })
  }
}
export function getOrderById(id) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post("/apis/youshan-m/merchantorder/getOrderById", { id }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_CURRENTORDER(val))
      }
    })
  }
}
export function getOrderWithImageById(id) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post("/apis/youshan-m/merchantorder/getOrderWithImageById", { id }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_CURRENTORDER(val))
      }
    })
  }
}
export function getImageByIds(ids) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    instance.post("/apis/youshan-m/merchantcommodity/getImage", ids).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_COMMODITYS(val))
        let onemore = Object.values(val);
        dispatch(SET_ONEMOREPRODUCTS(onemore))
      }
    })
  }
}

//导出commodity ，让他可以在其他的页面使用，使用方法如下：
// import { getCommodity, commoditySelector } from "../../redux/commodity/commodity"
export const orderSelector = (state) => state.order;

export default orderSlice.reducer
