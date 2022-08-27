<template>
    <div id="Insignias">
    </div>
</template>
<script>
import { useToast } from "vue-toastification";
export default{
    data(){
        return{
            baseURL: 'https://whattowatch-app.herokuapp.com',
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
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
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
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.generosVistos.Intermediate){
                    toast.info("Ha obtenido la insignia: Intermediate Genre Watcher",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.generosVistos.Professional){
                    toast.info("Ha obtenido la insignia: Professional Genre Watcher",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
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
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.actoresVistos.Lover){
                    toast.info("Ha obtenido la insignia: Actor/Actress Lover",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.actoresVistos.Addict){
                    toast.info("Ha obtenido la insignia: Actor/Actress Addict",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
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
            console.log(JSON.stringify(this.listas))
            if(this.listas.insignia){
                const toast = useToast();

                toast.info("Ha obtenido la insignia: "+ this.listas.insignia,
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
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
            console.log(JSON.stringify(this.programasListas))
            if(!this.programasListas.mensaje){
                const toast = useToast();
                if(this.programasListas.Bronce){
                    toast.info("Ha obtenido la insignia: Bronce List",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.programasListas.Silver){
                    toast.info("Ha obtenido la insignia: Silver List",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
                if(this.programasListas.Gold){
                    toast.info("Ha obtenido la insignia: Gold List",
                    {
                        position: "bottom-right", timeout: 3000, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
                        draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
                        icon: true, rtl: false
                    });
                }
            }
        }
    }
}
</script>
