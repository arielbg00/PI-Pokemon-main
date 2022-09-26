import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getPokemons, changePage } from "../redux/actions";
import Paginated from "./Paginated";
import Filters from "./Filters";
import SearchBar from "./SearchBar";

export default function AllCards() {

   const statePokemons = useSelector((state) => state.pokemons);
   const dispatch = useDispatch();
   // eslint-disable-next-line
   const [order, setOrder] = useState("");

   // Paginated
   const initialPage = useSelector((state) => state.initialPage);
   const [currentPage, setCurrentPage] = useState(initialPage);  //  eslint-disable-next-line
   const [pokemonsInPage, setPokemonsInPage] = useState(12);
   const indexLastCharacter = currentPage * pokemonsInPage;
   const indexFirstCharacter = indexLastCharacter - pokemonsInPage;
   const currentPokemons = statePokemons.length ? statePokemons.slice(indexFirstCharacter, indexLastCharacter) : false

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      dispatch(changePage(pageNumber))
   };
   // -------------------

   const handleBack = (e) => {
      dispatch(getPokemons());
      setCurrentPage(initialPage);
   };

   useEffect(() => {
      dispatch(getPokemons());
      setCurrentPage(initialPage);
      // if (!statePokemons.length) { return dispatch(getPokemons()) }
   }, [dispatch])

   return (
      <>
         <SearchBar setCurrentPage={setCurrentPage} statePokemons={statePokemons} />
         {
            currentPokemons.length ?
               <div>
                  <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
                  <Paginated
                     pokemonsInPage={pokemonsInPage}
                     statePokemons={statePokemons.length}
                     paginate={paginate}
                  />
               </div> : <button type="text" onClick={(e) => handleBack(e)}>Volver</button>
         }
         <div>
            {
               statePokemons.id ? <Card {...statePokemons} /> : false
            }
         </div>
         <div>
            {
               currentPokemons.length ? currentPokemons.map((poke, i) => (
                  <Link key={i} to={`/details/${poke.id}`}>
                     <Card name={poke.name} image={poke.image} types={poke.types} />
                  </Link>
               )) : false
            }
         </div>
      </>
   )
}