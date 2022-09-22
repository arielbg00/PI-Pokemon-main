import React from "react";

export default function Paginated({pokemonsInPage, statePokemons, paginate}) {

   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(statePokemons/pokemonsInPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul>
            {
               pageNumbers?.map(num => (
                  <li key={num}>
                     <button onClick={() => paginate(num)}>{num}</button>
                  </li>
               ))
            }
         </ul>
      </nav>
   );
}