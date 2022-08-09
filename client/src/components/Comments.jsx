import { useEffect, useState } from 'react';
import styled from 'styled-components';
import channelVideo from '../img/logoCards.JPEG'
import { Comment } from './Comment.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Container = styled.div``;

const NewComment = styled.div`
display:flex;
align-items:center;
gap:10px;
`;
//imagen del propietario del canal
const Avatar= styled.img`
width:50px;
height:50px;
border-radius:50%;
`;

const Input = styled.input`
border:none;
border-botton: 1px solid ${({theme}) => theme.Soft};
background-color:transparent;
outline:none;
padding:5px;
width:100%;
color:${({theme}) => theme.text};

`;

export const Comments = ({videoId}) => {

  const currentUser = useSelector((State) => State.user.CurrentUser);  //debe ser State con Mayscula y CurrentUser Tambien porque en Redux asi esta el arbol del estado!!
      //creo estado para comentarios
      const [comments,setComments] = useState([]);

      //ejecuto un useEffect para el estado de comentrios
      useEffect(()=>{
        const fetchComments = async ()=>{
          try {
            const res =await axios.get(`/comments/${videoId}`)
            setComments(res.data)
          } catch (err) {
            
          }
        }
        fetchComments();//ejecutamos la funcion que trae los datos del backend arriba.
      },[videoId]
      );


  return (
      <Container>
        <NewComment>
          <Avatar src={currentUser.img}/>
          <Input placeholder="Ingrese un comentario.."/>

        </NewComment>
        {comments.map(comment =>(
          <Comment key={comment._id} comment={comment}/>
        ))}
        
     
        
      </Container>
  )
}