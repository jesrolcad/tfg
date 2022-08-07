<template>
  <Navbar class="nav" />
  <div class="container">
    <div class="text-center mb-5">
      <h3 class="mt-5">Bienvenido, {{ perfil.usuario.nombreUsuario }}</h3>
    </div>
    <div class="row">
      <div class="col">
        <div class="card mb-4">
          <div class="card-body text-center" style=" height:275.3px">
            <font-awesome-icon icon="fa-solid fa-user" size="2xl" />
            <div style="margin-top:18%">
              <h5 class="my-3">{{ perfil.usuario.nombre }}</h5>
              <p class="text-muted"><b>Nombre de usuario:</b> {{ perfil.usuario.nombreUsuario }}</p>
              <p class="text-muted"><b>Email:</b> {{ perfil.usuario.email }}</p>
              <p class="text-muted"><b>Fecha de nacimiento:</b> {{ moment(perfil.usuario.fechaNacimiento).locale('es').format("DD/MM/YYYY")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9">
        <InsigniasShow />
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <Listas />
    </div>
    <RecomendacionesUsuario />
  </div>

</template>


<script>
import Navbar from './Navbar.vue'
import RecomendacionesUsuario from './RecomendacionesUsuario.vue'
import Listas from './Listas.vue'
import InsigniasShow from './InsigniasShow.vue'
import moment from 'moment'

export default {
  data() {
    return {
      perfil: '',
      baseURL: "http://localhost:5000"
    }
  },

  created() {
    this.getPerfil();
  },



  methods: {

    getPerfil() {
      fetch(this.baseURL + "/usuarios/perfil", { headers: { 'Authorization': sessionStorage.getItem("token") } })
        .then(res => res.json())
        .then(data => {
          this.perfil = data;
        })
    },
    moment

  },
  components: {
    Navbar,
    RecomendacionesUsuario,
    Listas,
    InsigniasShow
  }


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

.nav {
  margin-bottom: 10%
}
</style>

