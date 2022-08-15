<template>

    <div class="text-center mb-5">
        <h3 class="mt-5">Listas de programas</h3>
        <button class="btn btn-primary mt-3" @click="this.showModal = true;">
            <font-awesome-icon icon="fa-solid fa-list" class="icon fa-xs" /><span>Crear lista</span>
        </button>
        <div v-if="showModal" class="modal">
            <div style="position: absolute; margin-left:425px; margin-top:-15px"><button class="btn btn-secondary"
                    style="width: min-content;height: min-content;" @click="showModal = false">X</button>
            </div>
            <CrearLista @escucharCrearLista="addListaPerfil" />
        </div>
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

                        <div v-if="json.lista.nombre !== 'Programas vistos' && json.lista.nombre !== 'En seguimiento'"
                            class="d-flex flex-column">
                            <button @click="borrarLista(json.lista._id);"
                                class="trash-bin border border-0 bg-transparent">
                                <font-awesome-icon icon=" fa-solid fa-trash-can" class="fa-2xl" title="Eliminar lista">
                                </font-awesome-icon>
                            </button>
                        </div>
                    </div>
                    <h5 class="mt-3">Géneros</h5>
                    <div>
                        <span v-for="genero of json.generos" class="badges badge bg-secondary">{{ genero }}</span>
                    </div>

                    <div class="d-flex justify-content-between install">
                        <button class="border border-0 bg-transparent" @click="getLista(json.lista._id)">
                            <span class="text-primary">Ver programas</span></button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showModalProgramas" class="programas">
            <h5 class="titulo">Programas de la lista {{ this.lista.nombre }}</h5>
            <div style="margin-left:425px;margin-top:-45px;"><button class="btn btn-secondary"
                    style="width: min-content;height: min-content;" @click="showModalProgramas = false">X</button>
            </div>
            <div v-if="this.lista.programas.length > 0" class="row">
                <table class="table">
                    <tbody>
                        <tr v-for="p of this.datosPaginados" v-bind:key="p">
                            <router-link :to="`/programa/${p._id}`">
                                <td>{{ p.titulo }}</td>
                            </router-link>

                            <td><button class="border border-0 bg-transparent"
                                    @click="borrarProgramaLista(p.lista, p._id);">
                                    <font-awesome-icon icon=" fa-solid fa-trash-can" class="fa-xl"
                                        title="Eliminar programa de lista">
                                    </font-awesome-icon>
                                </button></td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <!-- <li class="page-item" @click="getPreviousPage();"><a class="page-link" href="#">Previous</a></li> -->
                        <li v-for="pagina in totalPaginas(this.lista.programas)" class="page-item"
                            v-bind:class="isActive(pagina)" @click="getDataPagina(pagina);"><a class="page-link"
                                @click="getNextPage();">{{ pagina }}</a>
                        </li>
                        <!-- <li class="page-item"><a class="page-link" href="#">Next</a></li> -->
                    </ul>
                </nav>
            </div>
            <div v-else>
                <p>La lista está vacía</p>
            </div>
        </div>
    </div>



</template>

<script>
import { useToast } from "vue-toastification";
import CrearLista from "./CrearLista.vue";

export default {
    data() {
        return {
            showModal: false,
            showModalProgramas: false,
            elementosPorPagina: 5,
            datosPaginados: [],
            paginaActual: 1,
            listas: [],
            lista: {},
            baseURL: "http://localhost:5000"
        }
    },

    created() {
        this.getListas();

    },

    methods: {
        getListas() {
            console.log("ENTRA EN EL GETLISTAS");
            fetch(this.baseURL + "/listas", { headers: { 'Authorization': sessionStorage.getItem("token") } })
                .then(res => res.json())
                .then(data => {
                    this.listas = data;
                }).catch(err => console.log(err));
        },

        borrarLista(id) {
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

            }).catch(err => console.log(err));
        },

        addListaPerfil() {
            // this.showModal = false;
            this.getListas();
        },

        getLista(id) {

            fetch(this.baseURL + "/lista/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token")
                }
            }).then(res => res.json()).then(data => {
                if (data.status == 200) {
                    this.lista = data.lista;
                    this.showModalProgramas = true;
                    //add 5 programas to datosPaginados
                    this.datosPaginados = [];
                    //if lista programas length < 5
                    if (this.lista.programas.length < this.elementosPorPagina) {
                        this.datosPaginados = this.lista.programas;
                    } else {
                        for (let i = 0; i < 5; i++) {
                            this.datosPaginados.push(this.lista.programas[i]);
                        }
                    }

                } else {
                    const toast = useToast();
                    toast.error(data.msg,
                        {
                            position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                            draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                            icon: true, rtl: false
                        });
                }
                this.showModalProgramas = true;
            }).catch(err => console.log(err));

        },


        borrarProgramaLista(idLista, idPrograma) {

            fetch(this.baseURL + '/lista/' + idLista + '/borrar/' + idPrograma, {
                headers: { 'Authorization': sessionStorage.getItem("token"), },
                method: "PUT"
            })
                .then(response => response.json())
                .then(data => {

                    const toast = useToast();

                    if (data.status === 204) {
                        this.showModalProgramas = false;

                        toast.success(data.msg,
                            {
                                position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                                draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                                icon: true, rtl: false
                            });

                        this.getListas();

                    } else {
                        toast.error(data.msg,
                            {
                                position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                                draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                                icon: true, rtl: false
                            });
                    }

                }).catch(err => console.log(err));

        },

        totalPaginas(lista) {
            return Math.ceil(lista.length / this.elementosPorPagina);
        },

        getDataPagina(noPagina) {
            this.paginaActual = noPagina;
            this.datosPaginados = [];
            let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
            let fin = noPagina * this.elementosPorPagina;
            this.datosPaginados = this.lista.programas.slice(ini, fin);

        },

        isActive(noPagina) {
            if (noPagina == this.paginaActual) {
                return "active";
            } else {
                return '';
            }
        }

        // getPreviousPage(){
        //     if(this.paginaActual > 1){
        //         this.paginaActual--;

        //     }
        //     this.getDataPagina(this.paginaActual);
        // },

        // getNextPage(){
        //     if(this.paginaActual < this.totalPaginas()){
        //         this.paginaActual++;

        //     }
        //     this.getDataPagina(this.paginaActual);
        // }

    },
    

    components: {
        CrearLista

    }
}


</script>


<style scoped>
.modal {
    position: relative;
    padding: 20px;
    padding-top: 30px;
    background: white;
    width: 500px;
    height: auto;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: var(--bs-gray-400);
    top: 30px;
    bottom: auto;
    margin-left: 380px;

}

.fa-list {
    margin-right: 10px;
    margin-top: 5px;

}

.badges {
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

.programas {

    position: relative;
    padding: 20px;
    padding-top: 30px;
    background: white;
    width: 500px;
    height: auto;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: var(--bs-gray-400);
    margin-left: 375px;
    margin-top: -300px;
}

.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>