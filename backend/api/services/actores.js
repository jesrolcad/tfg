const Actor=require('../../models/Actor');

module.exports.getActoresPrograma = async (req,res) => {
    const actores_ids=req.body;
    const result=[];
    for (const id of actores_ids) {
        const actor= await Actor.findById(id);
        result.push(actor);
    }
    res.json(result);
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
    res.json(personajes);
}