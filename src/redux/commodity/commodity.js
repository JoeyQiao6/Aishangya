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
    SET_CURRENTITEM(state, { payload }) {
      state.currentItem = payload
    }
  },
})
export const { SET_PRODUCTS, SET_CURRENTITEM } = commoditySlice.actions
export function commodityHomeAsync() {
  return async (dispatch) => {
    const para1 = {
      page: 1,
      rows: 10,
      condition: {
        id: "",
        home: "",
        title: "",
        category: "101"
      }
    }
    instance.post('/apis/common/merchantcommodity/selectByParam', para1).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_PRODUCTS(val))
      }
    })
  }
}
export function getCommodity(id) {
  return async (dispatch) => {
    instance.get('/apis/common/merchantcommodity/getCommodityById/' + id).then((val) => {
      if (val.data.success) {
        val = val.data.results
        dispatch(SET_CURRENTITEM(val))
      }
    })
  }
}
export const commoditySelector = (state) => state.commodity;
export default commoditySlice.reducer
