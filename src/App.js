import './App.css';
import {BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Registar'
import Library from './pages/Library'
import Navbar from './components/Navbar'
import Social from './pages/Social';
import { useStateProvider } from './Utils/StateProvider';
import { useEffect } from 'react';

function App() {
  const [{token}]=useStateProvider()
  // console.log(token)
  //The below function is protected routing
  function ProtectedRoute({children}){
    if(token){
      return children
    }
    else{
      alert("Please login see library")
      return <Navigate to="/login"/>
    }
  }

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/library' element={<ProtectedRoute>
          <Library/>
        </ProtectedRoute>}/>
        <Route path='/social' element={<Social/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
