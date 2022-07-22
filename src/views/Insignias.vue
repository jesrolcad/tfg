<template>
    
</template>
<script>
export default{
    methods: {
        async getProgramasVistos() {
            await fetch(this.baseURL+'/insignias/programas',
            {method: 'GET',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.sugeridos = data;
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
                    this.sugeridos = data;
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
                    this.sugeridos = data;
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
                    this.sugeridos = data;
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
                    this.sugeridos = data;
                });
            //this.$emit('escucharSugerencias',this.sugeridos)
        }
    }
}
</script>
