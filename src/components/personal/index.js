import './index.less';
import logo from "../../assets/imgs/logo/logo3.png";
import { profileSelector } from "../../redux/profile/profile"
import { useSelector } from 'react-redux';
const Personal = () => {
  const { profile } = useSelector(profileSelector)
  console.log(profile);
  return (
    <div className='personal-box'>
      <div className='personal-avatar'>
        <img src={logo} alt="" style={{ objectFit: "cover" }}></img>
        <div className='personal-name'>
          <p>{profile.unick} (账户余额：{profile.money})</p>
          <p>{profile.mobile}</p>
        </div>
      </div>

    </div>
  )
}
export default Personal;
