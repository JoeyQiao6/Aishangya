import * as actionTypes from './shopping-types';
import list1 from '../../assets/imgs/home/list1.png'
import list2 from '../../assets/imgs/home/list2.png'

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      img: list1,
      name: '甜辣鸭脖150g',
      des: '甜辣',
      price: '440',
      desTitle:'甜辣腐竹 【爱尚鸭】',
      weight:'150g',
      storageMethod:'放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射',
      time:'14天'

    }, {
      id: 2,
      img: list2,
      name: '甜辣腐竹150g',
      des: '甜辣',
      price: '410',
      desTitle:'甜辣腐竹 【爱尚鸭】',
      weight:'150g',
      storageMethod:'放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射',
      time:'14天'
    }, {
      id: 3,
      img: list2,
      name: '甜辣鸡爪150g',
      des: '甜辣',
      price: '430',
      desTitle:'甜辣鸡爪 【爱尚鸭】',
      weight:'150g',
      storageMethod:'放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射',
      time:'10天'
    }, {
      id: 4,
      img: list1,
      name: '甜辣鸡翅150g',
      des: '甜辣',
      price: '420',
      desTitle:'甜辣鸡翅 【爱尚鸭】',
      weight:'150g',
      storageMethod:'放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射',
      time:'11天'
    }, {
      id: 5,
      img: list1,
      name: '甜辣豆腐皮150g',
      des: '甜辣',
      price: '430',
      desTitle:'甜辣豆腐皮 【爱尚鸭】',
      weight:'150g',
      storageMethod:'放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射',
      time:'12天'
    }, {
      id: 6,
      img: list2,
      name: '甜辣鸭舌150g',
      des: '甜辣',
      price: '450',
      desTitle:'甜辣鸭舌 【爱尚鸭】',
      weight:'150g',
      storageMethod:'放在阴凉避光凉爽的地方，避免高温、潮湿及阳光直射',
      time:'13天'
    }
  ],//{id,title, descr,price,img}
  cart: [],//{id,title, descr,price,img,qty}
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      //get the items data from the products array
      const item = state.products.find(prod => prod.id === action.payload.id);
      //check if item is in cart already

      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false);
      return {
        ...state,
        cart: inCart ?
          state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item)
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
          //+作用：將這個數轉換為整數 
            ? { ...item, qty: +action.payload.qty }
            : item)
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;