import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  const [inputData, setInputData] = useState("");
  const [editInput, setEditInput] = useState("");
  const [active, setActive] = useState();

  useEffect(() => {
    axios
      .get(`${host}/getAllNotes`)
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    axios
      .post(`${host}/addNote`, { title: inputData })
      .then((response) => {
        setNotes([...notes, response.data]);
        setInputData("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const remainingNotes = notes.filter((note) => {
      return note._id !== id;
    });

    axios
      .delete(`${host}/deleteNote/${id}`)
      .then((response) => {
        setNotes(remainingNotes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = (id) => {
    setActive(null);
    axios
      .put(`${host}/updateNote/${id}`, { title: editInput })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className="max-w-screen-sm mx-auto px-5 py-6">
        <div className="flex mb-6">
          <form action="" onSubmit={handleAddNote}></form>
          <input
            type="text"
            className="bg-gray-50 px-4 py-2 rounded-l-md w-full border-gray-100 border outline-none focus:border-gray-200"
            value={inputData}
            placeholder="Enter text here. . ."
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />

          <button
            onClick={handleAddNote}
            className="px-6 py-2 rounded-r-md bg-blue-500 text-white"
          >
            Add
          </button>
        </div>
        <div>
          {notes.map((note) => {
            return (
              <div
                key={note._id}
                className="bg-gray-100 p-2 rounded-lg mb-2 flex space-x-2 justify-between"
              >
                {/* <p>{note.title}</p> */}
                <input
                  type="text"
                  defaultValue={note.title}
                  className=" w-full outline-none p-2 rounded-md"
                  onChange={(e) => {
                    setActive(note._id);
                    setEditInput(e.target.value);
                  }}
                />
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleSave(note._id)}
                    className={`px-2 py-1 ${
                      active === note._id ? "" : "hidden"
                    }  rounded-md text-xs bg-white border border-blue-500 hover:scale-105 duration-150`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-2 py-1  rounded-md text-xs bg-red-500 text-white hover:scale-105 duration-150 "
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
