const { Router } = require('express');
const { Pokemon, Type } = require("../db");
const { getAllPokemons } = require("../utils/utils.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
   try {
      const { name } = req.query;      
      const getAll = await getAllPokemons();
      
      if (name) {
         const pokemon = getAll.find(poke => poke.name === name);
         pokemon ? res.json(pokemon) : res.send("Pokemon not found");
      } else {
         // const allPokemons = getAll.map(({ id, name, image, types }) => ({ id, name, image, types }));
         // res.json(allPokemons);
         res.json(getAll)
      }
   } catch (error) {
      console.log(error);
   }
});

router.get("/pokemons/:id", async (req, res) => {
   try {      
      const { id } = req.params;
      const pokemons = await getAllPokemons();
      const pokemon = pokemons.find(poke => poke.id.toString() === id);

      pokemon ? res.json(pokemon) : res.status(400).send("Pokemon not found");
   } catch (error) {
      console.log(error);
   }
});

router.post("/pokemons", async (req, res) => {
   const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
   if (!name || !hp || !attack || !defense || !image) {
      res.status(400).json({ msg: "missing data" });
   }
   try {
      const obj = { name, hp, attack, defense, speed, height, weight, image };
      const newPoke = await Pokemon.create(obj);

      await newPoke.addTypes(types);  //  le paso ids de Type
      res.send("Pokemon Created");
   } catch (error) {
      console.log(error);
   }
});

router.get("/types", async (req, res) => {
   try {
      const types = await Type.findAll();
      res.send(types);
   } catch (error) {
      console.log(error);
   }
});


module.exports = router;
