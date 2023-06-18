import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';

const initialState = {
  likes: [],
}
export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    SET_LIKES(state, { payload }) {
      state.likes = payload
    },
    SET_LIKE(state, { payload }) {
      let likesbak = JSON.parse(JSON.stringify(state.likes))
      console.log(likesbak);
      console.log(payload);
      for (let i = 0; i < likesbak.length; i++) {
        if (typeof (payload.id) === "string") {
          if (likesbak[i].id === payload.pid) {
            likesbak[i].count = payload.count;
            break;  // 购物车
          }
        } else {
          if (likesbak[i].id === payload.id) {
            likesbak[i].count = payload.count;
            break;  // 首页
          }
        }
      }
      state.likes = likesbak
    },
  },
})
export const { SET_LIKES, SET_LIKE } = likeSlice.actions
export function getLike(para) {
  // 同步和异步 async是异步
  return async (dispatch) => {
    //请求后台数据的方法。面试时可以instance换成axios.post请求

    instance.post("/apis/youshan-m/merchantlike/queryLikeCommoditys", para).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_LIKES(val))
      }
    })
  }
}
export function setLikeCount(itemData, num) {
  return async (dispatch) => {
    console.log(itemData);
    console.log(num);
    let productbak = JSON.parse(JSON.stringify(itemData))
    productbak.count = num
    console.log(productbak);
    dispatch(SET_LIKE(productbak))
  }
}
export const likeSelector = (state) => state.like;

export default likeSlice.reducer