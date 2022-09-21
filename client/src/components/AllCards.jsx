import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getPokemons } from "../redux/actions";

export default function AllCards() {

   const statePokemons = useSelector((state) => state.pokemons);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getPokemons());
   }, [dispatch])

   return (
      <>
         <div>
            {
               statePokemons.length ? statePokemons.map((poke) => (
                  <Link key={poke.id} to={`/details/${poke.id}`}>
                     <Card name={poke.name} image={poke.image} types={poke.types} />
                  </Link>
               )) : <h2>No hay nada</h2>
            }
         </div>
      </>
   )
}