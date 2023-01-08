import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension"; 

//  这是一个商店，在这个商店基本上你可以看到一个集中存储所有状态数据的大型集合地 所以他的名字叫做商店
const Store = configureStore(rootReducer,composeWithDevTools());

export default Store;