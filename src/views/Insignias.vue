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
    props: ['listener', 'listener2'],
    watch: {
        listener: async function() {
            await this.getProgramasVistos();
            await this.getGenerosProgramasVistos();
            await this.getActoresProgramasVistos();
        },
        listener2: async function() {
            await this.getListasPropias();
            await this.getProgramasListasPropias();
        }
    },
    methods: {
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
                const toast = useToast();

                toast.info("Ha obtenido la insignia: "+ this.programasVistos.insignia,
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
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
                const toast = useToast();
                if(this.generosVistos.Amateur){
                    toast.info("Ha obtenido la insignia: Amateur Genre Watcher",
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.generosVistos.Intermediate){
                    toast.info("Ha obtenido la insignia: Intermediate Genre Watcher",
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.generosVistos.Professional){
                    toast.info("Ha obtenido la insignia: Professional Genre Watcher",
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
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
                const toast = useToast();
                if(this.actoresVistos.Fan){
                    toast.info("Ha obtenido la insignia: Actor/Actress Fan",
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.actoresVistos.Lover){
                    toast.info("Ha obtenido la insignia: Actor/Actress Lover",
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.actoresVistos.Addict){
                    toast.info("Ha obtenido la insignia: Actor/Actress Addict",
                    {
                        position: "top-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
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
            //this.$emit('escucharSugerencias',this.sugeridos)
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
            //this.$emit('escucharSugerencias',this.sugeridos)
        }
    }
}
</script>
