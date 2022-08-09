import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



//contenedor de la ventana emergente
const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background:#00000a7;
color:black;
display: flex;
align-items: center;
justify-content: center;
`

//emboltorio principal de la ventana emergente
const Wrapper = styled.div`
width:600px;
height:600px;
background: ${({theme}) => theme.bgLighter};
color: ${({theme}) => theme.text};
padding: 20px;
display:flex;
flex-direction:column;
gap:20px;
position:relative;
`

const Close = styled.div`
position:absolute;
top:20px;
right:10px;
cursor:pointer;
`;

const Title = styled.h1`
text-align:center;
`;

const Label = styled.label`
  font-size: 14px;
`;

//input
const Input = styled.input`
border: 1px solid ${({theme}) => theme.soft};
color: ${({theme})=> theme.text};
border-radius:3px;
padding:10px;
background-color: transparent;
outline:none;
`;

const Description = styled.textarea`
border: 1px solid ${({theme}) => theme.soft};
color: ${({theme})=> theme.text};
border-radius:3px;
padding:10px;
background-color: transparent;
outline:none;
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
  justify-content:center;
  align-items:center;
  gap:5px;
  &:hover{
    background:#201f1f;
    color:white;
    border: 1px solid 
   white;
  }
 
`
const Upload = ({setOpen}) =>{

  const [img,setImg] = useState(undefined);
  const [video,setVideo] = useState(undefined);
  const [imgPerc,setImgPerc] = useState(0);
  const [videoPerc,setVideoPerc] = useState(0)
  const [inputs,setInputs] = useState({});
  const [tags,SetTags] = useState([]);
  const navigate = useNavigate(); 


//funcion manejadora de etiquetas
const handleTags= (e) =>{
  SetTags(e.target.value.split(","));
};

//funcion de actualizar el cambio del titulo,description,urlVideo y urlImg de la db.
const handleChange = (e) =>{
  setInputs((prev)=> {
    return {...prev, [e.target.name]:e.target.value};
  });
};

//funcion disparadora del boton de carga del video con axios.

const handleUpload = async (e) => {
 e.preventDefault();
 const res = await axios.post("/videos", {...inputs,tags})
 
 res.status===200 && navigate(`/video/${res.data._id}`)
 setOpen(false)
}

//ejecucion de useEffect cada vez que se carga un video e imagen

const uploadFile = (file,urlType) =>{
  const storage = getStorage(app);//creamos nuestro almacenamiento
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage,fileName);//creamos referencia de almacenamiento
  const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed',
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
    }
  },
  (error) => {
    // Handle unsuccessful uploads
  },
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs((prev)=>{
        return {...prev,[urlType]: downloadURL}
      })
    });
  }
);
};

useEffect(()=>{
 video && uploadFile(video,"videoUrl");

},[video]);

useEffect(()=>{
 img && uploadFile(img,"imgUrl")

},[img]);

  return(
 <Container>
  <Wrapper>
    <Close onClick={()=>setOpen(false)}>x</Close>
    <Title>Crea un nuevo video</Title>
   
    <Label>Ingrese Video:</Label>
    
    { videoPerc > 0 ? ("Uploading: "+ videoPerc +"%") :(
      <Input 
    type="file" 
    accept="video/*" 
    onChange={e=>setVideo(e.target.files[0])}/>
    )
  }
    
    <Input type="text" placeholder="Titulo" name="title" onChange={handleChange}/>
   
    <Description 
    placeholder="Descripción" 
    rows={8} name="description" 
    onChange={handleChange}/>
    
    <Input type="text" 
    placeholder="Ingrese aqui Separacion de Etiquetas con comas,Ejemplo: js,jsx,py,mp4..etc" 
    onChange={handleTags}/>

    <Label>Ingrese Imagen:</Label>
    { imgPerc > 0 ? ("Uploading: " + imgPerc + "%"):(
    <Input type="file" 
    accept="image/*" 
    onChange={e=>setImg(e.target.files[0])}/>
    )
}
    <Button onClick={handleUpload}>Guardar</Button>
  </Wrapper>
 </Container>
  )
}

export default Upload
/*
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    const res = await axios.post("/videos", {...inputs, tags})
    setOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Crear nuevo video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Description
          placeholder="Description"
          name="description"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChance={handleTags}
        />
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
*/
