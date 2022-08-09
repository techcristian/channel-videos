import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux';

//estilos de la barra lateral
const Container = styled.div`
flex:1;
background-color:${({theme})=>theme.bg};
color: ${({theme})=>theme.text};
height: 140vh;
font-size:14px;
position:sticky;
top:0;
`

//contenedores de la barra lateral donde voy a generar articulos u opciones
const Wrapper = styled.div`

padding: 18px 26px


`;
//logo
const Logo = styled.button`
display:flex;
align-items: center;
gap:10px;
background-color: red;
font-weight:500;
color:white;
border:1px solid #050505;
border-radius:10px;
height:max-content;
padding:10px 10px;
font-weight:600;
cursor:pointer;
margin-bottom:25px;
&:hover{
  background:#201f1f;
}
`;


//menu desplegable de la barra lateral y lo colocamos despues del logotipo
const Item = styled.div`
display:flex;
align-items: center;
gap:20px;
cursor:pointer;

&:hover{
  background:${({theme})=> theme.soft};
}
`;
//separador de elementos de barra lateral menu.
const Hr =styled.hr`
margin: 15px 0px;
border: 0.1px solid ${({theme})=>theme.soft};
`;
//boton de Login
const Login = styled.div`

`
const Button = styled.button`
  background-color:transparent ;
  color:#0d0df3;
  margin-top: 10px;
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
const ButtonMode = styled.button`
  background-color:transparent ;
  color:#0d0df3;
  margin-top: 10px;
  padding: 5px 15px;
  border: 1px solid 
  #0d0df3;
  border-radius:5px;
  display:flex;
  align-items:center;
  gap:5px;
  border:none;

`

const Title = styled.h2`
font-size:14px;
font-weight:500;
color:#aaaaaa;
margin-bottom:20px;
`





export const Menu = ({darkMode,setDarkMode})=>{
  const currentUser = useSelector((state) => state.user.CurrentUser); 
  
  return(
    <Container>
        <Wrapper>
          <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
          <Logo>
          <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
           </Link><VideoLibraryIcon/>
            You Channel 
            </Logo>
          </Link>
          <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <HomeIcon/>
            Inicio
          </Item>
          </Link>
          <Link to="/trends" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
          <ExploreOutlinedIcon />
          Explorar
        </Item>
        </Link>
        <Link to="/subscriptions" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <SubscriptionsOutlinedIcon />
          Suscripciónes
        </Item>
        </Link>
      <Hr/>
      <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <VideoLibraryOutlinedIcon />
          Libreria
        </Item>
        </Link>
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <HistoryOutlinedIcon />
          Historial
        </Item>
        </Link>
       <Hr/>
       {!currentUser &&
        <>
          <Login>
               <Title>
                Te invitamos a ser parte registrandote en la sección SIGN UP
                 ,o ingresa con SIGN IN, Si ya eres parte del canal:
                 </Title>
               <Link to="signin" style={{textDecoration:"none"}}>
               <Button>
                <AccountCircleOutlinedIcon/>
                 SIGN IN
              </Button>
              </Link> 
          </Login>
        <Hr/>
       </>
       }
       <Title>
        Sección de Favoritos YouChannel :
       </Title>
       <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <LibraryMusicOutlinedIcon />
          Musica
        </Item>
        </Link> 
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <SportsBasketballOutlinedIcon />
          Deporte
        </Item>
        </Link> 
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <SportsEsportsOutlinedIcon />
          Juegos
        </Item>
        </Link> 
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <MovieOutlinedIcon />
          Peliculas
        </Item>
        </Link>
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <ArticleOutlinedIcon />
          Noticias
        </Item>
        </Link>
       
      <Hr/>
       
       <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <SettingsOutlinedIcon />
          Configuraciónes
        </Item>
        </Link>
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <FlagOutlinedIcon />
          Reporte
        </Item>
        </Link>
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
        <Item>
          <HelpOutlineOutlinedIcon />
          Ayuda
        </Item>
        </Link>
       <Hr/>
        <ButtonMode onClick={() => setDarkMode(!darkMode)}>
         <SettingsBrightnessOutlinedIcon />
            {darkMode ? "Ir a Modo luz":"Ir a Modo Oscuro"}
        </ButtonMode>
        </Wrapper>
    </Container>
  )
}


