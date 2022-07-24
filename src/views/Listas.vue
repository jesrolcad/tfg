<template>

    <div class="text-center mb-5">
        <h3 class="mt-5">Listas de programas</h3>
        <!-- button to create lista -->
        <button class="btn btn-primary mt-3" @click="createLista()">
            <font-awesome-icon icon="fa-solid fa-list" class="icon fa-xs" /><span>Crear lista</span>
        </button>
    </div>
    <div class="container">
        <div class="row">
            <div v-for="json of this.listas" class="col-md-4" v-bind:key="json._id">
                <div class="card p-3 mb-3">
                    <div class="d-flex flex-row">
                        <div class="fa-list" v-if="json.lista.nombre == 'Programas vistos'">
                            <font-awesome-icon icon="fa-solid fa-eye" size="2xl" />
                        </div>

                        <div class="fa-list" v-if="json.lista.nombre == 'En seguimiento'">
                            <font-awesome-icon icon="fa-solid fa-bookmark" size="2xl" />
                        </div>

                        <div class="fa-list"
                            v-if="json.lista.nombre !== 'Programas vistos' && json.lista.nombre !== 'En seguimiento'">
                            <font-awesome-icon icon="fa-solid fa-list" size="2xl" />
                        </div>
                        <div class="d-flex flex-column">
                            <h5 class="titulo-lista">{{ json.lista.nombre }}</h5>
                            <div class="num-programas">
                                <span class="badge bg-info">Número de
                                    programas: {{ json.lista.programas.length }}</span>
                            </div>
                        </div>

                        <div v-if="json.lista.nombre !== 'Programas vistos' && json.lista.nombre !== 'En seguimiento'" class="d-flex flex-column">
                            <button @click="borrarLista(json.lista._id);" class="trash-bin border border-0 bg-transparent">
                            <font-awesome-icon icon=" fa-solid fa-trash-can" class="fa-2xl"
                                title="Eliminar lista"></font-awesome-icon></button>
                        </div>
                    </div>
                    <h5 class="mt-3">Géneros</h5>
                    <div>
                        <span v-for="genero of json.generos" class="badges badge bg-secondary">{{ genero }}</span>
                    </div>
                    <div class="d-flex justify-content-between install mt-3"><span class="text-primary">Ver programas de
                            la lista</span></div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { useToast } from "vue-toastification";

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
        async getListas() {
            await fetch(this.baseURL + "/listas", { headers: { 'Authorization': sessionStorage.getItem("token") } })
                .then(res => res.json())
                .then(data => {
                    this.listas = data;
                })
        },

        borrarLista(id){
            fetch(this.baseURL + "/lista/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token")
                }
            }).then(response => response.json()).then(data => {
                const toast = useToast();
                if (data.status == 200) {
                    this.getListas();

                    toast.success(data.msg,
                {
                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                    icon: true, rtl: false
                });
                } else {
                    toast.error(data.msg,
                {
                    position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                    draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                    icon: true, rtl: false
                });
                }

            });
        },

        crearLista() {
            this.showModal = true;
        },
        }

        }
</script>


<style>
.fa-list {
    margin-right: 10px;
    margin-top: 5px;

}

.badges {
    max-width: 21%;
    display: inline-block;
    margin-right: 5px;
}

.trash-bin {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 20px;
    margin-right: 15px;
}

.num-programas {
    display: inline-block;
    max-width: 75%;
}
</style>