import "./index.less"
import { useEffect, useState } from 'react';
import backW from '../../assets/imgs/details/back-w.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import instance from '../../service/request';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const AddressInfo = (addPara) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [errors, setErrors] = useState({});
  const [option, setPotion] = useState([])
  const [def, setDef] = useState(false)
  const validate = () => {
    const errors = {};
    if (form?.postcode.length < 7) {
      errors.postcode = '邮编不能少于7个字';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const submitvalidate = () => {
    const errors = {};
    if (form?.receive === "" || form?.receive === null) {
      errors.receive = '请输入收货人姓名';
    }
    if (form?.phone === "" || form?.phone === null) {
      errors.phone = '请输入收货人电话';
    }
    if (form?.postcode === null || form?.postcode.length < 7) {
      errors.postcode = '邮编不能少于7个字';
    }
    if (form?.prefecture === "" || form?.prefecture === null) {
      errors.prefecture = '请选择辖区';
    }
    if (form?.city === "" || form?.city === null) {
      errors.city = '请选择市区';
    }
    if (form?.town === "" || form?.town === null) {
      errors.town = '请选择町村';
    }
    if (form?.address === "" || form?.address === null) {
      errors.address = '请输入丁目・番地・号（半角数字)';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    if (addPara.addInfo?.postcode) {
      instance.post('/apis/youshan-m/postcode/selectByParam', {
        page: 1,
        rows: 100,
        //查询条件
        condition: {
          //查询条件
          postcode: addPara.addInfo?.postcode,
        },
        sort: {
          prop: "",
          order: "",
        }
      }).then((val) => {
        //val是后端返回来的数据
        if (val.data.success) {
          val = val.data.results
          setPotion(val)
          setForm(addPara.addInfo)
          setDef(addPara.addInfo?.state === 1)
        }
      })
    }
    const handleKeyboard = () => {
      setKeyboardHeight(window.innerHeight - document.body.clientHeight);
    };
    window.addEventListener('resize', handleKeyboard);
    window.addEventListener('orientationchange', handleKeyboard);
    handleKeyboard();

    return () => {
      window.removeEventListener('resize', handleKeyboard);
      window.removeEventListener('orientationchange', handleKeyboard);
    };
  }, [keyboardHeight, addPara.addInfo]);
  const [form, setForm] = useState({
    id: "",
    receive: "",
    phone: "",
    socialtype: "",
    socialaccount: "",
    postcode: "",
    prefecture: "",
    city: "",
    town: "",
    address: "",
    building: "",
    roomnumber: "",
  })
  const handleChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  const reqPost = (event) => {
    if (validate()) {
      const postPara = {
        page: 1,
        rows: 100,
        //查询条件
        condition: {
          //查询条件
          postcode: form?.postcode,
        },
        sort: {
          prop: "",
          order: "",
        }
      }
      instance.post('/apis/youshan-m/postcode/selectByParam', postPara).then((val) => {
        //val是后端返回来的数据
        if (val.data.success) {
          val = val.data.results
          setPotion(val)
          if (val.length > 0) {
            setForm((prevState) => ({
              ...prevState,
              "prefecture": val[0].prefecture,
              "city": val[0].city,
              "town": val[0].town,
            }));
          }
        }
      })
    }

  }
  const save = (event) => {
    event.preventDefault();
    if (submitvalidate()) {
      instance.post('/apis/youshan-m/merchantaddress/saveAddress', form).then((val) => {
        console.log(val)
        alert("保存成功")
        addPara.setChangePage(true)
        window.history.back()
      })
    }
  }
  const changeDef = () => {
    setForm((prevState) => ({
      ...prevState,
      state: def ? 0 : 1,
    }));
    setDef(!def)
  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off">
      <div className="address-back">
        <img src={backW} alt="" onClick={() => addPara.setChangePage(true)}></img>
        <p>编辑收获地址</p>
      </div>
      <div className="address-info">
        <div >
          <TextField name="receive" label="收货人姓名" value={form?.receive === null ? "" : form?.receive} onChange={handleChange} onBlur={reqPost} error={!!errors.receive}
            helperText={errors.receive} />
        </div>
        <div >
          <TextField name="postcode" label="请先输入邮政编码" value={form?.postcode === null ? "" : form?.postcode} onChange={handleChange} onBlur={reqPost} error={!!errors.postcode}
            helperText={errors.postcode} />
        </div>
        <div >
          <TextField
            name="prefecture"
            select
            label="辖区"
            value={form?.prefecture === null ? "" : form?.prefecture}
            onChange={handleChange}
          >
            {option.map((op) => (
              <MenuItem key={op?.id} value={op?.prefecture}>
                {op?.prefecture}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField
            name="city"
            select
            label="市区"
            value={form?.city === null ? "" : form?.city}
            onChange={handleChange}
          >
            {option.map((op) => (
              <MenuItem key={op?.id} value={op?.city}>
                {op?.city}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField
            name="town"
            select
            label="町村"
            value={form?.town === null ? "" : form?.town}
            onChange={handleChange}
          >
            {option.map((op) => (
              <MenuItem key={op?.id} value={op?.town}>
                {op?.town}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField name="address" value={form?.address === null ? "" : form?.address} label="丁目・番地・号（半角数字)" onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address} />
        </div>
        <div >
          <TextField name="building" value={form?.building === null ? "" : form?.building} label="公寓名称或公司名称" onChange={handleChange} />
        </div>
        <div >
          <TextField name="roomnumber" value={form?.roomnumber === null ? "" : form?.roomnumber} label="房间号码" onChange={handleChange} />
        </div>
        <div >
          <TextField name="phone" value={form?.phone === null ? "" : form?.phone} label="电话" error={!!errors.phone}
            helperText={errors.phone} onChange={handleChange} />
        </div>
        <div >
          <TextField
            name="socialtype"
            select
            label="社交APP"
            value={form?.socialtype === null ? "" : form?.socialtype}
            onChange={handleChange}
          >
            {addPara.socialType.map((op) => (
              <MenuItem key={op?.id} value={op?.value}>
                {op?.display}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField name="socialaccount" value={form?.socialaccount === null ? "" : form?.socialaccount} label="社交账号" onChange={handleChange} />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox checked={def} onChange={changeDef} name="default" />
            }
            label="设置为默认地址"
          />
        </div>
      </div>
      <div className='create-button-div'>
        <button className='create-button' onClick={save}>保存</button>
      </div>
    </Box>
  );
}

export default AddressInfo;