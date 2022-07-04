const Puntuacion = require('../../models/Puntuacion');
const Programa = require('../../models/Programa');
const { validationResult } = require('express-validator');



//Create or update a Puntuacion
module.exports.createOrUpdatePuntuacion = async (req, res) => {

    const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.json({ status:400, errors: errors.array() });
   }


    let puntuacion = await Puntuacion.findOne({ usuario: req.user._id, programa: req.params.idPrograma });
    if (puntuacion) {
        puntuacion.puntuacion = req.body.puntuacion;
        await puntuacion.save();
        res.json({
            status: 201,
            puntuacion: puntuacion
        })
    } else {
        let puntuacion = new Puntuacion({
            usuario: req.user._id,
            programa: req.params.idPrograma,
            puntuacion: req.body.puntuacion
        });
        await puntuacion.save();
        res.json({
            status: 201,
            puntuacion: puntuacion	
        })
    }
}

module.exports.getPuntuacionMediaPrograma = async (req, res) => {

    
    let programa = await Programa.findById(req.params.idPrograma);
    if (!programa) {
        return res.json({
            status: 400,
            message: "El programa no existe"
        });
    }

    
    let puntuacionMedia = Puntuacion.aggregate([
        {
            $match: {
                programa: req.params.idPrograma
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






