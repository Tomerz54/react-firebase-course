
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import {db , auth , storage} from './config/firebase'
import {  getDocs,collection ,addDoc , deleteDoc , doc , updateDoc} from 'firebase/firestore'
import { ref , uploadBytes} from 'firebase/storage';

function App() {
  const [moviesList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewMovieReleaseDate] = useState("0");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //update title state
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateDate, setUpdateDate] = useState("")

  //file upload state
  const[fileUpload, setFileUpload] = useState(null)
  
  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    // Read the data
    // set the movie list
    try {
      const data = await getDocs(moviesCollectionRef);

      const filterdData = data.docs.map((doc) => ({...doc.data() , id: doc.id}));
      
      console.log(filterdData);
      setMovieList(filterdData)
    } catch (err){
      console.log(err);
    }
    
  };

  const deleteMovie = async (id) => {
    const mvoieDoc = doc(db,"movies",id)
    await deleteDoc(mvoieDoc)

  };

  const updateMovieTitle = async (id,) => {
    const mvoieDoc = doc(db,"movies",id)
    await updateDoc(mvoieDoc,{title : updateTitle})

  };

  const updateMovieDate = async (id,) => {
    const mvoieDoc = doc(db,"movies",id)
    await updateDoc(mvoieDoc,{date : updateDate})

  };

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, 'project_files/$(fileUplaod.name)');
    try{
      await uploadBytes(filesFolderRef, fileUpload); 
    } catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    

    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef,
        {title : newMovieTitle ,
          date : newReleaseDate ,
           recievedAnOscar : isNewMovieOscar,
           userId : auth?.currentUser?.uid,
         });
      getMovieList();   
    } catch(err){
      console.log(err);
    }
    
  };
  
  return (<div className="App">
    <Auth />

    <div>

      <input placeHolder = "Movie title..." 
      onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input placeHolder = "Release Date..." type="number"
      onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
      />
      <input type = "checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
      <label> Recieved an oscar</label>
      <button onClick={onSubmitMovie}> Submit Movie </button>
    </div>
    <div>{moviesList.map((movie) => (
      <div>
        <h1> {movie.title} </h1>
        <p> Date : {movie.date}</p>
        <p style={{color: movie.recievedAnOscar ? "green" : "red"}}> recieved an oscar </p>

        <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

        <input placeholder = "new title..." onChange={(e) => setUpdateTitle(e.target.value)}/>
        <button onClick={() => updateMovieTitle(movie.id,movie)}> Update title</button>
        <input placeholder = "new date..." onChange={(e) => setUpdateDate(e.target.value)} type='number'/>
        <button onClick={() => updateMovieDate(movie.id,movie)}> Update release date</button>
        </div>
    ))}
    </div>

    <div>
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
      <button onClick={uploadFile}>Upload file</button>
    </div>
    
    </div>
  );
}

export default App;
