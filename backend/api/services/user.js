const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const app = express();

module.exports.login = async function login(req,res){

    //Obtenemos los datos del frontend
    let body = req.body;

    Usuario.findOne({ nombreUsuario: body.nombreUsuario }, (erro, usuarioDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
   // Verifica que exista un usuario con el nombre de usuario escrito por el usuario.
      if (!usuarioDB) {
         return res.status(400).json({
           ok: false,
           err: {
               message: "Usuario o contraseña incorrectos"
           }
        })
      }
   // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (! bcrypt.compareSync(body.password, usuarioDB.password)){
         return res.status(400).json({
            ok: false,
            err: {
              message: "Usuario o contraseña incorrectos"
            }
         });
      }
   // Genera el token de autenticación
       let token = jwt.sign({
              usuario: usuarioDB,
           }, process.env.SEED_AUTENTICACION, {
           expiresIn: process.env.CADUCIDAD_TOKEN
       })
       res.json({
           ok: true,
           usuario: usuarioDB,
           token,
       })
   })

};

module.exports.users = async function users(req, res){
   const usuarios= await Usuario.find().select({ "nombre": 1, "_id": 0}).limit(5);
   res.json(usuarios);
  };


module.exports.registro = async function registro(req, res){

   let body = req.body;
  let { nombre, nombreUsuario, email, password} = body;
  let usuario = new Usuario({
    nombre,
    nombreUsuario,
    email,
    password: bcrypt.hashSync(password, 10)
  });
usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          usuario: usuarioDB
       });
    })
};


//Listas del usuario
//Validar que un usuario solo accede a sus listas
module.exports.getMisListas = async (req, res) => {

   console.log(req.params.idUsuario);
   
   const listas = await Lista.find({usuario: req.params.idUsuario});
   
   res.json(listas);

}

//Validar que un usuario solo accede a su lista
module.exports.getLista = async (req, res) => {
   const lista = await Lista.findById(req.params.idLista);
   res.json(lista);
}

//Necesario validar
module.exports.createLista = async (req, res) => {

   const lista = new Lista({nombre: req.body.nombre, programas: [], usuario: req.params.idUsuario});
   await lista.save();

   res.json({
      ok: true,
  })

}

module.exports.deleteLista = async (req, res) => {

   await Lista.findByIdAndRemove(req.params.idLista);
  res.json({
    status: 200,
    message: "Lista borrada"
  });

}

//Validar que es el usuario que ha iniciado sesión
module.exports.deleteProgramaLista = async (req, res) => {

  // console.log(req.params.idLista);
   
   Lista.findById(req.params.idLista, function(err, lista) {

      let programas = lista.programas;
      console.log(programas);
      let index = programas.indexOf(req.params.idPrograma);
      if(index > -1) {
         programas.splice(index, 1);
         lista.save();
         return res.sendStatus(204);
   
      } else {
         return res.sendStatus(400);
      }
   });

}

//Validar que es el usuario que ha iniciado sesión
module.exports.addProgramaLista = async (req, res) => {

   Lista.findById(req.params.idLista, function(err, lista) { 
   let programa = Programa.findById(req.params.idPrograma);
   if(!programa){ // Si no existe el programa, entonces no lo añado
      return res.sendStatus(400); 
   } else if(lista.programas.includes(req.params.idPrograma)) {
      return res.sendStatus(400);
      
   } else {

      lista.programas.push(req.params.idPrograma);
      lista.save();
      res.sendStatus(204);
   }


   })

}

