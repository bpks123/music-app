import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import MusicCard from '../components/MusicCard'
export default function Home() {
  const [getData,setData]=useState([])
  useEffect(()=>{
    util()
  },[])
  async function util(){
    try{
      let response=await fetch('https://academics.newtonschool.co/api/v1/music/song',{
        headers:{
          projectId:'l2uaz7omaxbe'
        }
      })
      let result=await response.json()
      console.log(result.data)
      const data=result.data
      setData(data)
    }
    catch(error){
      alert(error)
    }
    
  }
  return (
    <>
      <div className='global-container'>
        <div className='left-sidebar'>
            <Sidebar/>
        </div>
        <div className='right-sidebar'>

          <div className='music-container'>
          {
            getData.map((obj,index)=>{
              return (
                <MusicCard
                key={index}
                title={obj.title}
                thumbnail={obj.thumbnail}
                artist={obj.artist}
                id={index}
              />
              )
              
            })
          }
          </div>
        </div>
      </div>
    </>
  )
}
