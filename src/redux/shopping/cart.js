import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';

//初始状态
const initialState = {
  cart: {}// 商品列表
  ,//{id,title, descr,price,img,qty}
  freight: 0,//运费
  total: 0,
  fareLimit: 3500, //满额包邮的条件
  fareLimit2: 5000,
  cartAmount: 0,
  fare: {}, //运费计算结果
  freeShippingCategory: [], //享受包邮的商品种类
}
//cartSlice 是一个 reducer，定义了一系列操作 state 的函数
// 包括添加商品到购物车、更新商品、移除购物车的商品、重置购物车状态
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_CART: {
      reducer(state, { payload }) {
        state.cart[payload.key] = payload.cart
      },
      // 封装参数，是固定写法
      prepare(cart, key) {
        return {
          payload: {
            cart: cart,
            key: key
          }
        }
      }
    },
    // 更新商品数量 UPDATE_COUNT_CART
    // UPDATE_COUNT_CART 接收两个参数，分别是商品 id 和数量。它会更新购物车中指定商品的数量，并重新计算该商品的总价。
    UPDATE_COUNT_CART: {
      //reducer是主要要执行的方法
      reducer(state, { payload }) {
        console.log(payload)
        const key = "PID" + payload.id
        state.cart[key]["count"] = payload.count
        state.cart[key]["total"] = state.cart[key]["count"] * state.cart[key]["price"]
      },
      // 封装参数，是固定写法
      prepare(pid, count) {
        return {
          payload: {
            pid: pid,
            count: count
          }
        }
      }
    },
    //移除购物车的商品 REMOVE_CART
    // REMOVE_CART 接收一个参数，即商品 id，它会从购物车中删除该商品。
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
    //重置购物车状态 RESET_TOTAL_AMOUNT
    // RESET_TOTAL_AMOUNT 不接收参数，它会重置购物车状态，包括清空购物车中的商品、商品数量和总价。然后它会重新计算购物车中所有商品的数量和总价。
    RESET_TOTAL_AMOUNT: (state, { payload }) => {
      const cartOb = state.cart
      state.cartAmount = 0
      state.total = 0
      //遍历对象
      for (const key in cartOb) {
        //判断是否这个对象中有这个值，重新计算总数和总价格，所以每次点击添加商品时需要调用这个方法去更新值0.1
        if (Object.hasOwnProperty.call(cartOb, key)) {
          state.cartAmount += cartOb[key].count
          state.total += cartOb[key]["count"] * cartOb[key]["price"]
        }
      }
    }
  },
})

export default cartSlice.reducer
//cartSlice.actions 声明式引入，这样的话 ADD_CART, RESET_TOTAL_AMOUNT这些都可以在外面用，相当于有个参数
export const { ADD_CART, RESET_TOTAL_AMOUNT, REMOVE_CART, UPDATE_COUNT_CART } = cartSlice.actions
export const cartSelector = (state) => state.cart;

export const addToCart = (product, count) => {
  return async (dispatch) => {
    console.log("addToCart")
    //想要调用上面声明的方法ADD_CART 就必须用dispatch
    dispatch(ADD_CART(product, count))
    // 接0.1
    dispatch(RESET_TOTAL_AMOUNT())
  };
}

export const removeFromCart = (cart) => {
  return async (dispatch) => {
    console.log(cart)
    instance.post('/apis/youshan-m/cart/delCart', { id: cart.id }).then((val) => {
      if (val.data.success) {
        dispatch(REMOVE_CART(cart.pid))
        dispatch(RESET_TOTAL_AMOUNT())
      }
    })
  };
};
export const adjustQty = (product, count, cartOb) => {
  return async (dispatch) => {
    if (product) {
      const key = "PID" + product.pid
      let cart = {}
      if (cartOb[key]) {
        // if (count <= 0) {
        //   return removeFromCart(cartOb[key])
        // }
        cart = {
          id: cartOb[key]["id"],
          pid: cartOb[key]["pid"],
          count,
        }
      } else {
        cart = {
          pid: product.pid,
          count,
        }
      }
      // 这个是存数据的请求
      instance.post('/apis/youshan-m/cart/updateCart', cart).then((val) => {
        if (val.data.success) {
          let cartR = {
            "id": val.data.results.id,
            "pid": product.pid,
            "pident": "",
            "image": product.image,
            "title": product.title,
            "price": product.price,
            "count": count,
            "total": product.price * count,
            "category": product.category
          }
          dispatch(ADD_CART(cartR, key))
          dispatch(RESET_TOTAL_AMOUNT())
        }
      })
    }
  };
};
export const getCart = () => {
  return async (dispatch) => {
    instance.post('/apis/youshan-m/cart/getCart').then((val) => {
      console.log(val)
      if (val.data.success) {
        val = val.data.results
        val.forEach(element => {
          dispatch(ADD_CART(element, "PID" + element.pid))
        });
        dispatch(RESET_TOTAL_AMOUNT())
      }
    })
  };
};
