const Puntuacion = require('../../models/Puntuacion');
const Programa = require('../../models/Programa');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


//Create or update a Puntuacion
module.exports.createOrUpdatePuntuacion = async (req, res) => {

    const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
   }

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
            ok: true,
            puntuacion: puntuacion	
        })
    }
}

module.exports.getPuntuacionMediaPrograma = async (req, res) => {

    
    let programa = await Programa.findById(req.params.idPrograma);
    if (!programa) {
        return res.status(400).json({
            ok: false,
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
        ok: true,
        puntuacionMedia: puntuacionMedia
    })
}






