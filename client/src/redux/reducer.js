const initialState = {
   pokemons: [],
   pokemonDetails: {},
   copyPokemons: [],
   pokemonTypes: [],
   initialPage: 1
};

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case "GET_POKEMONS":
         return {
            ...state,
            pokemons: action.payload,
            copyPokemons: action.payload
         };
      case "GET_POKEMON_ID":
         return {
            ...state,
            pokemonDetails: action.payload
         };
      case "FILTER_POKEMONS":
         const allPokemons = state.copyPokemons;
         const filtered = action.payload === "created" ? allPokemons.filter(el => el.created) 
            : allPokemons.filter(el => !el.created);
         return {
            ...state,
            pokemons: action.payload === "All" ? allPokemons : filtered
         };
      case "FILTER_BY_TYPES":
         const filterByType = action.payload === "all" ? state.copyPokemons 
            : state.copyPokemons.filter(el => el.types.includes(action.payload));
         return {
            ...state,
            pokemons: filterByType
         };
      case "GET_TYPES":
         return {
            ...state,
            pokemonTypes: action.payload
         };
      case "ALPHABETICAL_ORDER":
         const pokemonsSorted = action.payload === "a-z" ?
            state.pokemons.sort((a, b) => {
               if (a.name > b.name) return 1;
               else if (b.name > a.name) return -1;
               else return 0;
            })
            : state.pokemons.sort((a, b) => {
               if (a.name > b.name) return -1;
               else if (b.name > a.name) return 1;
               else return 0;
            });
         return {
            ...state,
            pokemons: pokemonsSorted
         };
      case "ATTACK_ORDER":
         const attackSorted = action.payload === "max" ? 
            state.pokemons.sort((a, b) => b.attack - a.attack)
            : state.pokemons.sort((a, b) => a.attack - b.attack);
         return {
            ...state,
            pokemons: attackSorted
         };
      case "GET_POKEMON_NAME":
         return {
            ...state,
            pokemons: action.payload
         };
      case "CHANGE_PAGE":
         return {
            ...state,
            initialPage: action.payload
         }
      default:
         return state;
   }
}