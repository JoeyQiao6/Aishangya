import { createSlice } from '@reduxjs/toolkit'
// import instance from '../../service/request';
// import store from "../store"
// const { products } = useSelector(commoditySelector)
const initialState = {
  cart: {},//{id,title, descr,price,img,qty}
  freight: 0,//运费
  total: 0,
  fareLimit: 3500,
  fareLimit2: 5000,
  cartAmount: 0,
  fare: {},
  freeShippingCategory: [],
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_CART: {
      reducer(state, { payload }) {
        if (payload.product) {
          const key = "PID" + payload.product.id
          let cart = {}
          if (state.cart[key] && payload.count > 0) {
            state.cart[key]["count"] += payload.count
            state.cart[key]["total"] = state.cart[key]["count"] * state.cart[key]["price"]
            cart = {
              id: state.cart[key]["id"],
              pid: state.cart[key]["pid"],
              count: state.cart[key]["count"],
            }
          } else {
            state.cart[key] = {
              "pid": payload.product.id,
              "pident": "",
              "image": payload.product.image,
              "title": payload.product.title,
              "price": payload.product.price,
              "count": payload.count,
              "total": payload.product.price * payload.count,
              "category": payload.product.category
            }
            cart = {
              pid: payload.product.id,
              count: 1,
            }
            console.log(cart)
          }
          if (payload.type !== "init") {
            // instance.post('/apis/youshan-m/cart/updateCart', cart).then((val) => {
            //   if (val.data.success) {
            //     if (state.cart[key]["id"]) {
            //       state.cart[key]["id"] = val.data.results.id
            //     }
            //   }
            // })
          }
        }
      },
      prepare(product, count, type) {
        return {
          payload: {
            product: product,
            count: count,
            type: type
          }
        }
      }
    },
    UPDATE_COUNT_CART: {
      reducer(state, { payload }) {
        const key = "PID" + payload.pid
        state.cart[key]["count"] = payload.count
        state.cart[key]["total"] = state.cart[key]["count"] * state.cart[key]["price"]
      },
      prepare(pid, count) {
        return {
          payload: {
            pid: pid,
            count: count
          }
        }
      }
    },
    REMOVE_CART: {
      reducer(state, { payload }) {
        delete state.cart["PID" + payload.pid]
      },
      prepare(pid) {
        return {
          payload: {
            pid: pid
          }
        }
      }
    },
    RESET_TOTAL_AMOUNT: (state, { payload }) => {
      const cartOb = state.cart
      state.cartAmount = 0
      state.total = 0
      for (const key in cartOb) {
        if (Object.hasOwnProperty.call(cartOb, key)) {
          state.cartAmount += cartOb[key].count
          state.total += cartOb[key]["count"] * cartOb[key]["price"]
        }
      }
    }
  },
})

export default cartSlice.reducer
export const { ADD_CART, RESET_TOTAL_AMOUNT, REMOVE_CART, UPDATE_COUNT_CART } = cartSlice.actions
export const cartSelector = (state) => state.cart;

export const addToCart = (product, count, type) => {
  return async (dispatch) => {
    dispatch(ADD_CART(product, count, type))
    dispatch(RESET_TOTAL_AMOUNT())
  };
}

export const removeFromCart = (pid) => {
  return async (dispatch) => {
    dispatch(REMOVE_CART(pid))
    dispatch(RESET_TOTAL_AMOUNT())
  };
};
export const adjustQty = (product, count) => {
  return async (dispatch) => {
    dispatch(UPDATE_COUNT_CART(product.pid, count))
    dispatch(RESET_TOTAL_AMOUNT())
  };
};
