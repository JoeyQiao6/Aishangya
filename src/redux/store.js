import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commodity/commodity';
import cartReducer from './shopping/cart';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    cart: cartReducer
  },
});
export default store;
