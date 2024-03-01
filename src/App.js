import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Registar'
import Library from './pages/Library'
import Navbar from './components/Navbar'
import Social from './pages/Social';
import { StateProvider} from './Utils/StateProvider';
import reducer,{initialState} from './Utils/reducer';

function App() {
  return (
    <>
    <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/library' element={<Library/>}/>
        <Route path='/social' element={<Social/>}/>
      </Routes>
    </Router>
    </StateProvider>
    </>
  );
}

export default App;
