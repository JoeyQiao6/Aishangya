
import { useEffect, useRef } from "react"
const PaymentWhat = () => {
  const renderRef = useRef(true); // 防止useEffect执行两次

  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    // instance.post("/apis/youshan-m/merchantorder/getOrderById", { id: para.id }).then((val) => {
    //   if (val.data.success) {
    //     val = val.data.results
    //     setOrderInfo(val)
    //     setPay(Number(val.pay))
    //   }
    // })
  }, [])
  return (
    <div className='Payment-box'>
      what
    </div>
  )
}
export default PaymentWhat;