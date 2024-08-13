// const Addresslist = ({ productData }) => {

//   const navigate = useNavigate()
//   // 定义一个名为 addToCart 的函数。该函数接受一个参数，表示要添加到购物车中的商品。函数内部，使用 spread 操作符（...）将购物车数组展开，然后将要添加的商品添加到数组的末尾。最后，它使用 setCart 函数来更新购物车的状态。
//   const dispatch = useDispatch();

//   return (
//     <>
//       <div className='list'>
//         <div className='list-img' onClick={() => {
//           navigate(`/details/${productData.id}`)
//         }}>
//           <img src={productData.image} alt=""></img>
//           <div className='like-box'>
//             <img src={unlike} alt=""></img>
//           </div>
//         </div>
//         <div className='list-content-box'>
//           <div className='list-content'>
//             <p className='list-name'>{productData.name}</p>
//             <p>￥{productData.price}</p>
//           </div>
//           <div className='list-add' onClick={() => dispatch(addToCart(productData, 1))}>
//             <img src={add} alt=""></img>
//           </div>
//         </div>
//       </div>
//     </>
//   )
//   //發送函數

// }

// export default connect()(Addresslist);