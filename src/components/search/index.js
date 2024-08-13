import './index.less';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_SEARCHITEM } from '../../redux/commodity/commodity'
const Search = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const dispatch = useDispatch()
  useEffect(() => {
    // 定义一个延迟执行搜索的函数
    const debounceTimer = setTimeout(() => {
      // 在这里执行搜索操作，例如发送搜索请求并更新 searchResults
      // 这里只是一个示例，实际操作可能需要调用后端API等
      dispatch(SET_SEARCHITEM(searchResults));
    }, 500); // 设置延迟时间，单位为毫秒，可以根据需要调整

    // 当用户继续输入时，清除之前的延迟计时器
    return () => clearTimeout(debounceTimer);
  }, [searchResults, dispatch]);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchResults(newSearchTerm)
  };
  return (
    <div className='search-box'>
      <i className='iconfont icon-search'></i>
      <input placeholder='鸭脖' placeholder-class="placeholder" value={searchResults}
        onChange={handleInputChange}></input>
    </div>
  )
}
export default Search;