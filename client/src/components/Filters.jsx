import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, filterByTypes, getTypes, alphabeticalOrder } from "../redux/actions";

export default function Filters({setCurrentPage, setOrder}) {

   const statePokemonTypes = useSelector(state => state.pokemonTypes)
   const dispatch = useDispatch();
   
   const pokemonTypesName = statePokemonTypes.map(obj => obj.name);
   
   const handleFilterPokemons = (e) => {
      dispatch(filterPokemons(e.target.value));
      setCurrentPage(1);
   };

   useEffect(() => {
      dispatch(getTypes());
   }, [dispatch])

   const handleFilterByTypes = (e) => {
      dispatch(filterByTypes(e.target.value));
      setCurrentPage(1);
   };

   const handleAlphabeticalOrder = (e) => {
      e.preventDefault();
      dispatch(alphabeticalOrder(e.target.value));
      setCurrentPage(1);
      setOrder(`Order ${e.target.value}`);
   };

   return (
      <div>
         <select onChange={e => handleFilterByTypes(e)}>
            <option value="all">All Types</option>
            {
               pokemonTypesName.length && pokemonTypesName.map((el, i) => (
                  <option key={i} value={`${el}`}>{el}</option>
               ))
            }
         </select>
         <select onChange={e => handleAlphabeticalOrder(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
         </select>
         <select onChange={e => handleFilterPokemons(e)}>
            <option value="All">Todos</option>
            <option value="api">Existentes</option>
            <option value="created">Creados</option>
         </select>
      </div>
   );
}