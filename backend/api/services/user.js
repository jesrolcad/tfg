const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const app = express();
const { validationResult } = require('express-validator');


app.use(express.json());

module.exports.login = async function login(req, res) {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

   }

   //Obtenemos los datos del frontend
   let body = req.body;

   Usuario.findOne({ nombreUsuario: body.nombreUsuario }, (erro, usuarioDB) => {
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
               message: "Usuario incorrecto"
            }
         })
      }
      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
         return res.status(400).json({
            ok: false,
            err: {
               message: "Contraseña incorrecta"
            }
         });
      }
      // Genera el token de autenticación
      let token = jwt.sign({
         usuario: usuarioDB
      },
         process.env.SEED_AUTENTICACION, //Este es nuestro token de autenticación
         {
            expiresIn: process.env.CADUCIDAD_TOKEN
         })

      console.log(token);


      // let session = req.session;
      // console.log(session);

      res.json({
         ok: true,
         usuario: usuarioDB,
         token,
      })
   })

};

module.exports.logout = async function logout(req, res) {

   req.session.destroy();
   res.redirect('/login');


}


module.exports.registro = async function registro(req, res) {

   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

   }
   let body = req.body;
   let { nombre, nombreUsuario, email, password } = body;
   let usuario = new Usuario({
      nombre,
      nombreUsuario,
      email,
      password: bcrypt.hashSync(password, 10)
   });

   usuario.save();
   Lista.create({ nombre: "Programas vistos", usuario: usuario._id, programas: [] })
   Lista.create({ nombre: "En seguimiento", usuario: usuario._id, programas: [] })

   return res.sendStatus(200);


};


//Listas del usuario
//Validar que un usuario solo accede a sus listas
module.exports.getMisListas = async (req, res) => {

   const listas = await Lista.find({ usuario: req.user.usuario._id });

   res.json(listas);

}

//Validar que un usuario solo accede a su lista
module.exports.getLista = async (req, res) => {


   const lista = await Lista.findById(req.params.idLista);

   if (lista.usuario == req.user.usuario._id) {
      res.json(lista);
   } else {
      res.sendStatus(401);
   }

}


module.exports.createLista = async (req, res) => {

   const lista = new Lista({ nombre: req.body.nombre, programas: [], usuario: req.user.usuario._id });
   await lista.save();

   res.json({
      ok: true,
   })

}

module.exports.deleteLista = async (req, res) => {

   let lista = await Lista.findById(req.params.idLista);

   if (lista.usuario == req.user.usuario._id) {
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
