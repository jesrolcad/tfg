const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const { validationResult } = require('express-validator');

//Listas del usuario
//Validar que un usuario solo accede a sus listas
module.exports.getMisListas = async (req, res) => {

    const listas = await Lista.find({ usuario: req.user._id });
 
    res.json(listas);
 
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
 
    Lista.findById(req.params.idLista, function (err, lista) {
       if (lista) {
 
          if (lista.usuario == req.user.usuario._id) {
             let programas = lista.programas;
             let index = programas.indexOf(req.params.idPrograma);
             if (index > -1) {
                programas.splice(index, 1);
                lista.save();
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
          console.log("Existe la lista");
 
          if (lista.usuario == req.user.usuario._id) {
             console.log("La lista es del usuario loggeado");
             let programa = Programa.findById(req.params.idPrograma);
 
             if (!programa) { 
                console.log("No existe el programa");
                return res.sendStatus(400);
 
             } else if (lista.programas.includes(req.params.idPrograma)) {
                console.log("El programa ya estaba en la lista");
                return res.sendStatus(400);
             } else { 
                console.log("Añadimos el programa");
                lista.programas.push(req.params.idPrograma);
                lista.save();
                res.sendStatus(204);
             }
          }  else {
             console.log("Los usuarios no coinciden");
             res.sendStatus(401);
       }
       } else {
          console.log("La lista no existe");
          res.sendStatus(400);
       }
 
    })

}