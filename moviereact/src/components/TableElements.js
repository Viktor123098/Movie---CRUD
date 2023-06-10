import { useRef } from "react";
import "../css/tableElements.css";


const TableElements = ({
    props: {id, isbn, title, director: {firstName, secondName}}
}) => {    

  const singleMovieRow = useRef();

  const deleteSingleMovie = async (event) => {
    const singleMovieRow = event.current.parentElement.parentElement;
    const singleMovieRowID = event.current.id;
    try {
      fetch(`/movies/${singleMovieRowID}`, {
        method: 'DELETE',
        header: 'Content-Type',
      });
      singleMovieRow.remove();
      window.location.reload();
    }
    catch (err){
      console.log(err);
    }
  }


  return (
    <>
      <tr className="table_element_row">
        <td>{id}</td>
        <td>{isbn}</td>
        <td>{title}</td>
        <td>{firstName}</td>
        <td>{secondName}</td>
        <td><button className="delete_button" id={id} ref={singleMovieRow} onClick={() => deleteSingleMovie(singleMovieRow)}>Delete</button></td>
      </tr>
    </>
  );
};
export default TableElements;
