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
