import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commodity/commodity';
import cartReducer from './shopping/cart';
import dictionaryReducer from './common/dictionary';
import orderReducer from './order/order';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    cart: cartReducer,
    dictionary: dictionaryReducer,
    order: orderReducer,
  },
});
export default store;
