import "./index.less"
import backW from '../../assets/imgs/details/back-w.svg'
import { useEffect, useState, useRef } from "react"
import { useParams } from 'react-router-dom';
import { dictionarySelector, getOrderState } from "../../redux/common/dictionary"
import { useSelector, useDispatch } from "react-redux";
import instance from "../../service/request"
import { Radio, Button, Input, Modal } from "antd"
import { ExclamationCircleFilled } from '@ant-design/icons';
const Payment = () => {
  const renderRef = useRef(true); // 防止useEffect执行两次
  const dispatch = useDispatch()
  const [para] = useState(useParams());
  const { orderState } = useSelector(dictionarySelector)
  const [orderInfo, setOrderInfo] = useState({});
  const [payment, setPayment] = useState();
  const [pay, setPay] = useState()
  const { confirm } = Modal;
  const [ordernumber, setOrdernumber] = useState("");
  const [memo, setMemo] = useState("");
  const changeordernumber = (e) => {
    setOrdernumber(e.target.value)
  }
  const changeMemo = (e) => {
    setMemo(e.target.value)
  }
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    getOrder(para.id)
  }, [para.id, dispatch])
  const getOrder = (id) => {
    dispatch(getOrderState())
    instance.post("/apis/youshan-m/merchantorder/getOrderById", { id }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        setOrderInfo(val)
        setPay(Number(val.pay))
      } else {
        console.log(val);
        window.location.href = "/#/"
      }
    })
  }
  useEffect(() => {
    if (orderInfo?.status === 0) {
      instance.post("/apis/youshan-m/payment/getAllPayment").then((val) => {
        if (val.data.success) {
          val = val.data.results
          const rs = val.reduce((acc, ele) => {
            acc[ele.value] = ele
            return acc
          }, {})
          setPayment(rs)
          console.log(rs)
        }
      })
    }
  }, [orderInfo])
  const onChangePay = (e) => {
    console.log(e.target.value);
    setPay(e.target.value)
  }
  const submit = () => {
    let data = JSON.parse(JSON.stringify(orderInfo));
    data.status = 1
    data.ordernumber = ordernumber
    data.memo = memo
    data.pay = pay
    instance.post("/apis/youshan-m/merchantorder/updateOrderById", data).then((val) => {
      if (val.data.success) {
        console.log("success")
        getOrder(data.id)
      }
    })
  }
  const confirms = () => {
    if (payment[pay].image !== "" && ordernumber === "") {
      confirm({
        title: '提醒',
        icon: <ExclamationCircleFilled />,
        content: '输入交易订单号, 我们会更快的为您发货',
        onOk() {
          submit()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      submit()
    }

  }
  return (
    <div className='Payment-box'>
      <div className='PM-header'>
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>{orderState[orderInfo?.status]}</p>
      </div>
      <div className='PM-body'>
        {payment && orderInfo?.status === 0 ?
          <div>
            {payment[Number(pay)].image !== "" ?
              <img src={payment[Number(pay)].image} alt="" ></img> :
              ""}
            <div>
              <Radio.Group value={pay.toString()} onChange={onChangePay}>
                {
                  Object.keys(payment).map((key) => (
                    <Radio key={payment[key].id} value={payment[key].value}>{payment[key].title}</Radio>
                  ))
                }
              </Radio.Group>
            </div>

          </div>
          : ""}
        <div>
          <Input className="input" placeholder="请输入交易订单号,好让我们更快的为您发货" value={ordernumber} onChange={changeordernumber} />
          <br />
          <Input className="input" placeholder="备注" value={memo} onChange={changeMemo} />
          <br />
        </div>

        <a className="what" href="/#/whatistradeid">什么是交易订单号？</a>
        {payment && payment[pay].image !== "" ?
          <Button className="button" type="primary" block onClick={() => { confirms() }}>已付款</Button> :
          <Button className="button" type="primary" block>确认</Button>
        }
        <Button className="button1" block>我再想想！</Button>
      </div>
    </div>
  )
}
export default Payment;