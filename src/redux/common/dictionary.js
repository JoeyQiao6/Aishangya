import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';
// import store from "../store"
// const { products } = useSelector(commoditySelector)

//初始状态
const initialState = {
  commodityCategory: [], // 商品分类
  categoryList: [],
  orderState: []
}
const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    SETCOMMODITYCATEGORY(state, { payload }) {
      state.commodityCategory = payload
      state.categoryList = []
      state.commodityCategory.map((item) => {
        state.categoryList.push(item.type);
      });
    },
    SET_ORDERSTATE(state, { payload }) {
      state.orderState = payload
    },
  },
})

export default dictionarySlice.reducer
export const { SETCOMMODITYCATEGORY, SET_ORDERSTATE } = dictionarySlice.actions
export const dictionarySelector = (state) => state.dictionary;

export const homeSectionCategoryInit = () => {
  return async (dispatch) => {
    instance.get("/commons/jee-fk-permit/category/queryP?kind=1").then((val) => {
      if (val.status === 200) {
        val = val.data.data
        console.log(val)
        dispatch(SETCOMMODITYCATEGORY(val))
      }
    })
  };
}
export const getOrderState = () => {
  return async (dispatch) => {
    instance.post("/apis/common/dictionary/queryByGroupIds", ["order_status"]).then((val) => {
      if (val.status === 200) {
        val = val.data.order_status
        let res = val.reduce((acc, curr) => {
          acc[curr.value] = curr.display;
          return acc;
        }, {});
        dispatch(SET_ORDERSTATE(res))
      }
    })
  };
}
