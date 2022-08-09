import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Menu } from "./components/Menu";
import  Navbar  from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Video } from "./pages/Video";
import { SignIn } from "./pages/Signin";
import Search from "./pages/Search";

//contenedor de la barra lateral de menu ((Menu))
const Container = styled.div`
display:flex;
`;

//navegacion de la segunda parte en que esta dividida la pagina principal.
const Main = styled.div`
flex:7;
background-color:${({theme})=> theme.bg};
`;

//incluye este contenedor todas las cards de los videos
const Wrapper = styled.div`
padding: 22px 96px;
`;


function App() {
  const [darkMode,setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container>
     <BrowserRouter>
     <Menu darkMode={darkMode}  setDarkMode={setDarkMode}/>
     <Main>
        <Navbar/>
       
        <Wrapper>
        <Routes>
          <Route path="/" index element={<Home type="random"/>}/>
          <Route path="/trends"  element={<Home type="trend"/>}/>
          <Route path="/subscriptions"  element={<Home type="sub"/>}/>
          <Route path="search" element={<Search/>}/>
          <Route path="/video/:id" element={<Video/>}/>
          <Route path="signin" element={<SignIn/>}/>
        </Routes>
        </Wrapper> 
        
     </Main>
     </BrowserRouter> 
    </Container>
    </ThemeProvider>
  );
}

export default App;
