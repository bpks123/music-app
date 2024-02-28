import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Registar'
import Library from './pages/Library'
import Navbar from './components/Navbar'


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/library' element={<Library/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
