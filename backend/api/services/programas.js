
const Programa=require('../../models/Programa');

module.exports.getAllProgramas = async (req,res) => {
    const programas= await Programa.find()
        .select({ "titulo": 1, "tipo":1, "fecha":1, "imagen":1, "_id": 0})
        .sort({fecha:'desc'}).limit(21);

        
    res.json(programas);
}