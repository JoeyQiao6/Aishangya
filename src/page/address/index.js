import "./index.less"
import backW from '../../assets/imgs/details/back-w.svg'
import Footer from '../../components/footer';
import Item from "./item"
import { useState } from 'react';
import AddressInfo from "./addressInfo";
const Address = () => {
  const [addList, setAddList] = useState([{ title: "asdasd", desc: "asdasdad" }, { title: "asdasd", desc: "asdasdad" }])
  const [changePage, setChangePage] = useState(true)
  return (
    <div className="address-box" >

      {!changePage ? <>
        <div className="address-back">
          <img src={backW} alt=""></img>
          <p>选择收获地址</p>
        </div>
        {
          addList.length > 0 ? Object.keys(addList).map((key, index) => (
            <Item key={index} itemData={addList[key]} />
          )) : <div className="nodata"><span>暂无地址，请添加</span></div>
        }
        <div className='create-button-div'>
          <button className='create-button' onClick={() => { setChangePage(false) }}>添加收获地址</button>
        </div> </> : <AddressInfo addInfo={addList[0]}></AddressInfo>
      }
      <Footer />
    </div >
  );
}

export default Address;