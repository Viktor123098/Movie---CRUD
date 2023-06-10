import { useRef } from "react";
import closeWrapper from "../functions/closeWrapper";




const UpdateMovie = ({allData, updateData}) => {
    
    const IDValue = useRef();
    const titleValue = useRef();
    const isbnValue = useRef();
    const directorName = useRef();
    const directorSurname = useRef();

    const updateSingleMovie = async () => { 
        const ID = IDValue.current.value;
        let newUpdatedData = {
            id: ID,
            title: titleValue.current.value,
            isbn: isbnValue.current.value,
            director: {
                firstName: directorName.current.value,
                secondName: directorSurname.current.value,
            }
        }
        try {
            const response = await fetch(`/movies/${ID}`, {
                method: 'PUT',
                header: 'Content-Type',
                body: JSON.stringify(newUpdatedData),
            })
            if(response.ok) {
               updateData(allData);
            }
        }
        catch (err){
            console.log(err);
        }
        window.location.reload();
    }


  return (
    <div className="search_container">
        <input type="number" ref={IDValue} placeholder="ID:"></input>
        <input type="text" ref={titleValue} placeholder="Ttile:"></input>
        <input type="number" ref={isbnValue} placeholder="ISBN:"></input>
        <input type="text" ref={directorName} placeholder="Director Name"></input>
        <input type="text" ref={directorSurname} placeholder="Director Surname"></input>
        <button className="handle_button" onClick={updateSingleMovie}>Update</button>
        <button className="close_button" onClick={closeWrapper}>Close</button>
    </div>
  );
};

export default UpdateMovie;
