import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';

const initialState = {
  refunders: [],
  currentRefunder: {},
  hasMore: true,
  rows: 5,
  page: 0
}
export const refunderSlice = createSlice({
  name: 'refunder',
  initialState,
  reducers: {
    SET_CONCAT_REFUNDERS: (state, { payload }) => {
      state.refunders = state.refunders.concat(payload)
    },
    SET_REFUNDERS: (state, { payload }) => {
      state.refunders = payload
    },
    SET_REFUNDERS_UPDATE: (state, { payload }) => {
      state.refunders.forEach(function (item) {
        item = payload
      });
    },
    SET_CURRENTREFUNDER: (state, { payload }) => {
      state.currentRefunder = payload
    },
    SET_HASMORE: (state, { payload }) => {
      state.hasMore = payload
    },
    SET_PAGE: (state, { payload }) => {
      state.page = payload
    },
  },
})
export const { SET_REFUNDERS, SET_CURRENTREFUNDER, SET_HASMORE, SET_PAGE, SET_CONCAT_REFUNDERS, SET_REFUNDERS_UPDATE } = refunderSlice.actions
export function getRefunder(para, hasMore) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    instance.post("/apis/youshan-m/merchantrefunder/getRefunder", para).then((val) => {
      if (val.data.success) {
        val = val.data.results
        if (para.page === 1) {
          dispatch(SET_REFUNDERS(val))
        } else {
          dispatch(SET_CONCAT_REFUNDERS(val))
        }
        dispatch(SET_PAGE(para.page))
        console.log("val", val);
        if (val.length === 0 || val.length % para.rows > 0) {
          let hasMorebak = JSON.parse(JSON.stringify(hasMore))
          hasMorebak = false
          dispatch(SET_HASMORE(hasMorebak))
        }
      }
    })
  }
}
export function getRefunderById(rid) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post("/apis/youshan-m/merchantrefunder/getRefunderById", { rid }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        console.log(val);
        dispatch(SET_CURRENTREFUNDER(val))
      }
    })
  }
}
export function cancel(rid) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post("/apis/youshan-m/merchantrefunder/cancelRefunder", { rid }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        console.log(val);
        dispatch(SET_REFUNDERS_UPDATE(val))

      }
    })
  }
}
export function updateRefunder(para) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求
    instance.post("/apis/youshan-m/merchantrefunder/updateRefunder", para).then((val) => {
      if (val.data.success) {
        console.log(val);
        val = val.data.results
        dispatch(SET_REFUNDERS_UPDATE(val))

      }
    })
  }
}
export const refunderSelector = (state) => state.refunder;

export default refunderSlice.reducer
