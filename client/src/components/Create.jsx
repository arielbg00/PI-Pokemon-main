import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, createPokemon } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

export default function Create() {

   const statePokemonTypes = useSelector((state) => state.pokemonTypes);
   const dispatch = useDispatch();
   const history = useHistory();

   const [input, setInput] = useState({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      image: "",
      types: []
   });

   useEffect(() => {
      dispatch(getTypes());
   }, [])

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createPokemon(input));
      alert("Pokemon Created!");
      // setInput({
      //    name: "",
      //    hp: 0,
      //    attack: 0,
      //    defense: 0,
      //    speed: 0,
      //    height: 0,
      //    weight: 0,
      //    image: "",
      //    types: []
      // });
      history.push("/home");
   };

   const handleInputChange = (e) => {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      });
   };

   const handleTypes = (e) => {
      setInput({
         ...input,
         types: [...input.types, e.target.value]
      });
   };

   const handleDelete = (el) => {
      setInput({
         ...input,
         types: input.types.filter(type => type !== el)
      });
   };

   return (
      <div>
         <Link to="/home">Back</Link>
         <h1>Create Pokemon</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Name: </label>
               <input type="text" name="name" value={input.name} onChange={handleInputChange} />
            </div>
            <div>
               <label>Hp: </label>
               <input type="number" name="hp" value={input.hp} onChange={handleInputChange} />
            </div>
            <div>
               <label>Attack: </label>
               <input type="number" name="attack" value={input.attack} onChange={handleInputChange} />
            </div>
            <div>
               <label>Defense: </label>
               <input type="number" name="defense" value={input.defense} onChange={handleInputChange} />
            </div>
            <div>
               <label>Speed: </label>
               <input type="number" name="speed" value={input.speed} onChange={handleInputChange} />
            </div>
            <div>
               <label>Height: </label>
               <input type="number" name="height" value={input.height} onChange={handleInputChange} />
            </div>
            <div>
               <label>Weight: </label>
               <input type="number" name="weight" value={input.weight} required onChange={handleInputChange} />
            </div>
            <div>
               <label>Image: </label>
               <input type="text" name="image" value={input.image} required onChange={handleInputChange} />
            </div>
            <select defaultValue="default" onChange={handleTypes}>
               <option value="default" disabled>Select Types</option>
               {
                  statePokemonTypes.length && statePokemonTypes.map((obj, i) => (
                     <option key={i} value={obj.name}>{obj.name}</option>
                  ))
               }
            </select>
            {/* <ul><li>{input.types.join(", ")}</li></ul> */}
            <div>
               <button type="submit">Create Pokemon</button>
            </div>
         </form>
         <ul>
            {
               input.types.map((el, i) => (
                  <li key={i}>
                     {el} <button onClick={() => handleDelete(el)}>x</button>
                  </li>
               ))
            }
         </ul>
      </div>
   );
}