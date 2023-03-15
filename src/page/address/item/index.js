import React from 'react';
import './index.less';
import { connect, useDispatch } from 'react-redux';
import morethen from '../../../assets/imgs/profile/morethen.png';
const Item = ({ itemData }) => {
  const dispatch = useDispatch()

  return (
    <div className="address-list-box">
      <div className="address-des">
        <div className="address-title">
          <p>{itemData.title}</p>
        </div>
        <p></p>
        <p>{itemData.desc}</p>
      </div>
      <img src={morethen} />
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(null, mapDispatchToProps)(Item);
