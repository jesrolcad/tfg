<template>

  <h4> Crear lista</h4>

  <form v-on:submit.prevent>
    <!-- column with label, input and button -->
    <div class="columns mb-5">
      <div class="column is-half">
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="v$.nombre.$model" placeholder="Nombre">
            <button class="button-is-primary" @click="submit();">Crear</button>
          </div>
          <div v-if="v$.nombre.$dirty">
            <div v-if="v$.nombre.regexValidator.$invalid">
              <p class="validaciones text-danger">Solo puede contener letras y números</p>
            </div>

            <div v-for="error of v$.nombre.$silentErrors" :key="error.$message">
              <div>
                <p class="validaciones text-danger">{{ error.$message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, helpers } from '@vuelidate/validators';
import { useToast } from "vue-toastification";

const regexValidator = value => {
  return /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)
}

export default {

  setup() {
    return {
      v$: useVuelidate()
    }

  },
  data() {
    return {
      nombre: '',
      lista: {}
    }
  },

  
  methods: {
    crearLista() {
      fetch('http://localhost:5000/lista/crear', {
        headers: { 'Authorization': sessionStorage.getItem("token"), 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
          nombre: this.nombre,
        })
      }).then(response => response.json()).then(data => {

        const toast = useToast();

        if (data.status === 200) {
          this.lista = data.lista;
          this.nombre = '';
          this.v$.$reset();
          toast.success(data.msg,
            {
              position: "top-right", timeout: 1994, closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
              draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
              icon: true, rtl: false
            });

            this.$emit('escucharCrearLista', this.lista);


        } else {
          data.errors.forEach(error => toast.error(error.msg,
            {
              position: "top-right", closeOnClick: true, pauseOnFocusLoss: true, pauseOnHover: true,
              draggable: true, draggablePercent: 0.6, showCloseButtonOnHover: true, hideProgressBar: true, closeButton: "button",
              icon: true, rtl: false
            }));
        }

      }).catch(err => console.log(err));

    },

    async submit() {
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        this.crearLista();
      }
    },
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre de la lista es obligatorio", required),
        minLength: helpers.withMessage("El nombre debe tener 5 caracteres como mínimo", minLength(5)),
        maxLength: helpers.withMessage("El nombre debe tener 25 caracteres como máximo", maxLength(25)),
        regexValidator, $autoDirty: true
      },
    }
  }
}

</script>

<style>
.button-is-primary {
  position: relative;
  margin-left: 10px;
}


.validaciones {
  font-size: 13px;

}
</style>