<template>
<Navbar />
    <div class="Programas" >
        <Filtros @escucharFiltros="filtrados" style="margin-top:10%"/>
        <Buscador @escucharBusqueda="buscados" style="margin-top:5%" />
        
    <div v-if="programasFiltrados.length==0 && programasBuscados.length==0" class="card-group" style="justify-content: space-evenly;">
        dentro del if 1
        <div class="col-3" v-for="programa of displayedProgramas" :key="programa._id" >
            <router-link :to="`/programa/${programa._id}`"><img class="card-img-top w-100 d-block"
                        :src="programa.imagen || 'placeholder.png'"> </router-link>
            <div class="card-body" style="margin: 10px">
                <h4 class="card-title">{{programa.titulo}}</h4>
                <small>{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
            </div>
        </div>
    </div>
    <div v-else-if="programasBuscados.length!=0" class="card-group" style="justify-content: space-evenly;">
        dentro del if 2
        {{programasBuscados.length}}
        <div class="col-3" v-for="programa of displayedProgramasB" :key="programa._id" >
            <router-link :to="`/programa/${programa._id}`"><img class="card-img-top w-100 d-block"
                        :src="programa.imagen || 'placeholder.png'"> </router-link>
            <div class="card-body" style="margin: 10px">
                <h4 class="card-title">{{programa.titulo}}</h4>
                <small>{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
            </div>
        </div>
    </div>
    <div v-else-if="programasBuscados.mensaje" class="card-group" style="justify-content: space-evenly;">
        dentro del if 3
        {{programasBuscados.mensaje}}
    </div>
    <div v-else-if="programas.mensaje" class="card-group" style="justify-content: space-evenly;">
        dentro del if 4
        {{programas.mensaje}}
    </div>
    <div v-else-if="programasFiltrados.mensaje" class="card-group" style="justify-content: space-evenly;">
        dentro del if 5
        {{programasFiltrados.mensaje}}
    </div>
    <div v-else class="card-group" style="justify-content: space-evenly;" >
        dentro del if 6
        <div class="col-3" v-for="programa of displayedProgramasF" :key="programa._id">
            <router-link :to="`/programa/${programa._id}`"><img class="card-img-top w-100 d-block"
                        :src="programa.imagen || 'placeholder.png'"> </router-link>
            <div class="card-body" style="margin: 10px">
                <h4 class="card-title">{{programa.titulo}}</h4>
                <small style="font-family:abeezeeregular;">{{moment(programa.fecha).locale('es').format("D MMM YYYY")}}</small>
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
    import Navbar from './Navbar.vue'
    import Footer from './Footer.vue'
    import Filtros from './Filtros.vue'
    import moment from 'moment'
    import Buscador from './Buscador.vue'

    class Programa{
        constructor(_id,tipo,titulo,fecha,imagen){
            this._id=_id;
            this.tipo=tipo;
            this.titulo=titulo;
            this.fecha=fecha;
            this.imagen= imagen;
        }
    }
    export default {
        data(){
            return{
                programa: new Programa(),
                programas:[],
                baseURL: "http://localhost:5000",
                page: 1,
                perPage: 21,
                pages: [],
                programasFiltrados:[],
                programasBuscados:[]
            }
        },
        created(){
            this.getProgramas()
        },
        methods:{
            getProgramas(){
                fetch(this.baseURL+'/programas/all', {
                    headers:{
                            'Authorization':sessionStorage.getItem("token")
                    }
                })
                    .then(res=> res.json())
                    .then(data => {
                        this.programas=data;
                    });
            },
            moment,
            setProgramas(programas) {
                let numberOfPages = Math.ceil(programas.length / this.perPage);
                for (let i = 1; i <= numberOfPages; i++) {
                    this.pages.push(i);
            }
            },
            paginate(programas) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return programas.slice(from, to);
            },
            filtrados(value){
                this.programasFiltrados = value;
            },
            buscados(value){
                this.programasBuscados = value;
            }
        },
        components: {
            Navbar,
            Footer,
            Filtros,
            Buscador
        },watch: {
            programas(){
                this.setProgramas(this.programas);
            },
            programasF(){
                this.setProgramas(this.programasFiltrados);
            },
            programasBuscados(){
                this.setProgramas(this.programasBuscados);
            }
        },
        computed: {
            displayedProgramas: function () {
            return this.paginate(this.programas);
            },
            displayedProgramasF: function () {
            return this.paginate(this.programasFiltrados);
            },
            displayedProgramasB: function () {
            return this.paginate(this.programasBuscados);
            },
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