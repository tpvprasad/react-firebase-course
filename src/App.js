import './App.css';
import { Auth } from './components/Auth';
import { db,auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
 import {ref , uploadBytes} from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle ] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileupload , setFileUpload] = useState("");

  const movieCollection = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollection);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    getMovieList();
  },[]);

  const newMovieSubmit = async () => {
    try {
      await addDoc(movieCollection, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isNewMovieOscar,
        userId : auth?.currentUser?.uid
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };


  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();  
    } catch (err) {
      console.error(err);
    }
  };

 

  const updateTitle = async (id) => {
    const movieDoc = doc(db, "movies" , id);
    try {
      await updateDoc(movieDoc , {title : updatedTitle}); 
      getMovieList();   
    } 
     catch(err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
     if(!fileupload) return;
     const filePathRef = ref(storage , `projectFiles/${fileupload.name}`);
     try {
      await uploadBytes(filePathRef , fileupload);
     } catch(err){
      console.error(err);
     }
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input placeholder='movie title' onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input placeholder='release date' type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received Oscar</label>
        <button onClick={newMovieSubmit}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='enter the new title' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
