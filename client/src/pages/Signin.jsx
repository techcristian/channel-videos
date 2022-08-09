import styled from "styled-components";
import {useState} from 'react';
import axios from "axios";
import {useDispatch} from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth,provider} from '../firebase'
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";


//contenedor del formulario donde lo centramos--y otros
const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height: calc(100vh - 56px);
color: ${({theme})=> theme.text};
margin-top:70px;
`;
//envoltorio del formulario y damos flex de columna asi cada elento se posisciona uno debajo de otro.
const Wrapper = styled.div`
display:flex;
align-items:center;
flex-direction:column;
background-color: ${({theme})=> theme.bgLighter};
border:1px solid #dfd5d5;
border-radius:5px;
padding: 10px 50px;
gap:10px;

`;
const Title = styled.h1`
font-size:24px;
`;

const SubTitle = styled.h2`
font.size:20px;
font-weight:300;
`;


const Input = styled.input`
border: 1px solid #dfd5d5;
width:250px;
border-radius: 5px;
padding:10px;
background:transparent;
color:${({theme}) => theme.text};
outline:none;

`;


const Button = styled.button`
border-radius: 5px;
border:1px solid #dfd5d5;
padding:10px 20px;
font-weight:600;
cursor:pointer;
background-color:${({theme})=> theme.soft};
color:${({theme})=> theme.text};
&:hover{
  background:#454343;
}

`;
//boton Google
const ButtonGoogle = styled.button`
display:flex;
align-items: center;
justify-content:center;
gap:10px;
width:200px;
border-radius: 5px;
border:1px solid #dfd5d5;
padding:10px 20px;
font-weight:600;
cursor:pointer;
background:black;
color:white;
&:hover{
  background:#454343;
}
`;


const More = styled.div`
display:flex;
margin-top:10px;
font-size:12px;
color:${({theme})=> theme.textSoft};
`;
const Links = styled.div`
margin-left:50px;
`;
const Link = styled.span`
margin-left:30px;
`;



// funcion SignIn ,estados de inicio de sección

export const SignIn = () => {
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword]= useState("");
const dispatch = useDispatch();
const navigate = useNavigate();


//login con resgistro de base de datos.
const handleLogin = async (e) =>{
  e.preventDefault();
 dispatch(loginStart())
 try {
  const res = await axios.post("/auth/signin", { name, password });

 dispatch(loginSuccess(res.data))
  navigate("/")

} catch (err) {
  dispatch(loginFailure())
 };
  
};
//login co Google
 const signInWithGoogle= async () => {
  dispatch(loginStart())
  signInWithPopup(auth,provider).then((result)=>{
     axios.post("auth/google",{
      name:result.user.displayName,
      email:result.user.email,
      img:result.user.photoURL,
    }).then((res)=>{
      dispatch(loginSuccess(res.data));
      navigate("/")
    })
  }).catch((error) =>{
    dispatch(loginFailure())
  });
 };


  return (
    <Container>

    <Wrapper>
     <Title>Sign in</Title>
     <SubTitle>Elige iniciar seción en: You Channel</SubTitle>
      <Input placeholder="Ingrese Nombre de Usuario" onChange={(e)=>setName(e.target.value)}/>
      <Input type="password" placeholder="Ingrese su Password correctamente" onChange={(e)=>setPassword(e.target.value)}/>
      <Button onClick={handleLogin}>SIGN IN</Button>
      <Title>Or</Title>
      
        <ButtonGoogle onClick={signInWithGoogle}><GoogleIcon/>Google</ButtonGoogle>
         <Title>Or</Title>

      <Input  placeholder="Ingrese nombre de Usuario" onChange={(e)=>setName(e.target.value)}/>
      <Input type="email" placeholder="Ingrese su Email " onChange={(e)=>setEmail(e.target.value)}/>
      <Input type="password" placeholder="Ingrese su password correctamente"/>
      <Button>SING UP</Button>
    </Wrapper>
    <More>
      Español (ES)
      <Links>
      <Link>Ayuda</Link>
      <Link>Privacidad</Link>
      <Link>Terminos</Link>      
      </Links>

    </More>
      
    </Container>
  )
}
