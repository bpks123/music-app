import React,{useState,useEffect} from 'react'
import { useStateProvider } from '../Utils/StateProvider'
import MusicCard from '../components/MusicCard'
import MusicPlayer from '../components/MusicPlayer'
export default function SearchSong() {
    const [{searchSong,searchClicked},dispatch]=useStateProvider()
    const [dataFound,setDataFound]=useState("")
    const [data,setData]=useState([])
    useEffect(()=>{
        if(searchSong){
            OnHandleSearchSong()
        }
    },[searchSong])

    async function OnHandleSearchSong(){
        
        try{
            const response=await fetch(`https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchSong}"}`,{
            headers: {
                projectId: 'l2uaz7omaxbe',
            }})
            console.log(response)
            if(response.status===200){
                const result=await response.json()
                console.log(result.data)
                setData(result.data)
                setDataFound(`Search result for ${searchSong}`)
            }
            else{
                setData([])
                setDataFound('No Songs found. Try Again...')
            }
            
            
        }   
        catch(error){
            alert(error)
        }
    }
  return (
    <>
    <div className='global-container'>
    {(<h1 style={{textAlign:'center'}}>{dataFound}</h1>)} 
        
        <div className='music-container'>
            {
                data?
                data.map((obj,index)=>{
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
                
                :'Loading....'
            }
        </div>
    </div>
    <MusicPlayer/>
    </>
  )
}
