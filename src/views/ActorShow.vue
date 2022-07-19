<template>
<Navbar style="margin-bottom: 100px" />
<div class="Actor">
    <h1><img v-if="personajes[0].imagen_actor" class="rounded shadow mb-5" style="margin-right:5px;width:100px;height:100px" :src="personajes[0].imagen_actor">
        <img v-if="!personajes[0].imagen_actor" class="rounded shadow mb-5" style="margin-right:5px;width:100px;height:100px" src="../../public/placeholder_actor.png">
    {{id}}</h1>
    <div style="margin-top: 35px;">
        <h1>Películas</h1>
        <div class="table-responsive">
            <table class="table table-borderless">
                <thead class="thead">
                    <tr>
                        <th></th>
                        <th><button type="button" class="btn btn-lg btn-primary" disabled>Título</button></th>
                        <th><button type="button" class="btn btn-lg btn-primary" disabled>Personaje</button></th>
                    </tr>
                </thead>
                <tbody class="tbody" v-for="personaje of personajes" :key="personaje.titulo_url">
                    <tr v-if="personaje.titulo_url.indexOf('/movie/')!== -1">
                        <td><router-link :to="`/programa/${personaje.programas_actores[0]._id}`"><img v-if="personaje.programas_actores[0].imagen" class="rounded shadow mb-4" style="height:195px; width:125px" :src="personaje.programas_actores[0].imagen">
                        <img v-if="!personaje.programas_actores[0].imagen" class="rounded shadow mb-4" style="height:195px; width:125px" src="../../public/placeholder.png"></router-link></td>
                        <td>{{personaje.titulo}} ({{moment(personaje.programas_actores[0].fecha).locale('es').format("YYYY")}})</td>
                        <td>{{personaje.personaje}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <h1>Series</h1>
        <div class="table-responsive">
            <table class="table table-borderless">
                <thead class="thead">
                    <tr >
                        <th></th>
                        <th><button type="button" class="btn btn-lg btn-primary" disabled>Título</button></th>
                        <th><button type="button" class="btn btn-lg btn-primary" disabled>Personaje</button></th>
                        <th><button type="button" class="btn btn-lg btn-primary" disabled>Número Episodios</button></th>
                    </tr>
                </thead>
                <tbody class="tbody" v-for="personaje of personajes" :key="personaje.titulo_url">
                    <tr v-if="personaje.titulo_url.indexOf('/tv/')!== -1">
                        <td><router-link :to="`/programa/${personaje.programas_actores[0]._id}`">
                        <img v-if="personaje.programas_actores[0].imagen" class="rounded shadow mb-4" style="height:195px; width:125px" :src="personaje.programas_actores[0].imagen">
                        <img v-if="!personaje.programas_actores[0].imagen" class="rounded shadow mb-4" style="height:195px; width:125px" src="../../public/placeholder.png">
                        </router-link></td>
                        <td>{{personaje.titulo}} ({{moment(personaje.programas_actores[0].fecha).locale('es').format("YYYY")}})</td>
                        <td>{{personaje.personaje}}</td>
                        <td>{{personaje.num_episodios}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<Footer />
</template>
<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import moment from 'moment'
export default {
    data() {
        return{
            id: this.$route.params.id,
            personajes:[]
        }
    },
    created(){
        this.getPersonaje()
    },
    methods:{
        getPersonaje(){
            fetch('http://localhost:5000/actores/'+ this.id)
                .then(res=> res.json())
                .then(data => {
                    this.personajes=data;
                });
        },
        moment
    },components: {
        Navbar,
        Footer
    }
}
</script>
<style scoped>
.table{
    vertical-align: middle; text-align: center;
}
.tbody{
    font-family: abeezeeregular;
    font-size:18px;
}
.thead{
    font-family: montserratbold;font-size:25px;
}
</style>