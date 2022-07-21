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
    if(puntuacionPrograma.length == 0 || numPuntuacionesPrograma.length == 0){
        res.status(200).json({"mensaje": "El programa no ha sido votado y no es posible realizar sugerencias"})
    }else if(req.body.generos.length == 0){
        res.status(200).json({"mensaje": "El programa no tiene generos registrados y no es posible realizar sugerencias"})
    }else{
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
    }
};

module.exports.getRecomendacionesUsuario = async function (req, res) {
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
    const generosUsuario= await Puntuacion.aggregate([
        {
            '$match': {
                'usuario': mongoose.Types.ObjectId(req.user._id),
                'puntuacion': {
                '$gte': 4
                }
            }
            }, {
            '$sort': {
                'puntuacion': -1
            }
            }, {
            '$limit': 5
            }, {
            '$lookup': {
                'from': 'programas',
                'localField': 'programa',
                'foreignField': '_id',
                'as': 'generos'
            }
            }, {
            '$project': {
                '_id': 0,
                'programa': 1,
                'puntuacion': 1,
                'generos.generos': 1
            }
            }, {
            '$unwind': {
                'path': '$generos'
            }
            }, {
            '$unwind': {
                'path': '$generos.generos'
            }
            }, {
            '$group': {
                '_id': 'nuevo_id',
                'generos': {
                '$addToSet': '$generos.generos'
                }
            }
            }, {
            '$project': {
                '_id': 0,
                'generos': 1
            }
            }
        ]);
    if(puntuadosUsuario.length == 0 || generosUsuario.length == 0){
        res.status(200).json({"mensaje": "No se han podido realizar sugerencias para usted debido a que no ha añadido ninguna puntuación"})
    }else{
        const recomendaciones= await Programa.aggregate([
            {
            '$match': {
                '_id': {
                    '$nin': puntuadosUsuario[0].programa
                },
                'generos': {
                    '$in': generosUsuario[0].generos
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
                'puntuacionMedia': {
                '$avg': '$puntuacion'
                }
            }
            }, {
            '$sort': {
                'numPuntuaciones': -1,
                'puntuacionMedia': -1
            }
            }, {
            '$limit': 5
            }
        ]);
        res.status(200).json(recomendaciones);
    }
};