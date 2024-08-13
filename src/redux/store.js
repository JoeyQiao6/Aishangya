import { configureStore } from '@reduxjs/toolkit';
import commodityReducer from './commodity/commodity';
import cartReducer from './shopping/cart';
import dictionaryReducer from './common/dictionary';
import orderReducer from './order/order';
import likeReducer from './like/like';
import profileReducer from './profile/profile';
import refunderReducer from './refunder/refunder';

const store = configureStore({
  reducer: {
    commodity: commodityReducer,
    cart: cartReducer,
    dictionary: dictionaryReducer,
    order: orderReducer,
    like: likeReducer,
    profile: profileReducer,
    refunder: refunderReducer
  },
});
export default store;
