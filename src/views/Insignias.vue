<template>
    <div id="Insignias">
    </div>
</template>
<script>
import { useToast } from "vue-toastification";
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
    props: {
        listener:null,
        listenerL:null
    },
    watch: {
        listener: async function() {
            await this.getProgramasVistos();
            await this.getGenerosProgramasVistos();
            await this.getActoresProgramasVistos();
        },
        listenerL: async function() {
            await this.getListasPropias();
            await this.getProgramasListasPropias();
        },
    },
    methods: {

        showNotification(message){

            const toast = useToast();

            toast.info(message,
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });

        },

        async getProgramasVistos() {
            await fetch(this.baseURL+'/insignias/programas',
            {method: 'PUT',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                    this.programasVistos = data;
                });

            if(this.programasVistos.insignia){
                this.showNotification("Ha obtenido la insignia: "+ this.programasVistos.insignia);
            }
        },
        async getGenerosProgramasVistos() {
            await fetch(this.baseURL+'/insignias/generos',
            {method: 'PUT',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.generosVistos = data;
                });

            if(!this.generosVistos.mensaje){
                if(this.generosVistos.Amateur){

                    this.showNotification("Ha obtenido la insignia: Amateur Genre Watcher");
                    
                }
                if(this.generosVistos.Intermediate){

                    this.showNotification("Ha obtenido la insignia: Intermediate Genre Watcher");
                    
                }
                if(this.generosVistos.Professional){

                    this.showNotification("Ha obtenido la insignia: Professional Genre Watcher");
                    
                }
            }
        },
        async getActoresProgramasVistos() {
            await fetch(this.baseURL+'/insignias/actores',
            {method: 'PUT',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.actoresVistos = data;
                });
            if(!this.actoresVistos.mensaje){
                if(this.actoresVistos.Fan){

                    this.showNotification("Ha obtenido la insignia: Actor/Actress Fan");
                    
                }
                if(this.actoresVistos.Lover){

                    this.showNotification("Ha obtenido la insignia: Actor/Actress Lover");
                    
                }
                if(this.actoresVistos.Addict){

                    this.showNotification("Ha obtenido la insignia: Actor/Actress Addict");
                    
                }
            }
            //this.$emit('escucharSugerencias',this.sugeridos)
        },
        async getListasPropias() {
            await fetch(this.baseURL+'/insignias/listas',
            {method: 'PUT',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.listas = data;
                });
            if(this.listas.insignia){

                this.showNotification("Ha obtenido la insignia: "+ this.listas.insignia);
            }
        },
        async getProgramasListasPropias() {
            await fetch(this.baseURL+'/insignias/listas-programas',
            {method: 'PUT',
            headers: {'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json','Content-type':'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    this.programasListas = data;
                });
            if(!this.programasListas.mensaje){
                if(this.programasListas.Bronce){

                    this.showNotification("Ha obtenido la insignia: Bronce List");
                }
                if(this.programasListas.Silver){

                    this.showNotification("Ha obtenido la insignia: Silver List");
                    
                }
                if(this.programasListas.Gold){

                    this.showNotification("Ha obtenido la insignia: Gold List");
                    
                }
            }
        }
    }
}
</script>
