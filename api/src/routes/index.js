const { Router } = require('express');
const axios = require("axios");
const { Pokemon } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
   // https://pokeapi.co/api/v2/pokemon
   try {
      // get pokemons from API
      const getApiPart1 = await axios.get("https://pokeapi.co/api/v2/pokemon");  //  require and install axios
      const getApiPart2 = await axios.get(getApiPart1.data.next);
      const getApi = [...getApiPart1.data.results, ...getApiPart2.data.results];
      
      const pokemonsUrl = getApi.map((obj) => axios.get(obj.url).then(r => r.data));
      const pokemons = await Promise.all(pokemonsUrl);
      
      const pokemonsApi = pokemons.map(poki => {
         const obj = {
            name: poki.name,
            hp: poki.stats[0].base_stat,
            attack: poki.stats[1].base_stat,
            defense: poki.stats[2].base_stat,
            speed: poki.stats[5].base_stat,
            height: poki.height,
            weight: poki.weight,
            image: poki.sprites.other["official-artwork"].front_default
         };
         return obj;
      });
      
      // get pokemons from DB
      const getDb = await Pokemon.findAll();  //  require Pokemon // ??????
      
      const getAll = [...pokemonsApi, ...getDb];
      
      console.log(getDb);
      res.json(getAll);
   } catch (error) {
      console.log(error);
   }
});

router.post("/pokemons", async (req, res) => {
   const { name, hp, attack, defense, speed, height, weight, image } = req.body;
   if (!name || !hp || !attack || !defense || !image) {
      res.status(400).json({ msg: "missing data" });
   }

   try {
      const obj = { name, hp, attack, defense, speed, height, weight, image };
      const newPoke = await Pokemon.create(obj);

      console.log(Pokemon.__proto__);
      console.log(newPoke.__proto__);
      
      res.send(newPoke);
   } catch (error) {
      console.log(error);
   }
});


module.exports = router;
