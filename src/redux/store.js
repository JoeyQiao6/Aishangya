import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commodity/commodity';
import cartReducer from './shopping/cart';

export default configureStore({
  reducer: {
    commodity: commodityReducer,
    cart: cartReducer
  },
});
