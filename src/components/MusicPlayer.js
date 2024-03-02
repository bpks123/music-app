import React, { useState } from 'react'
import { useStateProvider} from '../Utils/StateProvider'
import axios from 'axios'

export default function MusicPlayer() {
  const [{selectedSong,token},dispatch]=useStateProvider()
  const [getWatchlist,setWatchList]=useState(false)
  let artistList
  if(selectedSong && selectedSong.artist[0].name){
    artistList=selectedSong.artist.map((item)=>item.name).join(' & ')
  }
  const onHandlerwishList= async(songId)=>{
    // axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { songId: songId }, {
    //   headers: {
    //     projectID: 'l2uaz7omaxbe',
    //     Authorization:`Bearer ${token}`
    //   }
    // })//This is method to do favorite the song using Axios
    console.log(songId)
    let response =await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like',{
      method:'PATCH',
      headers: {
        projectID: 'l2uaz7omaxbe',
        Authorization: `Bearer ${token}`,//we give this to understand backend I am loggedin.
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ songId: songId })
      
    })
    response=await response.json()
    console.log(response)
    setWatchList(true)
  }
  return (
    <>
    {
      selectedSong ? (
      <section className='music-player'>      
        <img
              src={selectedSong.thumbnail}
              height={"50"}
              width={"50"}
              className='bannerImg'
            />
        <div style={{width:'300px'}}>
            <div className='music-title'>{selectedSong.title}</div>
            <div className='artist'>
                {artistList}
            </div>
        </div>
          
        <audio controls src={selectedSong.audio_url} style={{marginLeft:"20px"}}/>
        {token && !getWatchlist && <i className="fa-regular fa-heart" style={{fontSize:'30px'}} onClick={()=>onHandlerwishList(selectedSong._id)}></i>}
        {token && getWatchlist && <i className="fa-solid fa-heart" style={{fontSize:'30px',color:'red'}} ></i>}

      </section>):("")
    }     
    </>
  )
}
