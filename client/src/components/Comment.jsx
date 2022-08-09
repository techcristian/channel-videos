import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { format } from "timeago.js";

//contenedor pricipal del comentario
const Container = styled.div`
display:flex;
gap:10px;
margin: 30px 0px;
`
//imagen del usuario
const Avatar = styled.img`
width:50px;
height:50px;
border-radius:50%;
`;
//Detalles de cada comentario
const Details = styled.div`
display:flex;
flex-direction:column;
gap:10px;
`;
const Name = styled.span`
font-size:13px;
font-weight:600;
color:${({theme})=> theme.text}
`;
const Date = styled.span`
font-size:12px;
font-weight:400;
color:${({theme}) => theme.textSoft};
margin-left: 5px;
`;
const Text = styled.span`
font-size: 14px;

color: ${({theme})=> theme.text};

`;





export const Comment = ({comment}) => {
  const [channel, setChannel]= useState({});//creamos un estado para buscar un usuario con useEffect
  
  useEffect(()=>{
      const fetchComment = async()=>{
        const res = await axios.get(`/users/find/${comment.userId}`)
       setChannel(res.data)
      
      }
      fetchComment();
  },[comment.userId]
  );
 
  return (
    <Container>
      <Avatar src={channel.img}/>
      <Details>
        <Name>
          {channel.name} <Date>{format(channel.createdAt)}</Date>
          </Name>
        
        <Text>{comment.description} </Text>
      </Details>
    </Container>
  )
}