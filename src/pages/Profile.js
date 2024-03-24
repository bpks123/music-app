import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../Utils/StateProvider'
import './Profile.css'
export default function Profile() {
  const [{userName,istoggle,userEmail}]=useStateProvider()
  const [getheight,setHeight]=useState(window.innerHeight-80)
  
  return (
    <>
    <div className='global-container' style={{minHeight:getheight+'px',backgroundColor:istoggle?'rgb(34, 33, 33)':''}}>
      <h1 style={{textAlign:'center',paddingTop:'4%', color:istoggle?'white':''}}>............Your Profile............</h1>
      <div className={`profile-container ${istoggle?'toggle-mode':''}`}> 
          <h1>Name: {userName}</h1>
          <h2>Email: {userEmail}</h2>
      </div>
    </div>
    </>
  )
}
