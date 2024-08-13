import React, { useEffect, useState } from "react";
import "./index.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { Formik } from "formik";
import { Stack, TextField, Button, OutlinedInput, InputAdornment, IconButton, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { profileSelector, saveProfile } from "../../redux/profile/profile";
import { Popup } from 'antd-mobile';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import instance from '../../service/request';
import { message } from "antd";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector(profileSelector);
  const [socialType, setSocialType] = useState([]);
  const [initialValues, setInitialValues] = useState({
    uname: "",
    upass: "",
    unick: "",
    phone: "",
    name: "",
    wechat: "",
    memo: "",
    socialtype: "",
    zip: "",
  });
  const [visible, setVisible] = useState(false);
  const [upassConfirm, setUpassConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log(profile);
    setInitialValues({
      ...initialValues,
      ...profile
    });
    if (socialType.length === 0) {
      instance.post('/apis/common/dictionary/queryByGroupIds', ["social_type"]).then((val) => {
        if (val.status === 200) {
          setSocialType(val.data.social_type);
        }
      });
    }
  }, [profile, socialType]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const submit = (val) => {
    setInitialValues(val);
    if (val.upass !== "") {
      setUpassConfirm("");
      setVisible(true);
    } else {
      update(val);
    }
  };

  const confirmPsw = () => {
    if (upassConfirm !== initialValues.upass) {
      messageApi.open({
        type: 'error',
        content: '确认密码必须与密码相同',
      });
    } else {
      update(initialValues);
      setVisible(false);
    }
  };

  const update = (val) => {
    dispatch(saveProfile(val));
    messageApi.open({
      type: 'success',
      content: '保存成功',
    });
  };

  const handlePasswordConfirmChange = (event) => {
    setUpassConfirm(event.target.value);
  };

  const EndAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  const pageHeight = document.documentElement.scrollHeight - 34 - 50 - 30;

  return (
    <div className="updateProfile_page">
      {contextHolder}
      <div className="updateProfile_name">
        <img
          src={backW}
          alt=""
          onClick={() => {
            window.history.back();
          }}
        />
        <p>修改个人中心</p>
      </div>
      <div style={{ height: pageHeight, overflowY: "auto", padding: "10px" }}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={Yup.object().shape({
            uname: Yup.string().required("请输入用户名"),
            name: Yup.string().required("请输入姓名"),
            phone: Yup.string().required("请输入联系电话"),
            wechat: Yup.string().required("请输入微信"),
            unick: Yup.string().required("请输入商家名称"),
            upass: Yup.lazy((value) => {
              if (value && value.length > 0) {
                return Yup.string()
                  .min(6, '密码长度至少为6个字符')
                  .required('请输入密码');
              }
              return Yup.string();
            }),
          })}
          onSubmit={(val) => submit(val)}
        >
          {({ values, handleSubmit, handleChange, touched, errors }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="用户名"
                  name="uname"
                  value={values.uname}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  autoComplete="username"
                />
              </Stack>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="密码"
                  name="upass"
                  type='password'
                  value={values.upass || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.upass && errors.upass)}
                  helperText={touched.upass && errors.upass}
                  autoComplete="new-password"
                />
              </Stack>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="商家名称"
                  name="unick"
                  value={values.unick || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="电话"
                  name="phone"
                  value={values.phone || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Stack>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="姓名"
                  name="name"
                  value={values.name || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="邮编"
                  name="zip"
                  value={values.zip || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>
              <FormControl sx={{ mb: 3, color: "white", minWidth: '100%' }} size="small">
                <InputLabel id="socialtype-label">社交APP</InputLabel>
                <Select
                  labelId="socialtype-label"
                  value={values.socialtype}
                  onChange={handleChange}
                  name="socialtype"
                  fullWidth
                  input={<OutlinedInput label="社交APP" />}
                >
                  {socialType.map((op) => (
                    <MenuItem key={op.id} value={op.value}>
                      {op.display}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="社交账号"
                  name="wechat"
                  value={values.wechat || ''}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.wechat && errors.wechat)}
                  helperText={touched.wechat && errors.wechat}
                />
              </Stack>
              <Stack sx={{ mb: 3, color: "white" }}>
                <TextField
                  label="备注"
                  name="memo"
                  value={values.memo || ''}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>
              <Stack direction="row" spacing={3} justifyContent="center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  取消
                </Button>
                <Button variant="contained" type="submit">
                  确认
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </div>
      <div>
        <Popup
          visible={visible}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '30vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(38 28 28 / 94%)',
          }}
          onMaskClick={() => {
            setVisible(false);
          }}
          onClose={() => {
            setVisible(false);
          }}
        >
          <div className="shop-count">
            <div style={{ paddingTop: '10px' }}>
              <div>
                <Stack sx={{ mb: 3, color: "white" }}>
                  <InputLabel sx={{ color: 'white' }} htmlFor="outlined-adornment-password">密码确认</InputLabel>
                  <OutlinedInput
                    value={upassConfirm}
                    onChange={handlePasswordConfirmChange}
                    sx={{ color: 'white' }}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={<EndAdornment />}
                    label="Password"
                  />
                </Stack>
              </div>
              <Button variant="contained" style={{ float: 'left' }} onClick={confirmPsw}>确定</Button>
              <Button variant="outlined"
                style={{ float: 'right' }} onClick={() => {
                  setUpassConfirm("");
                  setVisible(false);
                }}>取消</Button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default UpdateProfile;
