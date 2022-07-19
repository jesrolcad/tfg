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

      if (generos.length > 3) {
         let generosString = "";
         for (let k = 0; k < 3; k++) {
            generosString += generos[k] + ", ";
         }
         generosString += "...";

         return generosString;
   }
  
}

}
 
 //Validar que un usuario solo accede a su lista
 module.exports.getLista = async (req, res) => {
 
 
    const lista = await Lista.findById(req.params.idLista);
 
    if (lista.usuario == req.user._id) {
       res.json(lista);
    } else {
       res.sendStatus(401);
    }
 
 }

 
 
 module.exports.createLista = async (req, res) => {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.json({ status:400, errors: errors.array() });
   }
 
    const lista = new Lista({ nombre: req.body.nombre, programas: [], usuario: req.user._id });
    await lista.save();
 
    res.json({
       ok: true,
    })
 
 }
 
 module.exports.deleteLista = async (req, res) => {
 
    let lista = await Lista.findById(req.params.idLista);
 
    if (lista.usuario == req.user._id) {
       await lista.remove();
       res.json({
          status: 200,
          message: "Lista borrada"
       });
 
    } else {
       res.sendStatus(401);
    }
 
 
 }
 
 //Validar que es el usuario que ha iniciado sesión
 module.exports.deleteProgramaLista = async (req, res) => {
 
    // console.log(req.params.idLista);
 
    Lista.findById(req.params.idLista, async function (err, lista) {
       if (lista) {
 
          if (lista.usuario == req.user._id) {
             let programas = lista.programas;
             let index = programas.indexOf(req.params.idPrograma);
             if (index > -1) {
               programas.splice(index, 1);
               lista.save();
               let puntuacion = await Puntuacion.findOne({programa: req.params.idPrograma, usuario: req.user._id});
               puntuacion.remove();
               return res.sendStatus(204);
 
             } else {
                return res.sendStatus(400);
             }
 
          } else {
             return res.sendStatus(401);
          }
 
       } else {
          res.sendStatus(400);
       }
 
    });
 
 }
 
 //Validar que es el usuario que ha iniciado sesión
 module.exports.addProgramaLista = async (req, res) => {
 
    Lista.findById(req.params.idLista, function (err, lista) {
       if (lista) {
 
          if (lista.usuario == req.user._id) {
             let programa = Programa.findById(req.params.idPrograma);
 
             if (!programa) { 
                return res.status(400).json({message: "El programa no existe"});
 
             } else if (lista.programas.includes(req.params.idPrograma)) {
                return res.status(400).json({msg: "El programa ya estaba en la lista"});
             } else { 
                lista.programas.push(req.params.idPrograma);
                lista.save();
                res.status(204).json({msg: "Programa añadido correctamente"});
             }
          }  else {
             res.status(401).json({"msg": "No eres propietario de esta lista"});
       }
       } else {
          res.status(400).json({msg: "La lista no existe"});
       }
 
    })

}