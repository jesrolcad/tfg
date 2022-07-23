const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const Puntuacion = require('../../models/Puntuacion');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

//Listas del usuario
//Validar que un usuario solo accede a sus listas
module.exports.getMisListas = async (req, res) => {

   const listas = await Lista.find({ usuario: req.user._id });
   //array of json with Listas and its generos
   let listasJson = [];
   for (let i = 0; i < listas.length; i++) {
      let lista = listas[i];
      let listaJson = {
         "lista": lista,
         "generos": await this.getGenerosLista(lista)
      }
      listasJson.push(listaJson);
   }
   res.json(listasJson);

}

module.exports.getGenerosLista = async (lista) => {
   let generos = [];

   for (let i = 0; i < lista.programas.length; i++) {
      const programa = await Programa.findById(lista.programas[i]);
      for (let j = 0; j < programa.generos.length; j++) {
         const genero = programa.generos[j];
         if (!generos.includes(genero)) {
            generos.push(genero);

         }
      }

   }

   if (generos.length > 0) {

      if (generos.length == 1) {
         return generos[0];
      }
      let generosList = [];
      for (let k = 0; k < generos.length; k++) {
         generosList.push(generos[k]);

         if (k == 2) {
            break;
         }

      }

      if (generos.length > 2) {
         generosList.push("...");

      }

      return generosList;
   } else {
      return ["Sin géneros"];
   }

}

//Validar que un usuario solo accede a su lista
module.exports.getLista = async (req, res) => {

   //if idLista is not ObjectId
   if (!mongoose.Types.ObjectId.isValid(req.params.idLista)) {
      return res.status(400).json({
         status: 400,
         key: "idListaInvalido",
         msg: "El id de la lista no es válido"
      });
   }
   const lista = await Lista.findById(req.params.idLista);

   if (lista) {

      if (lista.usuario == req.user._id) {

         let listaProgramas = lista.programas;
         let listaNombreProgramas = [];
         for (let i = 0; i < listaProgramas.length; i++) {
            const programa = await Programa.findById(listaProgramas[i]);
            listaNombreProgramas.push(programa.nombre);

         }
         res.json({
            status: 200,
            lista: {
               nombre: lista.nombre,
               programas: listaNombreProgramas

            }
         });
      } else {
         res.sendStatus(401);
      }

   } else {
      return res.status(400).json({
         status: 400,
         key: "listaInexistente",
         msg: "La lista no existe"
      });
   }

}

module.exports.createLista = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
   }

   const lista = new Lista({ nombre: req.body.nombre, programas: [], usuario: req.user._id });
   await lista.save();

   res.json({
      status: 200,
      msg: "Lista creada con éxito",
      lista: lista
   });

}

module.exports.deleteLista = async (req, res) => {

   //if idLista is not ObjectId
   if (!mongoose.Types.ObjectId.isValid(req.params.idLista)) {
      return res.status(400).json({
         status: 400,
         key: "idListaInvalido",
         msg: "El id de la lista no es válido"
      });

   }

   let lista = await Lista.findById(req.params.idLista);

   if (lista) {

      if (lista.usuario == req.user._id) {

         if (lista.nombre === "Programas vistos" || lista.nombre === "En seguimiento") {
            return res.status(400).json({
               status: 400,
               key: "listaNoEliminable",
               msg: "Las listas 'Programas vistos' y 'En seguimiento' no pueden ser eliminadas"
            })

         }
         await lista.remove();
         return res.status(200).json({
            status: 200,
            msg: "Lista borrada con éxito"
         });

      } else {
         return res.status(401).json({
            status: 401,
            msg: "No tienes permisos para borrar esta lista"
         });
      }
   } else {
      return res.status(400).json({
         status: 400,
         key: "listaInexistente",
         msg: "La lista no existe"
      });
   }

}

//  

//Validar que es el usuario que ha iniciado sesión
module.exports.deleteProgramaLista = async (req, res) => {


   Lista.findById(req.params.idLista, async function (err, lista) {
      if (lista) {

         if (lista.usuario == req.user._id) {
            //if idPrograma is not ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.params.idPrograma)) {
               return res.status(400).json({
                  status: 400,
                  key: "idProgramaInvalido",
                  msg: "El id del programa no es válido"
               });
            }
            let programa = Programa.findById(req.params.idPrograma);

            if (!programa) {
               return res.status(400).json({ status: 400, key: "programaInexistente", msg: "El programa no existe" });

            }

            let programas = lista.programas;
            let index = programas.indexOf(req.params.idPrograma);
            if (index > -1) {
               programas.splice(index, 1);
               lista.save();
               //find Programas vistos
               if (lista.nombre === "Programas vistos") {
                  let puntuacion = await Puntuacion.findOne({ programa: req.params.idPrograma, usuario: req.user._id });
                  if (puntuacion) {
                     puntuacion.remove();
                  }

               }
               return res.json({ status: 204, msg: "Programa borrado de " + lista.nombre });

            } else {
               return res.status(400).json({ status: 400, key: "programaNoEnLista", msg: "El programa no está en la lista" });
            }

         } else {
            return res.status(401).json({ status: 401, msg: "No eres propietario de esta lista" });
         }

      } else {
         res.status(400).json({ status: 400, key: "listaInexistente", msg: "La lista no existe" });
      }

   });

}

//Validar que es el usuario que ha iniciado sesión
module.exports.addProgramaLista = async (req, res) => {

   Lista.findById(req.params.idLista, async function (err, lista) {
      if (lista) {

         if (lista.usuario == req.user._id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.idPrograma)) {
               return res.status(400).json({
                  status: 400,
                  key: "idProgramaInvalido",
                  msg: "El id del programa no es válido"
               });
            }
            let programa = Programa.findById(req.params.idPrograma);

            if (!programa) {
               return res.status(400).json({ status: 400, key: "programaInexistente", msg: "El programa no existe" });

            } else if (lista.programas.includes(req.params.idPrograma)) {
               return res.status(400).json({ status: 400, key: "programaEnLista", msg: "El programa ya estaba en la lista " + lista.nombre });
            } else {
               lista.programas.push(req.params.idPrograma);
               await lista.save();
               return res.json({ status: 204, msg: "Programa añadido a " + lista.nombre });
            }

         } else {
            return res.status(401).json({ status: 401, msg: "No eres propietario de esta lista" });
         }
      } else {
         return res.status(400).json({ status: 400, key: "listaInexistente", msg: "La lista " + lista.nombre + " no existe" });
      }

   })

}