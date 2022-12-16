import './index.less';
import avatar from "../../assets/imgs/profile/avatar.jpg";
import logo from "../../assets/imgs/profile/logo1.png";


const Personal = () => {
  return (
    <div className='personal-box'>
      <div className='personal-avatar'>
        <img src={avatar}></img>
        <div className='personal-name'>
          <p>JOEY</p>
          <p>+8107015120606</p>
        </div>
      </div>
      <div className='personal-logo'>
        <img src={logo}></img>
      </div>
    </div>
  )
}
export default Personal;
