const Programa=require('../../models/Programa');
const Puntuacion = require('../../models/Puntuacion');
const mongoose = require('mongoose');

module.exports.getSugerencias = async function (req, res) {
    const puntuadosUsuario = await Puntuacion.aggregate(
        [
                {
                '$match': {
                    'usuario': mongoose.Types.ObjectId(req.user._id)
                }
                }, {
                '$project': {
                    'programa': 1,
                    '_id': 0
                }
                }, {
                '$group': {
                    '_id': 'new',
                    'programa': {
                    '$addToSet': '$programa'
                    }
                }
                }, {
                '$project': {
                    '_id': 0,
                    'programa': 1
                }
                }
        ]
    );
    const puntuacionPrograma = await Puntuacion.aggregate([
        {
            '$match': {
                'programa': mongoose.Types.ObjectId(req.body.idPrograma)
            }
        }, {
            '$group': {
                '_id': '$programa',
                'media': {
                '$avg': '$puntuacion'
                }
            }
        }
    ]);
    const numPuntuacionesPrograma = await Puntuacion.aggregate([
        {
            '$match': {
                'programa': mongoose.Types.ObjectId(req.body.idPrograma)
            }
        }, {
            '$count': 'count'
        }
    ]);
    const sugerencias = await Programa.aggregate([
        {
            '$match': {
                '_id': {
                '$nin': puntuadosUsuario[0].programa
                },
                'generos': {
                '$in': req.body.generos
                }
            }
            }, {
            '$project': {
                'titulo': 1,
                'tipo': 1,
                'fecha': 1,
                'imagen': 1,
                '_id': 1
            }
            }, {
            '$lookup': {
                'from': 'puntuaciones',
                'localField': '_id',
                'foreignField': 'programa',
                'as': 'puntuacion'
            }
            }, {
            '$match': {
                'puntuacion': {
                '$exists': true,
                '$ne': []
                }
            }
            }, {
            '$set': {
                'numPuntuaciones': {
                '$size': '$puntuacion'
                },
                'puntuacion': '$puntuacion.puntuacion'
            }
            }, {
            '$set': {
                'puntuacion': {
                '$avg': '$puntuacion'
                }
            }
            }, {
            '$set': {
                'distance': {
                '$sqrt': {
                    '$add': [
                    {
                        '$pow': [
                        {
                            '$subtract': [
                                puntuacionPrograma[0].media, '$puntuacion'
                            ]
                        }, 2
                        ]
                    }, {
                        '$pow': [
                        {
                            '$subtract': [
                                numPuntuacionesPrograma[0].count, '$numPuntuaciones'
                            ]
                        }, 2
                        ]
                    }
                    ]
                }
                }
            }
            }, {
            '$sort': {
                'distance': 1
            }
            }, {
            '$limit': 4
            }
        ]);
        res.json(sugerencias);
};
