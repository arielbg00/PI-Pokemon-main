import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../redux/actions";

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState("");

   const handleInputChange = (e) => {
      e.preventDefault();
      setName(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (name) {
         dispatch(getPokemonName(name));
         setName("");
      }
   };

   return (
      <div>
         <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="Buscar..." value={name} onChange={(e) => handleInputChange(e)} />
            <button type="submit">Buscar</button>
         </form>
      </div>
   )
}