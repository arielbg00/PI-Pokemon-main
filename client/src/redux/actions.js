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

export const getPokemonId = (id) => {
   return async (dispatch) => {
      const getById = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({
         type: "GET_POKEMON_ID",
         payload: getById.data
      });
   };
};

export const filterPokemons = (payload) => {
   return {
      type: "FILTER_POKEMONS",
      payload
   };
};

export const filterByTypes = (payload) => {
   return {
      type: "FILTER_BY_TYPES",
      payload
   };
};

export const getTypes = () => {
   return async (dispatch) => {
      const getTypeDb = await axios.get("http://localhost:3001/types");
      dispatch({
         type: "GET_TYPES",
         payload: getTypeDb.data
      });
   };
};

export const alphabeticalOrder = (payload) => {
   return {
      type: "ALPHABETICAL_ORDER",
      payload
   };
};

export const attackOrder = (payload) => {
   return {
      type: "ATTACK_ORDER",
      payload
   };
};

export const getPokemonName = (name) => {
   return async (dispatch) => {
      try {
         const getByName = await axios.get(`http://localhost:3001/pokemons/?name=${name}`);
         dispatch({
            type: "GET_POKEMON_NAME",
            payload: getByName.data
         });
      } catch (error) {
         alert(`${name} is not a Pokémon`)
      }
   };
};

export const changePage = (payload) => {
   return {
      type: "CHANGE_PAGE",
      payload
   };
};

export const createPokemon = () => {
   return async (dispatch) => {};
};