import { useRef } from "react";
import "../css/popUp.css";
import closeWrapper from "../functions/closeWrapper";

const GetByID = ({allData, updateDataByID }) => {

  const searchID = useRef();
  
  const updateData = async (id) => {
    try {
      const url = `http://localhost:8080/movies/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      data.length > 1 ? updateDataByID(allData) : updateDataByID([data]);
      searchID.current.parentElement.parentElement.style.visibility = 'hidden';
    }
    catch {
      updateDataByID(allData);
    }
  };
  return (
    <div className="search_container">
      <h3>Search By ID</h3>
      <input type="number" ref={searchID} placeholder="ID:"></input>
      <button className="handle_button" onClick={() => updateData(searchID.current.value)}>Submit</button>
      <button className="close_button" onClick={closeWrapper}>Close</button>
    </div>
  );
};

export default GetByID;
