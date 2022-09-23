import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getPokemons } from "../redux/actions";
import Paginated from "./Paginated";
import Filters from "./Filters";

export default function AllCards() {

   const statePokemons = useSelector((state) => state.pokemons);
   const dispatch = useDispatch();
   // eslint-disable-next-line
   const [order, setOrder] = useState("");

   // Paginated
   const [currentPage, setCurrentPage] = useState(1);  //  eslint-disable-next-line
   const [pokemonsInPage, setPokemonsInPage] = useState(12);
   const indexLastCharacter = currentPage * pokemonsInPage;
   const indexFirstCharacter = indexLastCharacter - pokemonsInPage;
   const currentPokemons = statePokemons.slice(indexFirstCharacter, indexLastCharacter);

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };
   // -------------------

   useEffect(() => {
      dispatch(getPokemons());
      // if (!statePokemons.length) { return dispatch(getPokemons()) }
   }, [dispatch])

   return (
      <>
         <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
         <Paginated
            pokemonsInPage={pokemonsInPage}
            statePokemons={statePokemons.length}
            paginate={paginate}
         />
         <div>
            {
               currentPokemons.length ? currentPokemons.map((poke) => (
                  <Link key={poke.id} to={`/details/${poke.id}`}>
                     <Card name={poke.name} image={poke.image} types={poke.types} />
                  </Link>
               )) : <h2>No hay nada</h2>
            }
         </div>
      </>
   )
}