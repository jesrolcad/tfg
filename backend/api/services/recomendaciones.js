const Programa=require('../../models/Programa');
const Puntuacion = require('../../models/Puntuacion');
const mongoose = require('mongoose');
const Lista= require('../../models/Lista');

module.exports.puntuadosUsuario= async function (userId) {
    const puntuadosUsuario = await Puntuacion.aggregate(
        [
                {
                '$match': {
                    'usuario': mongoose.Types.ObjectId(userId)
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
    return puntuadosUsuario;
}

module.exports.puntuacionPrograma= async function (idPrograma) {
    const puntuacionPrograma = await Puntuacion.aggregate([
        {
            '$match': {
                'programa': mongoose.Types.ObjectId(idPrograma)
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
    return puntuacionPrograma;
}

module.exports.numPuntuacionesPrograma = async function (idPrograma) {
    const numPuntuacionesPrograma = await Puntuacion.aggregate([
        {
            '$match': {
                'programa': mongoose.Types.ObjectId(idPrograma)
            }
        }, {
            '$count': 'count'
        }
    ]);
    return numPuntuacionesPrograma;
}

module.exports.getSugerencias = async function (req, res) {
    let puntuadosUsuario = await this.puntuadosUsuario(req.user._id);
    let puntuacionPrograma = await this.puntuacionPrograma(req.body.idPrograma);
    let numPuntuacionesPrograma = await this.numPuntuacionesPrograma(req.body.idPrograma);
    let programasNin=[];

    if(puntuadosUsuario.length > 0){
        programasNin= puntuadosUsuario[0].programa;
        programasNin.push(mongoose.Types.ObjectId(req.body.idPrograma));
    }else{
        programasNin.push(mongoose.Types.ObjectId(req.body.idPrograma));
    }
    
    if(puntuacionPrograma.length == 0 || numPuntuacionesPrograma.length == 0){
        res.status(200).json({"mensaje": "El programa no ha sido votado y no es posible realizar sugerencias"})
    }else if(req.body.generos.length == 0){
        res.status(200).json({"mensaje": "El programa no tiene generos registrados y no es posible realizar sugerencias"})
    }else{
        const sugerencias = await Programa.aggregate([
            {
                '$match': {
                    '_id': {
                    '$nin': programasNin
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

module.exports.generosUsuario = async function (userId) {
    const generosUsuario= await Puntuacion.aggregate([
        {
            '$match': {
                'usuario': mongoose.Types.ObjectId(userId),
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
    return generosUsuario;
}

module.exports.getRecomendacionesUsuario = async function (req, res) {
    let puntuadosUsuario = await this.puntuadosUsuario(req.user._id);
    let generosUsuario= await this.generosUsuario(req.user._id);
    let vistosUsuarios = await Lista.findOne({usuario:req.user._id,nombre:"Programas vistos"});
    let vistos=[];
    for (let i=0;i<vistosUsuarios.programas.length;i++) {
        vistos.push(mongoose.Types.ObjectId(vistosUsuarios.programas[i]));
    }

    if(puntuadosUsuario.length == 0 || generosUsuario.length == 0){
        res.status(200).json({"mensaje": "No se han podido realizar sugerencias, puntue más programas para tener su recomendación."})
    }else{
        vistos.concat(puntuadosUsuario[0].programa);
        const recomendaciones= await Programa.aggregate([
            {
            '$match': {
                '_id':{
                    '$nin': vistos
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