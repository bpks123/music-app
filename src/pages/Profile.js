import React, { useState } from 'react'
import { useStateProvider } from '../Utils/StateProvider'

export default function Profile() {
  const [{userName,istoggle,userEmail}]=useStateProvider()
  const [getheight,setHeight]=useState(window.innerHeight)

  return (
    <>
    <div className='global-container' style={{minHeight:getheight+'px',backgroundColor:istoggle?'rgb(34, 33, 33)':''}}>
      This is profile
    </div>
    </>
  )
}
