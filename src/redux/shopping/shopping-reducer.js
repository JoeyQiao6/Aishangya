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
    }, {
      id: 2,
      img: list2,
      name: '甜辣腐竹150g',
      des: '甜辣',
      price: '410',
    }, {
      id: 3,
      img: list2,
      name: '甜辣鸡爪150g',
      des: '甜辣',
      price: '430',
    }, {
      id: 4,
      img: list1,
      name: '甜辣鸡翅150g',
      des: '甜辣',
      price: '420',
    }, {
      id: 5,
      img: list1,
      name: '甜辣豆腐皮150g',
      des: '甜辣',
      price: '430',
    }, {
      id: 6,
      img: list2,
      name: '甜辣鸭舌150g',
      des: '甜辣',
      price: '450',
    }
  ],//{id,title, descr,price,img}
  cart: [],//{id,title, descr,price,img,qty}
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {};
    case actionTypes.REMOVE_FROM_CART:
      return {};
    case actionTypes.ADJUST_QTY:
      return {};
    case actionTypes.LOAD_CURRENT_ITEM:
      return {};
    default:
      return state;
  }
};

export default shopReducer;