<template>

    <div class="text-center mb-5">
        <h3 class="mt-5">Listas de programas</h3>
    </div>
    <div class=" listas card mb-1 " v-for="json of this.listas" v-bind:key="json._id">
        <div class="card-body">
            <div class="d-flex flex-column flex-lg-row">
                <font-awesome-icon icon="fa-solid fa-list" class=" fa-list me-4 position-relative" size="2xl" />
                <div class="row flex-fill">
                    <div class="col-sm-5">
                        <a><h4 class="h5">{{ json.lista.nombre }}</h4></a>
                        <span class="badge bg-info">Número de programas: {{ json.lista.programas.length }}</span>
                    </div>
                    <div class="col-6">
                        <h5>Géneros</h5>
                        <div>
                            <span class="badge bg-secondary">{{ json.generos }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

export default {
    data() {
        return {
            showModal: false,
            listas: [],
            baseURL: "http://localhost:5000"
        }
    },

    created() {
        this.getListas();
    },

    methods: {
        getListas() {
            fetch(this.baseURL + "/listas", { headers: { 'Authorization': sessionStorage.getItem("token") } })
                .then(res => res.json())
                .then(data => {
                    this.listas = data;
                })
        }
    }
}


</script>
<style>
.fa-list {
    /* center the element */
    margin: auto;
    /* set the width to 100% */

}
</style>