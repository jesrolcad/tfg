const Puntuacion = require('../../models/Puntuacion');
const Programa = require('../../models/Programa');
const Lista = require('../../models/Lista');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


//Create or update a Puntuacion
module.exports.createOrUpdatePuntuacion = async (req, res) => {

    const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
   }

    let programa = await Programa.findById(req.params.idPrograma);

    if(!programa){
        return res.status(400).json({
            status: 400,
            message: "El programa no existe"
        });
    }

    let lista = await Lista.findOne({ user: req.user._id, nombre:"Programas vistos"});

    if(lista.programas.includes(programa._id)) {

    let puntuacion = await Puntuacion.findOne({ usuario: req.user._id, programa: req.params.idPrograma });
    if (puntuacion) {
        puntuacion.puntuacion = req.body.puntuacion;
        await puntuacion.save();
        res.status(201).json({
            ok: true,
            puntuacion: puntuacion
        })
    } else {
        let puntuacion = new Puntuacion({
            usuario: req.user._id,
            programa: req.params.idPrograma,
            puntuacion: req.body.puntuacion
        });
        await puntuacion.save();
        res.status(201).json({
            status: 201,
            puntuacion: puntuacion	
        })
    }

    } else {
        return res.status(400).json({
            status: 400,
            message: "Añade el programa a tu lista 'Programas vistos' para puntuarlo"
        });
    }


    
}

module.exports.getPuntuacionMediaPrograma = async (req, res) => {

    
    let programa = await Programa.findById(req.params.idPrograma);
    if (!programa) {
        return res.status(400).json({
            status: 400,
            message: "El programa no existe"
        });
    }
    
    let puntuacionMedia = await Puntuacion.aggregate([
        {
            $match: {
                programa: mongoose.Types.ObjectId(req.params.idPrograma)
            }
        },
        {
            $group: {
                _id: "$programa",
                media: { $avg: "$puntuacion" }
            }
        }
    ]);

    console.log(puntuacionMedia);

    res.json({
        status: 200,
        puntuacionMedia: puntuacionMedia
    })
}






