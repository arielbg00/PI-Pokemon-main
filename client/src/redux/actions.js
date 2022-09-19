import axios from "axios";

export const getPokemons = () => {
   return async (dispatch) => {
      const getApi = await axios.get("http://localhost:3001/pokemons");
      dispatch({
         type: "GET_POKEMONS",
         payload: getApi.data
      });
   };
};

export const createPokemon = () => {
   return async (dispatch) => {};
};