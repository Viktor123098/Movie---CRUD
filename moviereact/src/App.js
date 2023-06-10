import { useEffect, useRef, useState } from "react";
import "../src/css/app.css";
import Table from "./components/Table";
import GetByID from "./components/GetByID";
import AddMovie from "./components/AddMovie";
import DeleteMovie from "./components/DeleteMovie";
import UpdateMovie from "./components/UpdateMovie";


function App() {

// useStates for putting allData there and useRef for the popUpWrapper which is displayed after clicking on the buttons

  const [AllMoviesData, setAllMoviesData] = useState([]); 
  const [data, setData] = useState([]);
  const [popUP, setPopUP] = useState(null);
  const popUpWrapper = useRef();

  useEffect(() => {
    const url = `http://localhost:8080/movies`; 
    const fetchData = async () => { // on realod and visiting the page fetching the data from the url
      try {
        const res = await fetch(url);
        const data = await res.json();
        setAllMoviesData(data);
        setData(data);
      } catch (err) {}
    };

    const sortData = async () => { // sorting the data by the ID 
      try {
        const res = await fetch(url);
        const data = await res.json();
        const result = data.sort((previuos, next) => previuos.id - next.id)
        setAllMoviesData(result);
        setData(result);
      }
      catch {
      }
    }

    fetchData();
    sortData();
  }, []);

  const updateDataByID = (newDataByID) => { // function to update the table by searched ID
    setData(newDataByID);
  };

  const addData = (newDataPost) => { // function for adding new data
    setData([...data, newDataPost]);
  };

  const deleteMovieID = (newDataDelete) => { // function for deleting single data by ID
    setData(newDataDelete);
  };

  const showPopUP = (name) => { // function to show the PopUpWrapper and calling the useState
    popUpWrapper.current.style.visibility = 'visible';
    setPopUP(name);
  };

  const updateData = (newUpdatedData) => { // function to update single data ( movie )
    setData([...data, newUpdatedData]);
  }


  return (
    <div>
      <div className="container">
        <h1>Movies List</h1>
        <div className="container_wrapper">
          <div className="buttons_wrapper">
            <button onClick={() => showPopUP("search")} className="buttons">Search By ID</button>
            <button onClick={() => showPopUP("delete")} className="buttons">Delete Movie</button>
            <button onClick={() => showPopUP("add")} className="buttons">Add Movie</button>
            <button onClick={() => showPopUP("update")} className="buttons">Update Movie</button>
          </div>
          <div className="popUP_wrapper" ref={popUpWrapper}>
          {popUP === "search" && (<GetByID allData={AllMoviesData} updateDataByID={updateDataByID}/>)}
            {popUP === "delete" && (<DeleteMovie allData={AllMoviesData} deleteMovieID={deleteMovieID}/>)}
            {popUP === "add" && <AddMovie addData={addData} />}
            {popUP === 'update' && <UpdateMovie allData={AllMoviesData} updateData={updateData} />}
          </div>
        </div>
        <Table props={data} />
      </div>
    </div>
  );
}

export default App;
