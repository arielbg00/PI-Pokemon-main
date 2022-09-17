const axios = require("axios");
const { Pokemon, Type } = require("../db");

const saveTypesInDb = async () => {
   const getApiTypes = await axios.get("https://pokeapi.co/api/v2/type");  //  require axios
   const typesUrls = getApiTypes.data.results.map(obj => axios.get(obj.url).then(r => r.data));
   const typesApi = await Promise.all(typesUrls);

   const arrayTypes = typesApi.map(obj => {
      return {
         id: obj.id,
         name: obj.name
      }
   });
   // create types in the DB
   await Type.bulkCreate(arrayTypes);  //  require Type from DB
};

const getAllPokemons = async () => {
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

   // get pokemons from DB
   const getDb = await Pokemon.findAll({  //  require Pokemon from DB
      include: [{
         model: Type,  //  require Type from DB
         attributes: ["name"],
         through: {
            attributes: []
         }
      }]
   });

   const getAll = [...pokemonsApi, ...getDb];
   return getAll;
};

module.exports = {
   saveTypesInDb,
   getAllPokemons
};