import "./index.less"
import { useEffect, useState } from 'react';
import backW from '../../assets/imgs/details/back-w.svg'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
const AddressInfo = (addInfo) => {
  useEffect(() => {
    console.log(addInfo)
  }, [])
  const ariaLabel = { 'aria-label': 'description' };
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off">
      <div className="address-back">
        <img src={backW} alt=""></img>
        <p>编辑收获地址</p>
      </div>
      <div className="address-info">
        <div >
          <TextField id="demo-helper-text-misaligned-no-helper" label="邮政编码" />
        </div>
        <div >
          <TextField
            select
            label="辖区"
            defaultValue="EUR"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField
            select
            label="市区"
            defaultValue="EUR"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField
            select
            label="町村"
            defaultValue="EUR"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div >
          <TextField id="demo-helper-text-misaligned-no-helper" label="丁目・番地・号（半角数字)" />
        </div>
        <div >
          <TextField id="demo-helper-text-misaligned-no-helper" label="公寓名称或公司名称" />
        </div>
        <div >
          <TextField id="demo-helper-text-misaligned-no-helper" label="房间号码" />
        </div>
      </div>
      <div className='create-button-div'>
        <button className='create-button' onClick={() => { }}>保存</button>
      </div>
    </Box>
  );
}

export default AddressInfo;