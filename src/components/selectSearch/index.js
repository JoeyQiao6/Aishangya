import { Select } from 'antd';
import { useState } from 'react';
import instance from '../../service/request';
let timeout;
let currentValue;
const fetch = (url, value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = () => {
    instance.post(url, value).then((val) => {
      //val是后端返回来的数据
      if (val.data.success) {
        callback(val.data.results);
      }
    })
  };
  timeout = setTimeout(fake, 300);
};
const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const handleSearch = (newValue) => {
    if (newValue) {
      fetch(props.url, newValue, setData);
    } else {
      setData([]);
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d[props.item],
        label: d[props.item],
      }))}
    />
  );
};
export default SearchInput;