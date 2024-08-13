import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';
// import store from "../store"
// const { products } = useSelector(commoditySelector)

//初始状态
const initialState = {
  commodityCategory: [], // 商品分类
  categoryList: [],
  orderState: [], //订单状态
  refunderState: [], //退货状态
  logisticsType: [] //物流类型
}
const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    SETCOMMODITYCATEGORY(state, { payload }) {
      state.commodityCategory = payload
      state.categoryList = []
      state.commodityCategory.forEach((item) => {
        state.categoryList.push(item.type);
      });
    },
    SET_ORDERSTATE(state, { payload }) {
      state.orderState = payload
    },
    SET_REFUNDERSTATE(state, { payload }) {
      state.refunderState = payload
    },
    SET_LOGISTICSTYPE(state, { payload }) {
      state.logisticsType = payload
    },
  },
})

export default dictionarySlice.reducer
export const { SETCOMMODITYCATEGORY, SET_ORDERSTATE, SET_REFUNDERSTATE, SET_LOGISTICSTYPE } = dictionarySlice.actions
export const dictionarySelector = (state) => state.dictionary;

export const homeSectionCategoryInit = () => {
  return async (dispatch) => {
    instance.get("/commons/jee-fk-permit/category/queryP?kind=1").then((val) => {
      console.log(val);
      if (val.status === 200) {
        val = val.data.data
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
export const getRefunderState = () => {
  return async (dispatch) => {
    instance.post("/apis/common/dictionary/queryByGroupIds", ["refunder_state"]).then((val) => {
      if (val.status === 200) {
        val = val.data.refunder_state
        let res = val.reduce((acc, curr) => {
          acc[curr.value] = curr.display;
          return acc;
        }, {});
        dispatch(SET_REFUNDERSTATE(res))
      }
    })
  };
}
export const getLogisticsType = () => {
  return async (dispatch) => {
    instance.post("/apis/common/dictionary/queryByGroupIds", ["logistics_type"]).then((val) => {
      if (val.status === 200) {
        val = val.data.logistics_type
        let res = val.reduce((acc, curr) => {
          acc[curr.value] = curr.display;
          return acc;
        }, {});
        dispatch(SET_LOGISTICSTYPE(res))
      }
    })
  };
}
