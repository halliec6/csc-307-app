// src/MyApp.jsb

// import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';


function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
        <Form handleSubmit={updateList} />
        </div>
      );

    function removeOneCharacter(index) {
        const person = characters[index]
        const updated = characters.filter((character, i) => {return i !== index;});
        
        deleteOneCharacter(person)
          .then(()=>setCharacters(updated))
          .catch((error)=>{
            console.log(error)
          })
    }
    
    function deleteOneCharacter(person) {
      const promise = fetch(`http://localhost:8000/users`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
      .then((res)=>{
        if (res.status === 202)
          return res.json(person.id)
        
      })
      .catch((error)=>{
          console.log(error);
      });
      return promise;
    }
  
    //called when the 'form' component submits a new user (person)
    function updateList(person) { 
      postUser(person) //calls postUser to send post request to server
        .then((newPerson) => setCharacters([...characters, newPerson])) //upon success, updates local state, adding new user to existing array
        .catch((error) => {
          console.log(error);
        })
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
      .then((res)=>{
        if (res.status !== 201)
          throw new Error("Not 201, insertion not successful")
        else
          return res.json()
      })
      .catch((error)=>{
          console.log(error);
      });
      return promise;
    }
}


export default MyApp;