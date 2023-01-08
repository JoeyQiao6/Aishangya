// * 意味着导入所有
import * as actionTypes from './shopping-types';
//addToCart 将接收产品id 因为当我们将它添加到购物车的时候，我们将遍历所有的产品信息，搜索该特定的id 并将该id添加到购物车，所以这就是为什么用itemID



export const addToCart = (itemID) => {
  //一旦我们得到id，我们就返回。所以这个功能将在我们的内部被调用
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID
    },
  };
};
export const adjustQty = (itemID, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};
export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};