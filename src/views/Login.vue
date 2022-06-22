<template>

  <body>
    <section class="position-relative py-4 py-xl-5">
      <div class="container">
        <div class="row mb-5"></div>
        <div class="col-md-8 col-xl-6 text-center mx-auto">
          <h2 class="text-center" data-bs-toggle="tooltip" data-bss-tooltip="">Iniciar sesión</h2>
          <p class="w-lg-50"></p>
        </div>
        <div class="row d-flex justify-content-center" style="background: var(--bs-body-bg);">
          <div class="col-md-6 col-xl-4">
            <div class="card mb-5">
              <div class="card-body d-flex flex-column align-items-center">
                <div class="bs-icon-xl bs-icon-circle bs-icon-primary-light text-black-50 bs-icon my-4"><svg
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                    class="bi bi-person text-black-50">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z">
                    </path>
                  </svg></div>
                <form v-on:submit.prevent>

                  <div v-if="this.usuarioIncorrecto">

                    <p class="alert alert-danger">{{this.mensaje}}</p>
                    
                  </div>
                  <div class="mb-3"><input class="form-control" type="text" v-model="v$.user.nombreUsuario.$model"
                      placeholder="Nombre de usuario" style="width: 1;">
                    
                    <div v-if="v$.user.nombreUsuario.$dirty">
                      <div v-for="error of v$.user.nombreUsuario.$silentErrors" :key="error.$message">
                        <div>
                          <p  class="text-danger">{{ error.$message }}</p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div class="mb-3"><input class="form-control" type="password" v-model="v$.user.password.$model"
                      placeholder="Contraseña">

                    <div v-if="v$.user.password.$dirty">
                      <div v-for="error of v$.user.password.$silentErrors" :key="error.$message">
                        <div>
                          <p class="text-danger">{{ error.$message }}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="mb-3 text-center"><button class="btn btn-primary link-light" v-on:click="submit();"
                      style="background: var(--bs-blue);">Iniciar sesión</button></div>
                  <p class="text-muted"><span style="color: rgb(3, 3, 3);">¿No tienes cuenta? Regístrate
                      aquí&nbsp;</span></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>


<script>
//import toastr from 'toastr';
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      usuarioIncorrecto : false,
      mensaje : '',
      user: {

        nombreUsuario: '',
        password: ''

      }
    }
  },
  methods: {
    login() {
      let uri = 'http://localhost:5000/usuarios/login';
      fetch(uri, {
        method: 'POST',
        body: JSON.stringify({ nombreUsuario: this.user.nombreUsuario, password: this.user.password }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        
        res.json()
        console.log(res.status);
        if(res.status == 400){
          this.usuarioIncorrecto = true;
          this.mensaje = "Usuario y/o contraseña incorrectos";
          //alert(this.mensaje);
          return Promise.reject(this.mensaje);
          
        }
        
        })
        .then(data => {
          this.user = data;
          this.$router.push({ name: 'Programas' });
          
        });
    },

    async submit() {
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        this.login();

      }
    }

  },

  validations() {
    return {
      user: {
        nombreUsuario: { required: helpers.withMessage("El nombre de usuario es obligatorio", required), $autoDirty: true },
        password: { required: helpers.withMessage("La contraseña es obligatoria", required), $autoDirty: true}
      }
    }
  }
}

</script>

<style>
.bs-icon {
  --bs-icon-size: .75rem;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-size: var(--bs-icon-size);
  width: calc(var(--bs-icon-size) * 2);
  height: calc(var(--bs-icon-size) * 2);
  color: var(--bs-primary);
}

.bs-icon-xs {
  --bs-icon-size: 1rem;
  width: calc(var(--bs-icon-size) * 1.5);
  height: calc(var(--bs-icon-size) * 1.5);
}

.bs-icon-sm {
  --bs-icon-size: 1rem;
}

.bs-icon-md {
  --bs-icon-size: 1.5rem;
}

.bs-icon-lg {
  --bs-icon-size: 2rem;
}

.bs-icon-xl {
  --bs-icon-size: 2.5rem;
}

.bs-icon.bs-icon-primary {
  color: var(--bs-white);
  background: var(--bs-primary);
}

.bs-icon.bs-icon-primary-light {
  color: var(--bs-primary);
  background: rgba(var(--bs-primary-rgb), .2);
}

.bs-icon.bs-icon-semi-white {
  color: var(--bs-primary);
  background: rgba(255, 255, 255, .5);
}

.bs-icon.bs-icon-rounded {
  border-radius: .5rem;
}

.bs-icon.bs-icon-circle {
  border-radius: 50%;
}


</style>