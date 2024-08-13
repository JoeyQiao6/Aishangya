import { createSlice } from '@reduxjs/toolkit'
import instance from '../../service/request';

//初始状态
const initialState = {
  profile: {
    uname: "",
    upass: "", // Provide initial values for all form elements
    unick: "",
    phone: "",
    name: "",
    wechat: "",
    memo: "",
    socialtype: "",
    zip: "",
    address: "",
    money: 0
  },
  profileState: true
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SET_PROFILE: (state, { payload }) => {
      payload.upass = ""
      state.profile = payload
    },
    SET_PROFILESTATE(state, { payload }) {
      state.profileState = payload
    },
  },
})

export default profileSlice.reducer
export const { SET_PROFILE, SET_PROFILESTATE } = profileSlice.actions
export const profileSelector = (state) => state.profile;

export const getUserInfo = () => {
  return async (dispatch) => {
    dispatch(SET_PROFILESTATE(false))
    instance.post('/apis/youshan-m/merchantuser/getUserInfo').then((val) => {
      dispatch(SET_PROFILESTATE(true))
      if (val.data.success) {
        dispatch(SET_PROFILE(val.data.results))
      }
    })
  };
}

export const saveProfile = (data) => {
  return async (dispatch) => {
    dispatch(SET_PROFILESTATE(false))
    instance.post('/apis/youshan-m/merchantuser/updateUserInfo', data).then((val) => {
      dispatch(SET_PROFILESTATE(true))
      if (val.data.success) {
        data = Object.assign({}, data)
        dispatch(SET_PROFILE(data))
      }
    })
  };
}