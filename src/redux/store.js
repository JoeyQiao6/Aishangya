import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commodity/commodity';
import cartReducer from './shopping/cart';
import dictionaryReducer from './common/dictionary';
import orderReducer from './order/order';
import likeReducer from './like/like';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    cart: cartReducer,
    dictionary: dictionaryReducer,
    order: orderReducer,
    like: likeReducer,
  },
});
export default store;
