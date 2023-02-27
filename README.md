### 安装步骤
cd D:\project
npm install -g create-react-app
npx create-react-app my-app

## 初始化环境构建
1.项目环境：上面的安装步骤
2.支持Less语法
3.集成网络请求Axios

## 快速生成组件模板快捷键
  rcf
## Less支持的配置
在React脚手架构建的环境中，默认支持的是CSS和Sass/Scss
1.执行命令：npm run eject(创建完直接执行此命令)如果有改动原文件，例如删掉了README.md中的任何一点东西，那么就去根目录中将 .git删掉，然后重新执行命令即可

注意：执行完命令后 如果不能成功运行则删掉 node_modules，然后重新删除

2.安装依赖
npm install -- save-dev less less-loader
3.修改配置文件
const lassRegex = /\.lass$/;
const lassModuleRegex = /\.module\.lass$/;

// config less
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  modules: {
                    mode: 'icss',
                  },
                },
                'less-loader'
              sideEffects: true,
            },
            
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  modules: {
                    mode: 'local',
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'less-loader'
              ),
            }

## 配置网络请求
1.安装依赖
npm install --save axios

2.配置相关文件
import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
})

// 请求拦截器 在发起http请求之前的一些操作
// 1、发送请求之前，加载一些组件
// 2、某些请求需要携带token，如果说没有没有携带，直接跳转到登录页面
instance.interceptors.request.use((config) => {
    console.log('被拦截做的一些操作')
    return config
}, err => {
    return err
})

// 响应拦截器
instance.interceptors.response.use((res) => {
    return res
}, err => {
    if (err && err.response) {
        switch(err.response.status) {
            case 400:
                console.log('请求错误')
                break
            case 401:
                console.log('未认证')
                break
            default:
                console.log('其他信息错误')
        }
    }
})

export default instance

3.还需要配置一个api （但是我还没有找到怎么配置2022.11.28）

## 配置初始化样式
1.新建common.sass，创建好后引入到index.js (森是引入到App.js)
2.引入iconfont（按需引入）
  - 在iconfont中选中想要的icon 下载代码，引入
 
3.引入antd（按需引入）

## 实现首页展示
1.创建页面
2.创建路由
  - 安装依赖：npm install --save react-router-dom
  -配置APP.js文件
3.底部导航
 - 利用 NavLink高亮和跳转路由
  - NavLink 选中状态默认 active

## 添加到购物车思路
1. - 需求：点击添加购物车btn，能够将商品添加的购物车中，并且footer购物车的图标+1

- 分析
 - 既然要将物品添加到另外一个数组中，然后在把他展示出来（购物车页面），那么就一定要有储存点击btn后的状态的地方，即 useState
 const [cart, setCart] = useState([]);

 - 还要考虑到，添加购物车是累计的行为，所以 const addToCart = (product) =>{
  setCart([...cart, product]);
 }
  - ...cart解释：es6的合并多个对象

 - 最后在按钮btn写点击事件，并且将产品传过来。
 onClick={() => addToCart(product)}

2. - 集成Redux，通过它来进行传参，外部状态管理
    - Actions Store Reducers 
    - 安装依赖
    npm install --savr redux
    npm install --save react-redux
    npm install --save-dev redux-devtools-extension
    - 创建Redux流程
     - 创建redux文件夹
     - 创建 cart.js文件
      - import { createSlice } from '@reduxjs/toolkit'
      - const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
          ADD_CART: {
          },
          UPDATE_COUNT_CART: {
          },
          REMOVE_CART: {
          },
          RESET_TOTAL_AMOUNT: (state, { payload }) => {
        },
      })
      export default cartSlice.reducer
     - 创建 store.js文件
       import { configureStore } from '@reduxjs/toolkit';
       import cartReducer from './shopping/cart';
       
       const store = configureStore({
         reducer: {
           cart: cartReducer
         },
       });
     - 设置index.js文件
       import { Provider } from 'react-redux';
       import store from './redux/store'
       <Provider store={store}>
         <App />
       </Provider>
