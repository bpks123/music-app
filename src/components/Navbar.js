import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useStateProvider} from '../Utils/StateProvider'
export default function Navbar() {
  const navigate=useNavigate()
  const [{token,userName},dispatch]=useStateProvider()

const onHandlerSignOut=()=>{
  dispatch({type:'SET_TOKEN',payload:null})
  dispatch({type:'SET_NAME',payload:null})
  navigate('/')
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{padding:'20px'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/'}><i className="fa-solid fa-music"></i><span className='icon-music'>Music</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-items">
        <li className="nav-item">
          <div className='d-flex justify-content-center align-items-center' onClick={()=>navigate('/')}>
            <i className="fa-solid fa-house" style={{fontSize:'14px'}}></i>
            <a className="nav-link active" aria-current="page" href="#" style={{fontWeight:'700'}}>Home</a>        
          </div>
        </li>
        <li className="nav-item">
          <div  className='d-flex justify-content-center align-items-center' onClick={()=>navigate('/social')}>
            <i className="fa-solid fa-share-from-square" style={{fontSize:'14px'}}></i>
            <a className="nav-link active" aria-current="page" href="#" style={{fontWeight:'700'}}>Social</a>
          </div>
        </li>
        <li className="nav-item">
          <div className='d-flex justify-content-center align-items-center' onClick={()=>navigate('/library')}>
          <i className="fa-solid fa-headphones" style={{fontSize:'14px'}}></i>
          <a className="nav-link active" aria-current="page" href="#" style={{fontWeight:'700'}}>Library</a>
          </div>
        </li>
        
        {/* Add more If required */}
      </ul>
      <div className="d-flex justify-content-center align-items-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <i className="fa-solid fa-magnifying-glass search-hover"
          style={{
            border:"1px solid grey",
            padding:"5px",
            borderRadius:'5px',
            marginLeft:'-4px'
          }}
        ></i>
      </div>
      {token ? (
        <ul className="navbar-nav">
        <li className="nav-item dropdown left-nav">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-regular fa-circle-user" style={{fontSize:'20px'}}></i>
            <span>&nbsp;{userName}</span>
            </a>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={onHandlerSignOut}>Sign Out</button></li>
            </ul>
          </li>
  
        </ul>
      ):(<ul className="navbar-nav">
      <li className="nav-item dropdown left-nav">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-regular fa-circle-user" style={{fontSize:'20px'}}></i>
          <span>&nbsp;{userName}</span>
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to='/login'>Login</Link></li>
            <li><Link className="dropdown-item" to="/register">Register</Link></li>
          </ul>
        </li>

      </ul>)
      }
      
      
    </div>
  </div>
</nav>
    </>
  )
}
