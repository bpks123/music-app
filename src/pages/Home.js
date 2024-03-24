import React, { useEffect, useState } from 'react'
import MusicPlayer from '../components/MusicPlayer'
import MusicCard from '../components/MusicCard'
import { useStateProvider } from '../Utils/StateProvider'
export default function Home() {
  const [getData,setData]=useState([])
  const [{searchSong,istoggle,searchClicked},dispatch]=useStateProvider()
  const [getheight,setHeight]=useState(window.innerHeight)
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
      <div className='global-container' style={{minHeight:getheight+'px'}} >
        
          <div className={`music-container ${istoggle?'toggle-mode':''}`}>
            
          {
            getData.map((obj,index)=>{
              return (
                <MusicCard
                key={index}
                title={obj.title}
                thumbnail={obj.thumbnail}
                artist={obj.artist}
                id={index}
                song={obj}
              />
              )
              
            })
          }
        </div>
      </div>
      <MusicPlayer/>
    </>
  )
}
