import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { logout } from "../redux/userSlice";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Upload from "./Upload";

const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme})=> theme.bgLighter};
height:56px;
`


const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
height:100%;
padding:0px 20px;
position:relative;
`

const Search = styled.div`
width:40%;
position:absolute;
left:0px;
right:0px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between;
padding:5px;
border:1px solid ${({theme}) => theme.textSoft};
background:${({theme}) => theme.soft};
color:${({theme}) => theme.text};
border-radius:3px;

`

const Input = styled.input`
border:none;
outline:none;
background-color: transparent;
color:${({theme}) => theme.text}
`

const Button = styled.button`
  background-color:transparent ;
  color:#0d0df3;
  cursor:pointer;
  padding: 5px 15px;
  border: 1px solid 
  #0d0df3;
  border-radius:5px;
  display:flex;
  align-items:center;
  gap:5px;
  &:hover{
    background:#201f1f;
    color:white;
    border: 1px solid 
   white;
  }
 
`
//boton de logout
const ButtonLogout = styled.button`

  background-color:transparent ;
  color:#0d0df3;
  cursor:pointer;
  padding: 5px 15px;
  border: 1px solid 
  #0d0df3;
  border-radius:5px;
  display:flex;
  align-items:center;
  gap:5px;
  &:hover{
    background:#201f1f;
    color:white;
    border: 1px solid 
   white;
  }
`


//permite cambiar de color el icono de lupa cuando cambia de tema!!
 const Icon = styled.div`
 color:${({theme}) => theme.text}
 `
 const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

 const Navbar = () => {
  //estado de ventana emergente para caragar video
  const [open,setOpen] = useState(false)
  //estado de Search(busqueda por consulta query)
  const [q,setQ] = useState("");
  
  const {CurrentUser} = useSelector((State) => State.user);  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async (e) =>{
    e.preventDefault();
     dispatch(logout())
     navigate("signin")
   };


  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input 
          placeholder="Buscador"
          onChange={(e)=> setQ(e.target.value)}
          />
         <Icon> 
          <SearchIcon onClick={()=> navigate(`/search?q=${q}`)}/>
        </Icon>
         </Search>
        {CurrentUser ? (
           <User>
           <VideoCallOutlinedIcon onClick={()=>setOpen(true)}/>
           <Avatar src={CurrentUser.img}/>
           {CurrentUser.name}
           <Link to="signin" style={{textDecoration:"none"}}>
           <ButtonLogout onClick={handleLogout}>
          Logout
         </ButtonLogout>
         </Link>
         </User>
        
         ):(
         <Link to="signin" style={{textDecoration:"none"}}>
              <Button>
              <AccountCircleOutlinedIcon/>
                SIGN IN
              </Button>
        </Link>)}
       
        </Wrapper>
       
    </Container>
    {open && <Upload setOpen={setOpen}/>}
    </>
  )
}
export default Navbar;