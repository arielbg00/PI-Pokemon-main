import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterByTypes, attackOrder, alphabeticalOrder, filterPokemons, changePage } from "../redux/actions";

export default function Filters({setCurrentPage, setOrder}) {

   const statePokemonTypes = useSelector(state => state.pokemonTypes)
   const dispatch = useDispatch();
   
   const pokemonTypesName = statePokemonTypes.map(obj => obj.name);

   useEffect(() => {
      dispatch(getTypes());
   }, [dispatch])

   const handleFilterByTypes = (e) => {
      dispatch(filterByTypes(e.target.value));
      dispatch(changePage(1));
      setCurrentPage(1);
   };

   const handleAttackOrder = (e) => {
      e.preventDefault();
      dispatch(attackOrder(e.target.name));
      dispatch(changePage(1));
      setCurrentPage(1);
      setOrder(e.target.name);
   };

   const handleAlphabeticalOrder = (e) => {
      e.preventDefault();
      dispatch(alphabeticalOrder(e.target.name));
      dispatch(changePage(1));
      setCurrentPage(1);
      setOrder(e.target.name);
   };

   const handleFilterPokemons = (e) => {
      dispatch(filterPokemons(e.target.value));
      dispatch(changePage(1));
      setCurrentPage(1);
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
         <button name="max" onClick={(e) => handleAttackOrder(e)}>Max</button>
         <button name="min" onClick={(e) => handleAttackOrder(e)}>Min</button>
         <button name="a-z" onClick={(e) => handleAlphabeticalOrder(e)}>Order A-Z</button>
         <button name="z-a" onClick={(e) => handleAlphabeticalOrder(e)}>Order Z-A</button>
         <select onChange={e => handleFilterPokemons(e)}>
            <option value="All">Todos</option>
            <option value="api">Existentes</option>
            <option value="created">Creados</option>
         </select>
      </div>
   );
}