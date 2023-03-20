import React from 'react';
import './index.less';
import { connect } from 'react-redux';
import morethen from '../../../assets/imgs/profile/morethen.png';
const Item = (data) => {
  return (
    Object.keys(data.itemData).map((key, index) => (
      <div className="address-list-box" key={index} onClick={() => data.selectItem(data.itemData[key])}>
        <div className="address-des">
          <div className="address-title">
            <p>{data.itemData[key].receive}</p>
          </div>
          <p></p>
          <p>{data.itemData[key].postcode} {data.itemData[key].prefecture} {data.itemData[key].city} {data.itemData[key].town} {data.itemData[key].address}</p>
          <p> {data.itemData[key].roomnumber} {data.itemData[key].building}</p>
        </div>
        <img src={morethen} alt="" />
      </div>
    ))

  );
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(null, mapDispatchToProps)(Item);
