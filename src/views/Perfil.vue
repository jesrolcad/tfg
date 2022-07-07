<template>
  <div class="container">
    <div class="text-center mb-5">
      <h3>Bienvenido, {{this.perfil.usuario.nombreUsuario}}</h3>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <font-awesome-icon icon="fa-solid fa-user" size = "2xl"/>
            <h5 class="my-3">{{this.perfil.usuario.nombre}}</h5>
            <p class="text-muted mb-1">{{this.perfil.usuario.nombreUsuario}}</p>
            <p class="text-muted mb-4">{{this.perfil.usuario.email}}</p>
          </div>
        </div>
      </div>
      <div class="text-center mb-5">
      <h3 class="mt-5">Listas de programas</h3>
    </div>
    <div class=" listas card mb-1 " v-for="json of this.listas">
      <div class="card-body">
        <div class="d-flex flex-column flex-lg-row">
          <font-awesome-icon icon="fa-solid fa-list" class=" fa-list me-4 position-relative" size="2xl" />
          <div class="row flex-fill">
            <div class="col-sm-5">
              <h4 class="h5">{{ json.lista.nombre }}</h4>
              <span class="badge bg-info">Número de programas: {{ json.lista.programas.length }}</span>
            </div>
            <div class="col-6">
              <h5>Géneros</h5>
              <div>
              <span class="badge bg-secondary">{{json.generos}}</span>
            </div>
            </div>
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
      listas: [],
      perfil: '',
      baseURL: "http://localhost:5000"
    }
  },

  created() {
    this.getListas();
    this.getPerfil();
  },

  

  methods: {
    //get Listas with fetch
    getListas() {
      fetch(this.baseURL + "/listas", { headers: { 'Authorization': sessionStorage.getItem("token") } })
        .then(res => res.json())
        .then(data => {
          this.listas = data;
        })
    },

    getPerfil() {
      fetch(this.baseURL + "/usuarios/perfil", { headers: { 'Authorization': sessionStorage.getItem("token") } })
        .then(res => res.json())
        .then(data => {
          this.perfil = data;
          console.log(this.perfil);
        })
    }

  },


}


</script>

<style>
body {
  background: #eee;
}

.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);

}

.listas {
  width: 50%;
  }

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, .125);
  border-radius: 1rem;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.5rem 1.5rem;
}

.avatar-text {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #000;
  color: #fff;
  font-weight: 700;
}

.avatar {
  width: 3rem;
  height: 3rem;
}

.rounded-3 {
  border-radius: 0.5rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.me-4 {
  margin-right: 1.5rem !important;
}

.fa-list{
  /* center the element */
  margin: auto;
  /* set the width to 100% */

}
</style>

