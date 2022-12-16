import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import "./common.sass";
import Home from './page/home';
import Profile from './page/profile';
import Shop from './page/shop';
import Mall from './page/mall';
import Detail from './page/details';
import store from './components/menulist/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} ></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/mall' element={<Mall />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
          <Route path='/details' element={<Detail />}></Route>
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
