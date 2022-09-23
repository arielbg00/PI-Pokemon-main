const axios = require("axios");
const { Pokemon, Type } = require("../db");

const saveTypesInDb = async () => {
   const getApiTypes = await axios.get("https://pokeapi.co/api/v2/type");  //  require axios
   const typesUrls = getApiTypes.data.results.map(obj => axios.get(obj.url).then(r => r.data));
   const typesApi = await Promise.all(typesUrls);

   const arrayTypes = typesApi.map(({id, name}) => ({id, name}));
   // create types in the DB
   await Type.bulkCreate(arrayTypes);  //  require Type from DB
};

const getAllApi = async () => {
   // https://pokeapi.co/api/v2/pokemon
   // get pokemons from API
   const getApiPart1 = await axios.get("https://pokeapi.co/api/v2/pokemon");  //  require and install axios
   const getApiPart2 = await axios.get(getApiPart1.data.next);
   const getApi = [...getApiPart1.data.results, ...getApiPart2.data.results];

   const pokemonsUrl = getApi.map((obj) => axios.get(obj.url).then(r => r.data));
   const pokemons = await Promise.all(pokemonsUrl);

   const pokemonsApi = pokemons.map(poki => {
      const obj = {
         id: poki.id,
         name: poki.name,
         hp: poki.stats[0].base_stat,
         attack: poki.stats[1].base_stat,
         defense: poki.stats[2].base_stat,
         speed: poki.stats[5].base_stat,
         height: poki.height,
         weight: poki.weight,
         image: poki.sprites.other["official-artwork"].front_default,
         types: poki.types.map(obj => obj.type.name)
      };
      return obj;
   });
   return pokemonsApi;
};

const getAllDb = async () => {
   // get pokemons from DB
   const getDb = await Pokemon.findAll({  //  require Pokemon from DB
      include: [{
         model: Type,  //  require Type from DB
         // attributes: ["name"],
         // through: {
         //    attributes: []
         // }
      }]
   });
   const getDbMap = getDb.map(({id, name, hp, attack, defense, speed, height, weight, image, created, types}) => ({id, name, hp, attack, defense, speed, height, weight, image, created, types: types.map(o => o.name)}))
   return getDbMap;
};

let store = [];

const getAllPokemons = async () => {
   const db = await getAllDb();
   
   if (store.length) {
      const newStore = store.slice(0, 40).concat(db);
      return newStore;
   }
   
   const api = await getAllApi();

   store = [...api, ...db];
   return store;
};

module.exports = {
   saveTypesInDb,
   getAllPokemons
};