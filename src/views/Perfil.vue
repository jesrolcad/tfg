<template>
  <div class="container">
    <div class="text-center mb-5">
      <h3>Tus listas de programas</h3>
    </div>
    <div class="card mb-3" v-for="json of this.listas">
      <div class="card-body">
        <div class="d-flex flex-column flex-lg-row">
          <div class="row flex-fill">
            <div class="col-sm-5">
              <h4 class="h5">{{ json.lista.nombre }}</h4>
              <span class="badge bg-info">Número de programas: {{ json.lista.programas.length }}</span>
            </div>
            <div class="col-6">
              <h5 class="">Géneros</h5>
              <div>
              <span class="badge bg-secondary">{{json.generos}}</span>
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
      baseURL: "http://localhost:5000"
    }
  },

  created() {
    this.getListas();
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
</style>

