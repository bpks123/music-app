import React from 'react'
import { useStateProvider} from '../Utils/StateProvider'
export default function MusicPlayer() {
  const [{selectedSong},dispatch]=useStateProvider()
  return (
    <>
     <h1>Music Player</h1>
     <audio controls src={selectedSong.audio_url}/>
    </>
  )
}
