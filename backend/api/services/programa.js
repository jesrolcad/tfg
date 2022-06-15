const express = require('express');
const Programa = require('../../models/Programa');
const app = express();

module.exports.buscarPorTitulo = async function buscarPorTitulo(req, res) {

    let body = req.body;

//Hago la búsqueda 
   await Programa.find({
  
        $text: {
          $search: `"${body.palabras}"`
        }
      },
      {
        _id: 0 
      }).then((result) => {
        if(result.length > 0){ //Se han encontrado programas
            res.status(200).json({result});
            
        } else {
            res.status(200).json({"mensaje": "No se han encontrado programas"});
        }
      })
    }

module.exports.buscarPorGenero = async function buscarPorGenero(req, res){

        let body = req.body;

      
      await Programa.find({"generos": {"$elemMatch":{$eq:`${body.genero}`}}}).then((result) => {
        if(result.length > 0) {
            res.status(200).json({result});
        } else {
            res.status(200).json({"mensaje": "No se han encontrado programas con el género especificado"});
        }
      }) }


      module.exports.buscarPorPlataforma = async function buscarPorPlataforma(req, res){

        let body = req.body;
       
      await Programa.find({"plataformas": {"$elemMatch":{$eq:`${body.plataforma}`}}}).then((result) => {
        if(result.length > 0) {
            res.status(200).json({result});
        } else {
            res.status(200).json({"mensaje": "No se han encontrado programas con la plataforma especificado"});
        }
      }) }


      module.exports.buscarPorTipo = async function buscarPorTipo(req, res){

        let body = req.body;
       
       await Programa.find({"tipo": `${body.tipo}`}).then((result) => {
        if(result.length > 0) {
            res.status(200).json({result});
        } else {
            res.status(200).json({"mensaje": "No se han encontrado programas"});
        }
      }) }


