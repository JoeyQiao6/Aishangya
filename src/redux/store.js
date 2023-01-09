import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

//  这是一个商店，在这个商店基本上你可以看到一个集中存储所有状态数据的大型集合地 所以他的名字叫做商店
const store = configureStore({reducer: rootReducer}, composeWithDevTools());

export default store;