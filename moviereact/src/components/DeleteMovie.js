import { useRef } from "react";
import closeWrapper from "../functions/closeWrapper";
import "../css/popUp.css";


const DeleteMovie = ({ allData, deleteMovieID }) => { 

  const deleteID = useRef();

  const deleteData = async (id) => {
    const newUpdatedData = allData.filter((item)=> item.id!=id);
    try {
        const response = await fetch(`/movies/${id}`, {
            method: 'DELETE',
            header: 'Content-Type'
        });
        if(response.ok) {
            deleteID.current.parentElement.parentElement.style.visibility = 'hidden';
            deleteMovieID(newUpdatedData);
            window.location.reload();
        }
    }
    catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="search_container">
      <h3>Delete By ID</h3>
      <input type="number" ref={deleteID} placeholder="ID:"></input>
      <button className="handle_button" onClick={() => deleteData(deleteID.current.value)}>Delete</button>
      <button className="close_button" onClick={closeWrapper}>Close</button>
    </div>
  );
};

export default DeleteMovie;