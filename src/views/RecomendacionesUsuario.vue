<template>
    <div class="RecomendacionesUsuario">
        {{recomendados}}
    </div>
</template>
<script >
export default{
    data() {
        return{
            baseURL: "http://localhost:5000",
            recomendados :[],
        }
    },
    created(){
        this.getRecomendado(),
        console.log(this.recomendados);
    },
    methods: {
        async getRecomendado() {
            await fetch(this.baseURL+'/recomendaciones/usuario',
            {method: 'POST',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.recomendados = data;
                });
        }
    }
}
</script>
