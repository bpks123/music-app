import React from 'react'
import { useStateProvider} from '../Utils/StateProvider'
export default function MusicCard(props) {
  const [{selectedSong},dispatch]=useStateProvider()
  const {title,thumbnail,artist,id,song}=props
  let artistList
  if(artist){
     artistList=artist.map((item)=>item.name).join(' & ')

  }

  const show=(song)=>{

    dispatch({type:'SET_SELECTED_SONG',payload:song})
    console.log(song)
    
  }
  return (
    <>
      <section className='musicCard' onClick={()=>show(song)}>
        <img
          src={thumbnail}
          height={"150"}
          width={"150"}
          className='bannerImg'
        />
        <div className='music-title'>{title}</div>
        <div className='artist'>
          {artistList}
        </div>
      </section>
    </>
  )
}
