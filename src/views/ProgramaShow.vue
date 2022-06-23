<template>
<Navbar />
    <div class="Programa">
    <body style="margin-top: 80px;width: 1140px;height: 600px;">
        <div class="container">
            <div class="row">
                <div class="col-md-8" >
                    <div class="card col-4"><img class="card-img-top" v-if="programa.imagen" :src="programa.imagen">
                    <img class="card-img-top" v-if="!programa.imagen" src='..\..\public\placeholder.png'>
                        <div class="card-body" style="height: 130px;">
                            <h4 class="card-title" style="font-family: 'montserratbold';font-weight: bold;font-size: 20px;">Disponible en:</h4>
                            <div class="row gx-2">
                                <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('Netflix') !== -1" src='..\..\public\1.png'></div>
                                <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('Amazon Prime Video') !== -1" src='..\..\public\2.png'></div>
                                <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('HBO') !== -1" src='..\..\public\3.png'></div>
                                <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('Disney') !== -1" src='..\..\public\4.png'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card" style="width: auto;height: auto;">
                        <div class="card-header" style="background: transparent;">
                            <h1 class="text-start" style="font-size: 40px;margin-bottom: 25px;text-align: center;margin-top: 20px;"><strong>{{programa.titulo}} ({{moment(programa.fecha).locale('es').format("YYYY")}})</strong></h1>
                        </div>
                        <div class="card-body" style="width:auto;height: auto;">
                            <section>
                                <div class="btn-group btn-group-lg" role="group" style="border-radius: 0px;margin-left: 4px;"><button class="btn btn-primary" type="button" style="border-radius: 112px;"><i class="far fa-star"></i></button><button class="btn btn-primary" type="button" style="border-radius: 112px;margin-left: 10px;"><i class="far fa-star"></i></button><button class="btn btn-primary" type="button" style="border-radius: 112px;margin-left: 10px;"><i class="far fa-star"></i></button><button class="btn btn-primary" type="button" style="border-radius: 112px;margin-left: 10px;"><i class="far fa-star"></i></button></div>
                            </section>
                            <section style="margin: 0px;margin-top: 15px;">
                                <div class="row" style="margin: 0px;">
                                    <div class="col-xl-2"><button class="btn disabled" type="button" disabled="" style="font-family: abeezeeregular;font-weight: bolder;color: rgb(0,0,0);border-width: 3px;border-color: var(--bs-teal);" v-if="programa.clasificacion_edad"><strong>{{programa.clasificacion_edad}}</strong></button>
                                    <button class="btn disabled" type="button" disabled="" style="font-family: abeezeeregular;font-weight:bolder;color: rgb(0,0,0);border-width: 3px;border-color: var(--bs-teal);" v-if="!programa.clasificacion_edad"><strong>ND</strong></button>
                                    </div>
                                    <div class="col" style="padding-top: 12px;">
                                        <p style="height: auto;font-family: abeezeeregular;margin-top: 5px;padding-left: 5px;font-size: 20px;width: auto;">
                                        <span v-for="(genero,index) of programa.generos" :key="genero">{{genero}}<span v-if="index !== programa.generos.length-1">, </span></span>
                                        <strong v-if="(programa.generos).length!==0&&programa.duracion"> · </strong>
                                        {{programa.duracion}}</p>
                                    </div>
                                </div>
                            </section>
                            <section style="font-size: 23px;margin-top: 10x;">
                                <h3 class="text-start" style="font-family: montserratbold; font-size: 30px;margin: 0px;padding: 5px;text-align: center;margin-top: 5px;"><strong>Descripción:</strong></h3>
                                <p style="width: 680px;height: auto;font-family: abeezeeregular;margin-top: 5px;padding-left: 5px;font-size: 20px;">{{programa.descripcion}}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="actoresR.length!==0" class="row" style="margin-top:80px">
            <h1 style="width: 87px;">Reparto:</h1>
            <div class="card-group" >
                <div class="col-3" v-for="actor of actoresR" :key="actor._id">
                    <router-link :to="`/actor/${actor.nombre}`">
                    <img v-if="actor.imagen_actor" class="card-img-top" :src="actor.imagen_actor"></router-link>
                    <router-link :to="`/programa/${programa._id}`">
                    <img class="card-img-top" v-if="!actor.imagen_actor" src='..\..\public\placeholder_actor.png'></router-link>
                    <div class="card-body" style="margin: 10px; height: max-content;">
                        <h4 class="card-title">{{actor.nombre}}</h4>
                        <small style="font-family:abeezeeregular;">{{actor.personaje}}</small>
                    </div>
                </div>
            </div>
            </div>
            <div v-if="actoresR.length===0" class="row" style="margin-top:100px">
            <h1 style="font-family:montserratbold; font-size: 30px;">Reparto no disponible</h1>
            </div>
        </div>
    </body>
    </div>
</template>
<script>
import Navbar from './Navbar.vue'
import moment from 'moment'
class Programa{
        constructor(_id,tipo,titulo,fecha,imagen,generos,duracion,clasificacion_edad,actoresIds){
            this._id=_id;
            this.tipo=tipo;
            this.titulo=titulo;
            this.fecha=fecha;
            this.imagen= imagen;
            this.generos=generos;
            this.duracion=duracion;
            this.clasificacion_edad=clasificacion_edad;
            this.actoresIds=actoresIds;
        }
    }

export default {
    data(){
        return{
            programa: new Programa(),
            programas:[],
            actores:[],
            actoresR:[],
            id: this.$route.params.id,
        }
    },
    created(){
        this.getPrograma()
    },
    methods:{
        getPrograma(){
            fetch('http://localhost:5000/programas/'+ this.id)
                .then(res=> res.json())
                .then(data => {
                    this.programa=data;
                    this.actores=this.programa.actoresIds;
                }).then(()=>{this.getActores()});
        },
        moment,
        getActores(){
            console.log(this.programa)
            console.log(this.actores)
            fetch('http://localhost:5000/actores/programa',
                {   method: 'POST',
                    headers: {'Accept': 'application/json','Content-type':'application/json'},
                    body: JSON.stringify(this.actores)
                })
                .then(res=> res.json())
                .then(data => {
                    this.actoresR=data;
                });
        }
    },components: {
            Navbar
    }
}
</script>

<style>
.card{
    margin: 20px;
    font-family: 'montserratbold';
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: none;
    width: 280px;
    margin-top: 12.5px;
    margin-bottom: 0px;
    margin-right: 0px;margin-left: 0px;
}
.card-img-top {
    border-radius: 20px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}
.col-xl-2{
    width: auto;
    padding-top: 12px;
}
.col-md-8{
    width: 320px;
    padding: 0px;
    height: 550px;
}
.col-md-4{
    width: 790px;
    height: 550px;
}
.col-3{
    margin: 20px;
    margin-block-end: 20px;
    width: 150px;
    height: auto;
    font-family: montserratbold;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style:none;
}


</style>