import * as actionTypes from './shopping-types';
import list1 from '../../assets/imgs/home/list1.png'
import list2 from '../../assets/imgs/home/list2.png'

const INITIAL_STATE = {
  cart: [1,2],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TO_CART:
      state.cart.push(payload?.id)
      return {
        ...state,
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id
            //+作用：將這個數轉換為整數 
            ? { ...item, qty: +payload.qty }
            : item)
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: payload,
      };
    default:
      return state;
  }
};

export default shopReducer;