import styled from "styled-components";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { Comments } from "../components/Comments";

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { fetchSuccess,fetchStart,fetchFailure,like,dislike } from "../redux/videoSlice";
import { format } from "timeago.js";
import { useState } from "react";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";



//contenedor padre que contiene a Content y Recommendation.
const Container =styled.div`
display : flex;
gap:24px;
`

//contenido hijo que a su vez contiene el envoltorio del video principal.
const Content = styled.div`
flex:5;
`

//envoltorio del video dentro del contenedor hijo ((Content))
const VideoWrapper = styled.div`

`
const Title = styled.h1`
font-size:18px;
font-weight:400;
margin-top: 20px;
margin-bottom:10px;
color: ${({theme})=> theme.text}
`

//envoltorio de los detalles y botones
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Info = styled.div`
color:${({theme})=> theme.textSoft}
`
//contenedor de botones
const Buttons = styled.div`
display:flex;
gap:20px;
color:${({theme}) => theme.text}

`
const Button = styled.button`
display: flex;
align-items: center;
background-color: ${({theme})=> theme.bg};
color:${({theme}) => theme.text};
border: 1px solid ${({theme}) => theme.soft};
border-radius:5px;
gap: 5px;
height:35px;
cursor: pointer;

`

const Hr = styled.hr`
margin:15px 0px;
border: 0.5px solid ${({theme}) => theme.soft};

`;
//envoltorio de contenido del info canal y boton suscripción debajo de linea separadora Hr.
const Channel = styled.div`
display:flex;
justify-content:space-between;
`
//contenido de info del propietario del canal
const ChannelInfo = styled.div``;
 
const Image = styled.img`
width:50px;
height:50px;
border-radius:50%;
`;

const ChannelDetail= styled.div`
display:flex;
flex-direction: column;
color:${({theme})=> theme.text}
`;

const ChannelName = styled.span`
font-weight:600;
`;

const ChannelCounter = styled.span`
margin-top: 5px;
margin-botton: 20px;
color:${({theme})=> theme.textSoft};
font-size:12px;
`;




//boton de suscripción.
const Subscribe = styled.button`
background-color: #201f1f;
font-weight:500;
color:white;
border:1px solid #050505;
border-radius:10px;
height:max-content;
padding:10px 20px;
font-weight:600;
cursor:pointer;
&:hover{
  background:red;
}
`;
const Description = styled.p`
  font-size: 14px;
`;
const VideoFrame = styled.video`
  max-height: 600px;
  width: 100%;
  object-fit: cover;
`;


export const Video = () => {
  const currentUser = useSelector((State) => State.user.CurrentUser);  //debe ser State con Mayscula y CurrentUser Tambien porque en Redux asi esta el arbol del estado!!
  const currentVideo = useSelector((State) => State.video.CurrentVideo);  
  
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2]
  //console.log(path)

 
  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      dispatch(fetchStart())
      try {
        const videoRes =await axios.get(`/videos/find/${path}`)//Traigo datos del video desde la db con el :id de video
       //console.log(videoRes)
       dispatch(fetchSuccess(videoRes.data))
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)//(((traigo los datos del usuario al que pertenece el video))) con el (userId) del video traido arriba en data.
        console.log(channelRes)
        setChannel(channelRes.data)//paso al estado los datos del usuario al que pertenece el video
         } catch (err) {
        dispatch(fetchFailure())
      }
    }
    fetchData()//uso la funcion que busca los datos
 },[path, dispatch]);//dependencia o variable que varia,en este caso va a depender del video selccionado va a cambiar su id que pasemos como busqueda en la db.

//funciones dispara peticion put a la db de video de Likes y Dislikes
const handleLike = async () => {
  await axios.put(`/users/like/${currentVideo._id}`)
  dispatch(like(currentUser._id))
};

const handleDislikes = async ()=>{
  await axios.put(`/users/dislike/${currentVideo._id}`)
  dispatch(dislike(currentUser._id))
};

const handleSub = async()=>{
  currentUser.subcribedUsers.includes(channel._id)?
  await axios.put(`/users/unsub/${channel._id}`)
  :
  await axios.put(`/users/sub/${channel._id}`);
  dispatch(subscription(channel._id))

}

  return (
    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={currentVideo.videoUrl} controls autoPlay loop/>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
        <Info>{currentVideo.views} views - {format(currentVideo.createdAt)}</Info>
        <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo.likes?.includes(currentUser?._id) ?(
                  <ThumbUpIcon />):(<ThumbUpOffAltIcon/>)}{""}
                  {currentVideo.likes?.length
                  }
               </Button>
                {<Button onClick={handleDislikes}>
                  {currentVideo.dislikes?.includes(currentUser?._id)?( 
                  <ThumbsUpDownIcon />
                  ):(
                  <ThumbsUpDownIcon/>)}{""}
                  </Button>}
          <Button><ShareIcon/>Compartir</Button>
          <Button><SaveAltIcon/>Descargar</Button>
        </Buttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
            <Image src={channel.img}/>
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subcribers} suscriptores</ChannelCounter>
              <Description>{currentVideo.description}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subcribedUsers?.includes(channel._id) ?
            "SUSCRITO"
            : "SUSCRIBIRSE"}{/*si el id del usuario propietario del video (channel._id)esta incluido en el subcribedUser del dueño del canal o usuario (CurrentUser.subcribedUsers) donde me encuentro como usuario con el que hice Signin...es porque el usuario del canal ,esta suscripto al canal del dueño del video (channel)*/}
            </Subscribe>
        </Channel>
        <Hr/>
        <Comments videoId={currentVideo._id}/>
        
         </Content>
        <Recommendation type="sm" tags={currentVideo.tags}/>
    </Container>
  );
};
