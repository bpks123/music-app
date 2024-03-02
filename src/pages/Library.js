import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../Utils/StateProvider';
import MusicCard from '../components/MusicCard'
import MusicPlayer from '../components/MusicPlayer';
export default function Library() {
  const [{token,selectedSong,favorites},dispatch]=useStateProvider()
  const [getData,setData]=useState([])
  // console.log(favorites)

  useEffect(()=>{
    favorite();
  },[])
 
async function favorite(){
  let response=await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like',{
    headers:{
      projectId:'l2uaz7omaxbe',
      Authorization: `Bearer ${token}`
    }
  })
  response=await response.json()
  const data=response.data.songs
  // console.log(data)
  setData(data)
}
  return (
    <>
      <div style={{backgroundColor:'rgb(146, 144, 144)',minHeight:'528px'}}>
        
          <div className='music-container' >
          {
            getData.map((obj,index)=>{
              return (
                <MusicCard
                key={index}
                title={obj.title}
                thumbnail={obj.thumbnail}
                // artist={obj.artist}
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
