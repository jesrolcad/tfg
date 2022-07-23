<template>
    <Navbar />
    <div class="Programa">

        <body style="margin-top: 80px;width: 1140px;height: 600px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card col-4"><img class="card-img-top" v-if="programa.imagen" :src="programa.imagen">
                            <img class="card-img-top" v-if="!programa.imagen" src='..\..\public\placeholder.png'>
                            <div class="card-body" style="height: 130px;">
                                <h4 class="card-title"
                                    style="font-family: 'montserratbold';font-weight: bold;font-size: 20px;">Disponible
                                    en:</h4>
                                <div class="row gx-2">
                                    <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('Netflix') !== -1"
                                            src='..\..\public\1.png'></div>
                                    <div class="col-xl-3"><img
                                            v-if="(programa.plataformas).indexOf('Amazon Prime Video') !== -1"
                                            src='..\..\public\2.png'></div>
                                    <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('HBO') !== -1"
                                            src='..\..\public\3.png'></div>
                                    <div class="col-xl-3"><img v-if="(programa.plataformas).indexOf('Disney') !== -1"
                                            src='..\..\public\4.png'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card" style="width: auto;height: auto;">
                            <div class="card-header" style="background: transparent;">
                                <h1 class="text-start"
                                    style="font-size: 40px;margin-bottom: 25px;text-align: center;margin-top: 20px;">
                                    <strong>{{ programa.titulo }}
                                        ({{ moment(programa.fecha).locale('es').format("YYYY") }})</strong>
                                </h1>
                            </div>
                            <div class="card-body" style="width:auto;height: auto;">
                                <section class="buttons">
                                    <div class="btn-group btn-group-lg" role="group"
                                        style="border-radius: 0px;margin-left: 4px;">

                                        <Insignias :listener="trigger" />
                                        <button class="border border-0 bg-transparent" v-if="!programaEstaVisto" v-on:click="setProgramaVisto();"
                                            title="Añadir a programas vistos"
                                            style="border-radius: 80px;margin-right: 10px;">
                                            <font-awesome-icon icon="fa-solid fa-eye" class=" lista-botones fa-xl" />
                                        </button>

                                        <button class="border border-0 bg-transparent" v-if="programaEstaVisto" v-on:click="deleteProgramaVisto();"
                                            title="Eliminar de programas vistos"
                                            style="border-radius: 80px;margin-right: 10px;">
                                            <font-awesome-icon icon="fa-solid fa-eye" class="fa-xl added-to-list" />
                                        </button>

                                        <button class="border border-0 bg-transparent" v-if="!programaEstaEnSeguimiento" v-on:click="setProgramaSeguimiento();"
                                            title="Añadir a programas en seguimiento" style="border-radius: 120px;">
                                            <font-awesome-icon icon="fa-solid fa-bookmark" class="fa-xl" />
                                        </button>

                                        <button class="border border-0 bg-transparent" v-if="programaEstaEnSeguimiento"
                                            v-on:click="deleteProgramaSeguimiento();"
                                            title="Eliminar de programas en seguimiento" style="border-radius: 120px;">
                                            <font-awesome-icon icon="fa-solid fa-bookmark"
                                                class="fa-xl added-to-list" />
                                        </button>

                                         <AddProgramaLista></AddProgramaLista>

                                         <Sugerencias :id="id" :generos="programa.generos" @escucharSugerencias="sugeridos" :show="show" />

                                        <form title="Puntuar programa" v-on:submit.prevent>
                                            <star-rating :star-size="33" :show-rating="false"
                                                v-model:rating="this.puntuacion" v-on:click="puntuarPrograma();" />
                                        </form>


                                        <!-- <button class="btn btn-primary"
                                            type="button" style="border-radius: 112px;margin-left: 10px;"><i
                                                class="far fa-star"></i></button> -->

                                                 
                                    </div>
                                    
                                </section>

                                <div class="progress-bar">
                                    <ve-progress :progress="porcentajePuntuacionMedia" :legend="this.puntuacionMedia.media" :size="55">

                                    <template #legend>
                                        <span>/5</span>
                                    </template>
                                    
                                    </ve-progress>
                                    
                                </div>

                            <div>
                                <p v-if="this.puntuacionMedia.numPuntuaciones == 0" class="legend-caption">0 puntuaciones</p>
                                <p v-if="this.puntuacionMedia.numPuntuaciones == 1" class="legend-caption">{{this.puntuacionMedia.numPuntuaciones}} puntuación</p>
                                <p v-if="this.puntuacionMedia.numPuntuaciones > 1" class="legend-caption">{{this.puntuacionMedia.numPuntuaciones}} puntuaciones</p>
                                
                            </div>

                            
                                <section style="margin: 0px;margin-top: 45px;">
                                    <div class="row" style="margin: 0px;">
                                        <div class="col-xl-2"><button class="btn disabled" type="button" disabled=""
                                                style="font-family: abeezeeregular;font-weight: bolder;color: rgb(0,0,0);border-width: 3px;border-color: var(--bs-teal);"
                                                v-if="programa.clasificacion_edad"><strong>{{
                                                        programa.clasificacion_edad
                                                }}</strong></button>
                                            <button class="btn disabled" type="button" disabled=""
                                                style="font-family: abeezeeregular;font-weight:bolder;color: rgb(0,0,0);border-width: 3px;border-color: var(--bs-teal);"
                                                v-if="!programa.clasificacion_edad"><strong>ND</strong></button>
                                        </div>
                                        <div class="col" style="padding-top: 12px;">
                                            <p
                                                style="height: auto;font-family: abeezeeregular;margin-top: 5px;padding-left: 5px;font-size: 20px;width: auto;">
                                                <span v-for="(genero, index) of programa.generos" :key="genero">{{
                                                        genero
                                                }}<span v-if="index !== programa.generos.length - 1">,
                                                    </span></span>
                                                <strong v-if="(programa.generos).length !== 0 && programa.duracion"> ·
                                                </strong>
                                                {{ programa.duracion }}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                                <section style="font-size: 23px;">
                                    <h3 class="text-start"
                                        style="font-family: montserratbold; font-size: 30px;margin: 0px;padding: 5px;text-align: center;margin-top: 5px;">
                                        <strong>Descripción:</strong>
                                    </h3>
                                    <p
                                        style="width: 680px;height: auto;font-family: abeezeeregular;margin-top: 5px;padding-left: 5px;font-size: 20px;">
                                        {{ programa.descripcion }}</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="actoresR.length !== 0" class="row" style="margin-top:80px">
                    <h1 style="width: 87px;">Reparto:</h1>
                    <div class="card-group">
                        <div class="col-3" v-for="actor of actoresR" :key="actor._id">
                            <router-link :to="`/actor/${actor.nombre}`">
                                <img v-if="actor.imagen_actor" class="card-img-top" :src="actor.imagen_actor">
                            </router-link>
                            <router-link :to="`/programa/${programa._id}`">
                                <img class="card-img-top" v-if="!actor.imagen_actor"
                                    src='..\..\public\placeholder_actor.png'>
                            </router-link>
                            <div class="card-body" style="margin: 10px; height: max-content;">
                                <h4 class="card-title">{{ actor.nombre }}</h4>
                                <small style="font-family:abeezeeregular;">{{ actor.personaje }}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="actoresR.length === 0" class="row" style="margin-top:100px">
                    <h1 style="font-family:montserratbold; font-size: 30px;">Reparto no disponible</h1>
                </div>
            </div>
        </body>
    </div>
