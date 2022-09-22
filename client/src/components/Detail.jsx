import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonId } from "../redux/actions";

export default function Detail(props) {

   const pokemonDetails = useSelector((state) => state.pokemonDetails);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getPokemonId(props.match.params.id))
   }, [dispatch, props.match.params.id])

   return (
      <div>
         <h1>{pokemonDetails.name}</h1>
      </div>
   );
}