import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import UpdateProfile from './components/User/UpdateProfile/UpdateProfile';
import User from './components/User/User';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/user' element={<User></User>} />
        <Route path='/users/:id' element={<UpdateProfile></UpdateProfile>} />
      </Routes>
    </div>
  );
}

export default App;
