import React from 'react'

export default function MusicCard(props) {
  const {title,thumbnail,artist,id}=props
  const artistList=artist.map((item)=>item.name).join(' & ')

  const show=(tit)=>{
    console.log(tit)
  }
  return (
    <>
      <section className='musicCard' onClick={()=>show(title)}>
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
