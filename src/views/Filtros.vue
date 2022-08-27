<template>
    <div class="Filtros">
        <div class="container">
            <form @submit.prevent>
                <div class="row" style="justify-content: space-evenly;">
                    <div class="col-2" style="font-family:abeezeeregular;">
                        <h1 class="h1"><strong>Tipo:</strong></h1>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked
                                v-model="tipo" value="Serie">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Serie</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked
                                v-model="tipo" value="Película">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Película</label>
                        </div>
                    </div>
                    <div class="col" style="font-family:abeezeeregular;">
                        <h1 class="h1"><strong>Géneros:</strong></h1>
                        <select class="form-select" multiple v-model="generos">
                            <option v-for="genero of allgeneros" :key="genero" :value="genero">{{ genero }}</option>
                        </select>
                    </div>
                    <div class="col">
                        <h1 class="h1"><strong>Plataformas:</strong></h1>
                        <div class="btn-group" role="group">
                            <input type="checkbox" class="btn-check" id="Netflix" value="Netflix" autocomplete="off"
                                v-model="plataformas">
                            <label class="btn btn-outline-danger" for="Netflix">
                                <img class="img" src="../../public/1.png">
                            </label>

                            <input type="checkbox" class="btn-check" id="Amazon Prime Video" value="Amazon Prime Video"
                                autocomplete="off" v-model="plataformas">
                            <label class="btn btn-outline-primary" for="Amazon Prime Video">
                                <img class="img" src="../../public/2.png">
                            </label>

                            <input type="checkbox" class="btn-check" id="HBO" value="HBO" autocomplete="off"
                                v-model="plataformas">
                            <label class="btn default" for="HBO">
                                <img class="img" src="../../public/3.png">
                            </label>

                            <input type="checkbox" class="btn-check" id="Disney" value="Disney" autocomplete="off"
                                v-model="plataformas">
                            <label class="btn disney" for="Disney">
                                <img class="img" src="../../public/4.png">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <button style="margin-top:15px" class="btn btn-primary btn-lg btn-block"
                        v-on:click="filtrarProgramas()">Filtrar</button>
                </div>
            </form>
        </div>

    </div>
</template>
<style scoped>
.h1 {
    font-family: abeezeeregular;
    color: var(--bs-blue);
    font-size: 25px;
    margin-bottom: 10px;
}

.img {
    background-size: cover
}

.default {
    --bs-btn-color: #9421f3;
    --bs-btn-border-color: #9421f3;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #9421f3;
    --bs-btn-hover-border-color: #9421f3;
    --bs-btn-focus-shadow-rgb: 148, 33, 243;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #9421f3;
    --bs-btn-active-border-color: #9421f3;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #9421f3;
    --bs-btn-disabled-bg: transparent;
    --bs-gradient: none;
}

.disney {
    --bs-btn-color: #171391;
    --bs-btn-border-color: #171391;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #171391;
    --bs-btn-hover-border-color: #171391;
    --bs-btn-focus-shadow-rgb: 23, 19, 145;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: #171391;
    --bs-btn-active-border-color: #171391;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #171391;
    --bs-btn-disabled-bg: transparent;
    --bs-gradient: none;
}
</style>
<script>

export default {
    data() {
        return {
           baseURL: 'https://whattowatch-app.herokuapp.com',
            tipo: [],
            allgeneros: [],
            generos: [],
            plataformas: [],
            filtrados: []
        }
    },
    created() {
        this.getGeneros();
    },
    methods: {
        getGeneros() {
            console.log("ENTRA AQUÍ");
            fetch(this.baseURL + '/programas/generos',
                { headers: { 'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json', 'Content-type': 'application/json' } })
                .then(res => res.json())
                .then(data => {
                    this.allgeneros = data;
                });
        },
        async filtrarProgramas() {
            let res = await fetch(this.baseURL + '/programas/filtrados',
                {
                    method: 'POST',
                    headers: { 'Authorization': sessionStorage.getItem("token"), 'Accept': 'application/json', 'Content-type': 'application/json' },
                    body: JSON.stringify({ "tipo": this.tipo, "generos": this.generos, "plataformas": this.plataformas })
                });

            let data = await res.json();
            this.filtrados = data;
            this.$emit('escucharFiltros', this.filtrados)
        }
    }
}
</script>
