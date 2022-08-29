<template>

    <button class="border border-0 bg-transparent" style="border-radius: 80px;margin-left: 10px; margin-right: 10px;" title="Añadir programa a lista" 
    @click="showModal = true; getListasPersonalizadas();" data-bs-toggle="modal" data-bs-target="#myModal">
    <font-awesome-icon icon="fa-solid fa-plus" class="fa-xl"></font-awesome-icon>
    </button>

    
    <div v-if="showModal" class="modal">
    <div style="position: absolute; margin-left:425px; margin-top:-15px"><button class="btn btn-secondary" style="width: min-content;height: min-content;" @click="showModal = false">X</button></div>
    <h3 class="mb-3 mr-1">Listas personalizadas</h3>
            <div v-if="this.listasPersonalizadas.length > 0" class="row">
                <table class="table">
                    <tbody>
                        <tr v-for="l in this.listasPersonalizadas" v-bind:key="l">
                            <td>{{l.lista.nombre}}</td>
                            <td v-if="!l.lista.programas.includes(this.idPrograma)">
                                <button class="border border-0 bg-transparent" title="Añadir programa a lista" @click="addProgramaToLista(l.lista._id)"><font-awesome-icon icon="fa-solid fa-plus" class="fa-xl"></font-awesome-icon></button>
                            </td>
                            <td v-else>
                                <button class="border border-0 bg-transparent" title="Eliminar programa de lista" @click="deleteProgramaFromLista(l.lista._id)"><font-awesome-icon icon="fa-solid fa-trash-can" class="fa-xl"></font-awesome-icon></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                </div>
                <div v-else>
                    <p>Aún no tienes listas personalizadas </p>
                </div>
                <crearLista @escucharCrearLista="addLista"></crearLista>
    </div>
    
</template>

<script> 
import { useToast } from "vue-toastification";
import CrearLista from "./CrearLista.vue";

    export default {
        data() {
            return {
                baseURL : "http://localhost:5000",
                showModal: false,
                listasPersonalizadas: [],
                idPrograma: this.$route.params.id,
                componentKey: 0,
            }
        },

        methods: {

            getListasPersonalizadas() {
                fetch(this.baseURL + "/listas", { headers: { 'Authorization': sessionStorage.getItem("token") } })
                    .then(response => response.json())
                    .then(data => {
                    
                        let listas = data.filter(l => l.lista.nombre !== "Programas vistos" && l.lista.nombre !== "En seguimiento");
                        this.listasPersonalizadas = listas;

                    }).catch(err => console.log(err));
            }, 

            async addProgramaToLista(id){
                await fetch(this.baseURL + '/lista/' + id + '/agregar/' + this.idPrograma, 
                {
                headers: { 'Authorization': sessionStorage.getItem("token"), 'Content-Type': 'application/json' },
                method: "PUT"
                })

                    .then(response => response.json())
                    .then(data => {

                        const toast = useToast();
                        
                        if(data.status === 204){
                            this.getListasPersonalizadas();
                            // this.showModal = false;

                            toast.success(data.msg,
                            {
                            position: "bottom-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                            draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                            icon: true, rtl: false
                            });
                            this.$emit('escucharAdd');

                        } else {
                            toast.error(data.msg,
                            {
                            position: "bottom-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                            draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                            icon: true, rtl: false
                            });
                        } 
                            
                    } 
                    ).catch(error => {
                        console.log(error);
                    });

            },

            deleteProgramaFromLista(id) {

                fetch(this.baseURL + '/lista/' + id + '/borrar/' + this.idPrograma, {
                    headers: { 'Authorization': sessionStorage.getItem("token"), },
                    method: "PUT"})
                    .then(response => response.json())
                    .then(data => {

                        const toast = useToast();
                        
                        if(data.status === 204){
                            //this.showModal = false;
                            this.getListasPersonalizadas();

                            toast.success(data.msg,
                            {
                            position: "bottom-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                            draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                            icon: true, rtl: false
                            });

                        } else {
                            toast.error(data.msg,
                            {
                            position: "bottom-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                            draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                            icon: true, rtl: false
                            });
                        }
                        
                    }).catch(err => {
                        console.log(err);
                    }
                    );
            },

            addLista(value){
                // this.showModal = false;
                this.getListasPersonalizadas();
                this.listasPersonalizadas.push(value);
                this.$emit("escucharAdd");
            }

                },

        components: {
            CrearLista,
        }
    }




</script>

<style scoped>

.modal {
    position: absolute;
    padding:20px;
    padding-top: 30px;
    background: white;
    width:500px;
    height:auto;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0px 0px 5px var(--bs-gray-400);
    border-style: var(--bs-gray-400);
    top: -15px;
    bottom: auto;
    margin-left: 100px;
    
}

.list {
    position: absolute;

}

</style>