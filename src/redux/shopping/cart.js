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
    //添加商品 ADD_CART
    // ADD_CART 接收三个参数，分别是商品信息、商品数量和操作类型。它会将商品信息添加到购物车中，如果已经存在相同的商品，则更新商品数量。最后它会根据操作类型计算运费。

    // 在 payload 中，包含了要加入购物车的商品 product、商品数量 count 和一个用于标识 action 类型的 type。

    // 该 reducer 的主要功能是将商品添加到购物车中。如果 state 中已经存在这个商品，则只需更新商品的数量和总价，否则需要创建一个新的购物车条目。在这两种情况下，该 reducer 都会更新 state 中的 cart 属性。此外，如果 payload 中的 type 不是 "init"，则还会将 cart 发送到服务器以更新购物车。

    // 具体而言，该 reducer 的主要执行过程如下：

    // 通过 payload.product.id 构造购物车中商品的 key（key 以 "PID" 为前缀）。
    // 检查当前购物车中是否已经存在该商品。如果是，则更新购物车中该商品的数量和总价；如果不是，则创建一个新的购物车条目。
    // 如果 payload.type 不是 "init"，则发送购物车数据到服务器进行更新。
    // 最后，更新 state 中的 cart 属性。
    // 注意，这段代码中有一些被注释掉的部分，这些代码可能与将购物车发送到服务器相关。 

    //payload是调用ADD_CART时传来的参数，所以这个里面是可以有好几个参数 或者是对象。
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