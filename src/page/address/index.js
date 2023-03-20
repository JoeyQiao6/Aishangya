import "./index.less"
import backW from '../../assets/imgs/details/back-w.svg'
import Footer from '../../components/footer';
import Item from "./item"
import { useState, useEffect, useRef } from 'react';
import AddressInfo from "./addressInfo";
import instance from '../../service/request';
const Address = () => {
  const [addList, setAddList] = useState([])
  const [socialType, setSocialType] = useState([])
  const [changePage, setChangePage] = useState(true)
  const [addInfo, setAddInfo] = useState({})
  const renderRef = useRef(true); // 防止useEffect执行两次
  const initAdd = () => {
    instance.post('/apis/youshan-m/merchantaddress/queryByUname').then((val) => {
      if (val.data.success) {
        setAddList(val.data.results)
      }
    })
  }
  useEffect(() => {
    if (renderRef.current) {
      // 防止useEffect执行两次
      renderRef.current = false
      return
    }
    instance.post('/apis/common/dictionary/queryByGroupIds', ["social_type"]).then((val) => {
      if (val.status === 200) {
        setSocialType(val.data.social_type)
      }
    })
    if (changePage) {
      initAdd()
    }
  }, [changePage])
  const selectItem = (val) => {
    console.log(val);
    setAddInfo(val)
    setChangePage(false)
  }
  const createAddress = () => {
    setChangePage(false)
    setAddInfo({})
  }
  return (
    <div className="address-box" >

      {changePage ? <>
        <div className="address-back" >
          <a href="/#/profile"><img src={backW} alt="" ></img></a>

          <p>选择收获地址</p>
        </div>
        {
          addList.length > 0 ?
            <Item itemData={addList} selectItem={selectItem} />
            : <div className="nodata"><span>暂无地址，请添加</span></div>
        }
        <div className='create-button-div'>
          <button className='create-button' onClick={() => { createAddress() }}>添加收获地址</button>
        </div> </> : <AddressInfo addInfo={addInfo} socialType={socialType} setChangePage={setChangePage} ></AddressInfo>
      }
      <Footer />
    </div >
  );
}

export default Address;