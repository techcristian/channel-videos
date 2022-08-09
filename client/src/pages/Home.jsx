import { useEffect, useState } from "react";
import styled from "styled-components"
import { Card } from "../components/Card"
import axios from 'axios';



const Container = styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;
`;

export const Home = ({type})=>{
  const [video,setVideos]= useState([])

  useEffect(()=>{
    const fetchVideos = async ()=>{
      const res =await axios.get(`/videos/${type}`)
     setVideos(res.data)
    }
    fetchVideos()
  },[type])

  return (
   <Container>
    {video.map((video)=>(
      <Card key={video._id} video={video}/>
      
    ))}
    

   </Container>
  )
}