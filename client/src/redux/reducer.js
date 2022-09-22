const initialState = {
   pokemons: [],
   pokemonDetails: []
};

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case "GET_POKEMONS":
         return {
            ...state,
            pokemons: action.payload
         };
      case "GET_POKEMON_ID":
         return {
            ...state,
            pokemonDetails: action.payload
         };
      default:
         return state;
   }
}