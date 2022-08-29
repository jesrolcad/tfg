const Actor=require('../../models/Actor');
const mongoose = require('mongoose');
const { ids } = require('webpack');

module.exports.getActoresPrograma = async (req,res) => {
    if( req.body instanceof Array ) {
      const actores_ids=req.body;
      if(actores_ids.length==0){
        return res.status(400).json({
          status: 400,
          key: "idsVacios",
          msg: "No se han enviado ids de actores"
        });
      }
      const result=[];
      for (const id of actores_ids) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              status: 400,
              key: "idActorInvalido",
              msg: "El id de actor no es válido"
            });
        }
        const actor= await Actor.findById(id);
        result.push(actor);
      }
      res.status(200).json(result);
    }else{
      return res.status(400).json({
        status: 400,
        key: "bodyInvalido",
        msg: "El body no es válido, debe ser un Array"
      });
    }
}

module.exports.getActorByName = async (req,res) => {
    const nombre=req.params.nombre.trim();
    //const personajes= await Actor.find({"nombre": nombre}).select({_id:0,nombre:0});
    const personajes= await Actor.aggregate([
        {
        '$match': {
            'nombre': nombre
          }
        }, {
          '$lookup': {
            'from': 'programas',
            'localField': 'titulo_url',
            'foreignField': 'titulo_url',
            'as': 'programas_actores'
          }
        }, {
          '$project': {
            '_id': 0,
            'nombre': 1,
            'personaje': 1,
            'titulo': 1,
            'titulo_url':1,
            'num_episodios': 1,
            'imagen_actor': 1,
            'programas_actores._id':1,
            'programas_actores.imagen': 1,
            'programas_actores.fecha': 1
          }
        }, {
          '$match': {
            'programas_actores': {
              '$exists': true,
              '$not': {
                '$size': 0
              }
            }
          }
        }, {
            '$sort': {
              'programas_actores.fecha': -1
            }
        }
      ]);
      if(personajes.length==0){
        return res.status(400).json({mensaje:"No se encontraron personajes del actor."});
      }
      const boolean= await Actor.aggregate([
        [
          {
            '$match': {
              'nombre': nombre
            }
          }, {
            '$set': {
              'movie': {
                '$cond': {
                  'if': {
                    '$regexFind': {
                      'input': '$titulo_url',
                      'regex': '/movie/'
                    }
                  },
                  'then': true,
                  'else': false
                }
              }
            }
          }, {
            '$set': {
              'serie': {
                '$cond': {
                  'if': {
                    '$regexFind': {
                      'input': '$titulo_url',
                      'regex': '/tv/'
                    }
                  },
                  'then': true,
                  'else': false
                }
              }
            }
          }, {
            '$group': {
              '_id': 'nuevo_id',
              'movie': {
                '$addToSet': '$movie'
              },
              'serie': {
                '$addToSet': '$serie'
              }
            }
          }
        ]
      ]);
    let movie = false;
    if(boolean[0].movie.includes(true)){
      movie=true;
    }
    let serie = false;
    if(boolean[0].serie.includes(true)){
      serie = true;
    }
    res.status(200).json({personajes:personajes, movie: movie, serie:serie});
}