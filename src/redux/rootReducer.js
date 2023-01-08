// import { createSlice } from "@reduxjs/toolkit";

// const sliceCounter = createSlice({
//   name: "counter",
//   initialState: {
//     count: 1
//   },
//   reducers:{
//     increment :(state) =>{
//       state.count +=1
//     },
//     decrement:(state)=>{
//       state.count = state.count > 2 ? state.count - 1 : 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   }
// })

// export const {increment,decrement,incrementByAmount} = sliceCounter.actions;
// export default sliceCounter.reducer;
import { combineReducers } from "redux";
import shopReducer from './shopping/shopping-reducer';

const rootReducer = combineReducers({
  // 接受的是对象，传递所有我们想要组合的reducers
  shop: shopReducer,

});

export default rootReducer;
