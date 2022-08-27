<template>
    <Navbar style="margin-bottom:10%" />
    <div class="Buscador">
        <div class="input" style="width:90%;margin-left:5%">
            <div class="input-group mb-3" >
                <input type="text" class="form-control" placeholder="Buscar una película, serie..." v-model="titulo" aria-describedby="button-addon2">
                <button class="btn btn-outline-light"  style="background: linear-gradient(120deg, #78D5F5 0%, #787FF6 24%, #4ADEDE 49%, #1CA7EC 75%, #1F2F98 100%);" type="button" id="button-addon2" v-on:click="buscarProgramas()">Buscar</button>
            </div>
        </div>
        <div v-if="buscados.mensaje" style="justify-content: space-evenly;width:90%;margin-left:5%">
            {{buscados.mensaje}}
        </div>
        <div v-else class="card-group" style="justify-content: space-evenly;">
            <div class="col-3" v-for="programa of displayedProgramas" :key="programa._id" >
                <router-link :to="`/programa/${programa._id}`"><img class="card-img-top w-100 d-block"
                            :src="programa.imagen || 'placeholder.png'"> </router-link>
                <div class="card-body" style="margin: 10px">
                    <h4 class="card-title">{{programa.titulo}}</h4>
                    <small>{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
                </div>
            </div>
        </div>
        <div class="btn-group col-md-2 offset-md-5">
            <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                v-if="page != 1"
                @click="page--"
            >Anterior</button>
            <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                v-for="pageNumber in pages.slice(page-1, page+5)"
                @click="page = pageNumber"
                :key="pageNumber"
            >{{pageNumber}}</button>
            <button
                type="button"
                @click="page++"
                v-if="page < pages.length"
                class="btn btn-sm btn-outline-secondary"
            >Siguiente</button>
        </div>
    </div>
    <Footer />
</template>
<script>
//import emitter from '../emitter'
import moment from 'moment'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
export default {
    data() {
    return {
        baseURL: 'https://whattowatch-app.herokuapp.com',
        titulo: [],
        buscados:[],
        page: 1,
        perPage: 21,
        pages: [],
    }
    },
    methods:{
        async buscarProgramas(){
            await fetch(this.baseURL+ '/programas/nombre',
                    {   method: 'POST',
                        headers: {'Authorization': sessionStorage.getItem("token"),'Accept': 'application/json','Content-type':'application/json'},
                        body: JSON.stringify({"titulo":this.titulo})
                    })
                    .then(res=> res.json())
                    .then(data => {
                        this.buscados=data;
                    });
        console.log(this.buscados.length)
        //emitter.emit('busqueda',this.buscados);
        //this.$emit('escucharBusqueda',this.buscados)
        },
        setProgramas(programas) {
                let numberOfPages = Math.ceil(programas.length / this.perPage);
                for (let i = 1; i <= numberOfPages; i++) {
                    this.pages.push(i);
            }
            console.log(this.pages)
            },
        paginate(programas) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return programas.slice(from, to);
        },
        moment
    },watch: {
        programas(){
            this.setProgramas(this.buscados);
        }
    },
    computed: {
        displayedProgramas: function () {
                return this.paginate(this.buscados);
        }
        /*buscador: function () {
            emitter.on('busqueda', (e) => {
                console.log("App:on('busqueda')", e);
                this.buscados=e;
            });
            return this.buscados;
        }*/
    },
    components: {
        Navbar,
        Footer
    }
}
</script>
<style scoped>
.col-3{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    font-family: montserratbold;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: none;
}
.card-img-top{
    border-radius: 20px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}
</style>