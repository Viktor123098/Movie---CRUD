import { useRef } from "react";
import closeWrapper from "../functions/closeWrapper";
import "../css/popUp.css";

const AddMovie = ({ addData }) => {
    const titleValue = useRef();
    const isbnValue = useRef();
    const directorName = useRef();
    const directorSurname = useRef();

  const moviesPost = async () => {
    try {             
      const newMovieData = {
        isbn: isbnValue.current.value,
        title: titleValue.current.value,
        director: { firstName: directorName.current.value, secondName: directorSurname.current.value },
      };
      const response = await fetch('http://localhost:8080/movies', {
        method:'POST',
        header: 'Content-Type',
        body: JSON.stringify(newMovieData),
      });
      if(response.ok) {
        addData(newMovieData);
        window.location.reload();
      }
    } 
    catch (err){
      console.log(err);
    }
  };

  return (
    <div className="search_container">
      <h3>Add Movie</h3>
      <input type="text" ref={titleValue} placeholder="Ttile:"></input>
      <input type="number" ref={isbnValue} placeholder="ISBN:"></input>
      <input type="text" ref={directorName} placeholder="Director Name"></input>
      <input type="text" ref={directorSurname} placeholder="Director Surname"></input>
      <button className="handle_button" onClick={moviesPost}>Add</button>
      <button className="close_button" onClick={closeWrapper}>Close</button>
    </div>
  );
};

export default AddMovie;
