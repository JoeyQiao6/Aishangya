import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commodity/commodity';
import cartReducer from './shopping/cart';
import dictionaryReducer from './common/dictionary';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    cart: cartReducer,
    dictionary: dictionaryReducer
  },
});
export default store;
