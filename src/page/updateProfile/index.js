import React, { useEffect } from "react";
import "./index.less";
import backW from "../../assets/imgs/details/back-w.svg";
import { Formik } from "formik";
import { Stack, TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const negative = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="updateProfile_page">
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
      <div className="updateProfile_list"></div>
      <Formik
        initialValues={{ name: "",nickname: "",Emailpassword: "", tel: "", phone: "", reallyName : "", wechat: "", tip: "",}}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string().required("请输入用户名"),
          phone: Yup.string().required("请输入手机号"),
        })}
        // onSubmit={}
      >
        {({ values, handleSubmit, handleChange, touched, errors }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="用户名"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                fullWidth
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="昵称"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                fullWidth
                
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="邮箱"
                name="Email"
                value={values.Email}
                onChange={handleChange}
                fullWidth
              
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="密码"
                name="password"
                value={values.password}
                onChange={handleChange}
                fullWidth
              
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="电话"
                name="tel"
                value={values.tel}
                onChange={handleChange}
                fullWidth
          
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="手机"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                required
                fullWidth
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="姓名"
                name="reallyName"
                value={values.reallyName}
                onChange={handleChange}
                fullWidth
            
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="微信"
                name="wechat"
                value={values.wechat}
                onChange={handleChange}
                fullWidth
           
              />
            </Stack>
            <Stack sx={{ mb: 3, color: "white" }}>
              <TextField
                label="备注"
                name="tip"
                value={values.tip}
                onChange={handleChange}
                fullWidth
              
              />
            </Stack>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  negative("/profile");
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
  );
};

export default UpdateProfile;
