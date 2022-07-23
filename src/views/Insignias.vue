<template>
    <div id="Insignias">

    </div>
</template>
<script>
export default{
    data(){
        return{
            baseURL: "http://localhost:5000",
            programasVistos:[],
            generosVistos:[],
            actoresVistos:[],
            listas:[],
            programasListas:[]
        }
    },
    props: ['listener'],
    watch: {
        listener: async function() {
            await this.getProgramasVistos();
            console.log(JSON.stringify(this.programasVistos))cOM
        }
    },
    methods: {
        async getProgramasVistos() {
            await fetch(this.baseURL+'/insignias/programas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.programasVistos = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        },
        async getGenerosProgramasVistos() {
            await fetch(this.baseURL+'/insignias/generos',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.generosVistos = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        },
        async getActoresProgramasVistos() {
            await fetch(this.baseURL+'/insignias/actores',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.actoresVistos = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        },
        async getListasPropias() {
            await fetch(this.baseURL+'/insignias/listas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.listas = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        },
        async getProgramasListasPropias() {
            await fetch(this.baseURL+'/insignias/listas-programas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.programasListas = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        }
    }
}
</script>
