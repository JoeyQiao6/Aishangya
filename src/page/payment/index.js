import "./index.less"
import backW from '../../assets/imgs/details/back-w.svg'
import { useEffect, useState, useRef, useCallback } from "react"
import { useParams } from 'react-router-dom';
import { dictionarySelector, getOrderState } from "../../redux/common/dictionary"
import { useSelector, useDispatch } from "react-redux";
import instance from "../../service/request"
import { Button, Input, Modal } from "antd"
import { ImageViewer, Dialog } from 'antd-mobile'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
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
  const [imgVisible, setImgVisible] = useState(false);
  const changeordernumber = (e) => {
    setOrdernumber(e.target.value)
  }
  const changeMemo = (e) => {
    setMemo(e.target.value)
  }

  const getOrder = useCallback((id) => {
    dispatch(getOrderState())
    instance.post("/apis/youshan-m/merchantorder/getOrderById", { id }).then((val) => {
      if (val.data.success) {
        val = val.data.results
        setOrderInfo(val)
        setPay(Number(val.pay))
        console.log(val.pay);
      } else {
        window.location.href = "/#/"
      }
    })
  }, [dispatch]);
  useEffect(() => {
    // if (renderRef.current) {
    //   // 防止useEffect执行两次
    //   renderRef.current = false
    //   return
    // }
    getOrder(para.id)
  }, [para.id, dispatch, getOrder])

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

          console.log(rs);
        }
      })
    }
  }, [orderInfo])
  const onChangePay = (e) => {
    setPay(e.target.value)
  }
  const submit = () => {
    let data = JSON.parse(JSON.stringify(orderInfo));
    data.status = pay === 3 ? 4 : 1
    data.ordernumber = ordernumber
    data.memo = memo
    data.pay = pay
    instance.post("/apis/youshan-m/merchantorder/updateOrderById", data).then((val) => {
      if (val.data.success) {
        Dialog.alert({
          content: '已提交，我们会尽快为您发货',
          onConfirm: () => {
            getOrder(data.id)
            window.location.href = "/#/orderCard";
          },
        })
      }
    })
  }
  const confirms = () => {
    console.log("confirms");
    confirm({
      title: '提醒',
      icon: <ExclamationCircleFilled />,
      content: '非常感谢🙏, 我们尽快的为您发货',
      onOk() {
        submit()
      },
      onCancel() {
      },
    });

  }
  return (
    <div className='Payment-box'>
      <div className='PM-header'>
        <img src={backW} alt="" onClick={() => { window.history.back() }}></img>
        <p>{orderState[orderInfo?.status]}</p>
      </div>
      {payment && orderInfo?.status === 0 ?
        <div className='PM-body'>

          <div>
            {payment[Number(pay)].image !== "" ?
              <img src={payment[Number(pay)].image} alt="" ></img> :
              ""}
            <FormControl variant="standard" sx={{ mb: 3, minWidth: '100%' }}>
              <InputLabel id="demo-simple-select-standard-label">支付方式</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={payment[pay].value}
                onChange={onChangePay}
                label="支付方式"
              >
                {
                  Object.keys(payment).map((key) => (
                    <MenuItem key={payment[key].id} value={payment[key].value}>{payment[key].title}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>

          <div>
            {/* {payment && payment[pay].demomemo.length > 0 ? <Input className="input" placeholder={"请输入" + payment[pay].demomemo + ",好让我们更快的为您发货"} value={ordernumber} onChange={changeordernumber} /> : ""}
            <br /> */}
            <Input className="input" placeholder="备注" value={memo} onChange={changeMemo} />
            <br />
          </div>
          {/* {payment && payment[pay].demoimage.length > 0 ? <a href="#" className="what" onClick={() => { setImgVisible(true) }}>什么是{payment[pay].demomemo}？</a> : ""} */}

          {payment && payment[pay].image !== "" ?
            <Button className="button" type="primary" block onClick={() => { confirms() }} style={{ "backgroundColor": "#ff650b" }}>已付款</Button> :
            <Button className="button" type="primary" block onClick={() => { confirms() }}>确认</Button>
          }
          <Button className="button1" block>我再想想！</Button>
          {(payment && payment[pay].demoimage !== "") &&
            <ImageViewer
              image={payment[pay].demoimage}
              visible={imgVisible}
              onClose={() => {
                setImgVisible(false)
              }}
            />
          }
        </div>
        : ""}
    </div >
  )
}
export default Payment;