</template>


<script>
import Navbar from './Navbar.vue';
import Sugerencias from './Sugerencias.vue'
import AddProgramaLista from './AddProgramaLista.vue';
import moment from 'moment';
import { useToast } from "vue-toastification";
import StarRating from 'vue-star-rating';
import {VeProgress} from "vue-ellipse-progress";
import Insignias from './Insignias.vue'




class Programa {
    constructor(_id, tipo, titulo, fecha, imagen, generos, duracion, clasificacion_edad, actoresIds) {
        this._id = _id;
        this.tipo = tipo;
        this.titulo = titulo;
        this.fecha = fecha;
        this.imagen = imagen;
        this.generos = generos;
        this.duracion = duracion;
        this.clasificacion_edad = clasificacion_edad;
        this.actoresIds = actoresIds;
    }
}

export default {
    data(){
        return{
            baseURL: "http://localhost:5000",
            programa: new Programa(),
            programas: [],
            actores: [],
            actoresR: [],
            listas: [],
            lista: [],
            puntuacion: 0,
            puntuacionMedia: {},
            id: this.$route.params.id,
            programasSugeridos:[],
            trigger: false
        }
    },
    created() {
        this.getPrograma(),
        this.getListas(),
        this.getPuntuacionPrograma(),
        this.getPuntuacionMediaPrograma()
    },

    methods: {
        getPrograma() {
            fetch(this.baseURL+'/programas/'+ this.id, { headers: { 'Authorization': sessionStorage.getItem("token") } })
                .then(res => res.json())
                .then(data => {
                    this.programa = data;
                    this.actores = this.programa.actoresIds;
                }).then(() => { this.getActores() });
        },
        moment,
        getActores(){
            fetch(this.baseURL+'/actores/programa',
                {   method: 'POST',
                    headers: {'Accept': 'application/json','Content-type':'application/json'},
                    body: JSON.stringify(this.actores)
                })
                .then(res => res.json())
                .then(data => {
                    this.actoresR = data;
                });
        },

        getListas() {
            fetch(this.baseURL +  "/listas", { headers: { 'Authorization': sessionStorage.getItem("token") } })
                .then(res => res.json())
                .then(data => {
                    this.listas = data;
                    console.log(this.listas);
                })
        },

        setProgramaVisto() {

            //Se obtiene el json de programas
            let jsonProgramasVistos = this.listas.find(l => l.lista.nombre === "Programas vistos");
            fetch(this.baseURL+'/lista/' + jsonProgramasVistos.lista._id + '/agregar/' + this.programa._id,
                {
                    headers: { 'Authorization': sessionStorage.getItem("token") },
                    method: 'PUT',
                });

            //Se obtiene la lista modificada y se añade el programa
            let listaModificada = jsonProgramasVistos.lista;
            listaModificada.programas.push(this.programa._id);

            //Se actualiza la propiedad lista del json
            jsonProgramasVistos.lista = listaModificada;

            let index = this.listas.findIndex(l => l.lista.nombre === "Programas vistos");

            //Se actualiza el json de las listas
            this.listas[index] = jsonProgramasVistos;

            const toast = useToast();

            toast.success("Programa añadido a Programas vistos",
                {
                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                    icon: true, rtl: false
                });
            this.trigger= !this.trigger;
        },

        deleteProgramaVisto() {

            //Se obtiene el json de programas
            let jsonProgramasVistos = this.listas.find(l => l.lista.nombre === "Programas vistos");
            fetch(this.baseURL+'/lista/' + jsonProgramasVistos.lista._id + '/borrar/' + this.programa._id,
                {
                    headers: { 'Authorization': sessionStorage.getItem("token") },
                    method: 'PUT',
                });

            //Se obtiene la lista modificada y se añade el programa
            let listaModificada = jsonProgramasVistos.lista;
            let indexPrograma = listaModificada.programas.indexOf(this.programa._id);
            listaModificada.programas.splice(indexPrograma, 1);

            //Se actualiza la propiedad lista del json
            jsonProgramasVistos.lista = listaModificada;

            let index = this.listas.findIndex(l => l.lista.nombre === "Programas vistos");

            //Se actualiza el json de las listas
            this.listas[index] = jsonProgramasVistos;

            //Se elimina la puntuacion
            this.puntuacion = 0;

            const toast = useToast();

            toast.success("Programa eliminado de Programas vistos",
                {
                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                    icon: true, rtl: false
                });


        },

        setProgramaSeguimiento() {
            let jsonProgramasSeguimiento = this.listas.find(l => l.lista.nombre === "En seguimiento");
            fetch(this.baseURL+'/lista/' + jsonProgramasSeguimiento.lista._id + '/agregar/' + this.programa._id,
                {
                    headers: { 'Authorization': sessionStorage.getItem("token") },
                    method: 'PUT',
                });


            //Se obtiene la lista modificada y se añade el programa
            let listaModificada = jsonProgramasSeguimiento.lista;
            listaModificada.programas.push(this.programa._id);

            //Se actualiza la propiedad lista del json
            jsonProgramasSeguimiento.lista = listaModificada;

            let index = this.listas.findIndex(l => l.lista.nombre === "En seguimiento");

            //Se actualiza el json de las listas
            this.listas[index] = jsonProgramasSeguimiento;

            const toast = useToast();

            toast.success("Programa añadido a En seguimiento",
                {
                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                    icon: true, rtl: false
                });

        },

        deleteProgramaSeguimiento() {
            let jsonProgramasSeguimiento = this.listas.find(l => l.lista.nombre === "En seguimiento");

            fetch(this.baseURL+'/lista/' + jsonProgramasSeguimiento.lista._id + '/borrar/' + this.programa._id,
                {
                    headers: { 'Authorization': sessionStorage.getItem("token") },
                    method: 'PUT',
                });

            //Se obtiene la lista modificada y se añade el programa
            let listaModificada = jsonProgramasSeguimiento.lista;
            let indexPrograma = listaModificada.programas.indexOf(this.programa._id);
            listaModificada.programas.splice(indexPrograma, 1);

            //Se actualiza la propiedad lista del json
            jsonProgramasSeguimiento.lista = listaModificada;

            let index = this.listas.findIndex(l => l.lista.nombre === "En seguimiento");

            //Se actualiza el json de las listas
            this.listas[index] = jsonProgramasSeguimiento;

            const toast = useToast();

            toast.success("Programa eliminado de En seguimiento",
                {
                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                    icon: true, rtl: false
                });


        },

        getPuntuacionPrograma() {
            fetch('http://localhost:5000/puntuaciones/' + this.id, {
                headers: { 'Authorization': sessionStorage.getItem("token") },
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    this.puntuacion = json.puntuacion;
                });
        },

        getPuntuacionMediaPrograma() {
            fetch('http://localhost:5000/puntuaciones/media/' + this.id, {
                headers: { 'Authorization': sessionStorage.getItem("token") },
                method: 'GET',
            })
                .then(res => res.json())
                .then(json => {
                    this.puntuacionMedia = json.puntuacionMedia;
                });
        },

        async puntuarPrograma() {

            let jsonProgramasVistos = this.listas.find(l => l.lista.nombre === "Programas vistos");
            console.log(jsonProgramasVistos);
            console.log(this.programa._id);
            await fetch('http://localhost:5000/puntuaciones/' + this.programa._id,
                {
                    headers: { 'Authorization': sessionStorage.getItem("token"), 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({
                        puntuacion: this.puntuacion
                    })
                }).then(res => res.json()).then(json => {
                    if (json.status !== 400) {

                        const toast = useToast();

                        this.getPuntuacionPrograma();
                        this.getPuntuacionMediaPrograma();

                        toast.success("Programa puntuado correctamente",
                            {
                                position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                                draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                                icon: true, rtl: false
                            });

                    } else {
                        this.puntuacion = 0;
                        const toast = useToast();
                            toast.error(json.message,
                                {
                                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                                    icon: true, rtl: false
                                });

                    }


                });


        },

    },

    computed: {
        programaEstaVisto() {
            let lista = this.listas.find(l => l.lista.nombre === "Programas vistos").lista;
            let programas = lista.programas;
            return programas.includes(this.programa._id);
        },

        programaEstaEnSeguimiento() {
            let lista = this.listas.find(l => l.lista.nombre === "En seguimiento").lista;
            let programas = lista.programas;
            return programas.includes(this.programa._id);
        },

        porcentajePuntuacionMedia() {
            return (this.puntuacionMedia.media * 100) / 5;
        }

    },


    components: {
        Navbar,
        StarRating,
        VeProgress,
        Sugerencias,
        Insignias,
        AddProgramaLista
    }
}
</script>

<style scoped>
.card{
    margin: 20px;
    font-family: 'montserratbold';
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: none;
    width: 280px;
    margin-top: 12.5px;
    margin-bottom: 0px;
    margin-right: 0px;
    margin-left: 0px;
}

.card-img-top {
    border-radius: 20px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}

.col-xl-2 {
    width: auto;
    padding-top: 12px;
}

.col-md-8 {
    width: 320px;
    padding: 0px;
    height: 550px;
}

.col-md-4 {
    width: 790px;
    height: 550px;
}

.col-3 {
    margin: 20px;
    margin-block-end: 20px;
    width: 150px;
    height: auto;
    font-family: montserratbold;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: none;
}

.added-to-list {
    color: #0E4CBF;
}


.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}

.legend-caption {

    font-size: 0.7em;

    color: #000;

    position: relative;

    top: 30px;

    left: 485px;

    

}

.progress-bar {
    /* set margin left */
    margin-left: 425px;
    /* set padding */
    position: relative;
    /* set top */
    top: 25px;
    /* set left */
    left: 70px;

   

}

.buttons {

    position: relative;
    margin-bottom: -80px;   

}


</style>