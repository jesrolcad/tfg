
<template>
    <div class="Programas">
        <h1 style="font-family:montserratbold;">Programas</h1>
    </div>
    <div class="card-group" >
        <div class="col-3" style="margin: 20px;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,
        Helvetica Neue,sans-serif;border-radius: 20px;box-shadow: 0px 0px 5px var(--bs-gray-400);border-style: none;"  v-for="programa of displayedProgramas">
            <img class="card-img-top w-100 d-block" style="border-radius: 20px;border-bottom-right-radius: 0px;border-bottom-left-radius: 0px;" :src="programa.imagen || 'placeholder.png'"> 
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
        >&lt;&lt;</button>
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
        >>></button>
      </div>
</template>
<script>
    import moment from 'moment'
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
                pages: []
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
            setProgramas() {
                let numberOfPages = Math.ceil(this.programas.length / this.perPage);
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
            }
        },
        watch: {
            programas(){
                this.setProgramas();
            }
        },
        computed: {
            displayedProgramas: function () {
            return this.paginate(this.programas);
            }
        }
    }
</script>
<style>
.col-3{
    margin: 20px;
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