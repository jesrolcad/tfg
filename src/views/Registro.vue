<template>

    <section class="position-relative py-4 py-xl-5">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h2 class="text-center mb-3">Registro</h2>
                        <div>
                            <p class="text-center mb-4">Regístrate en What To Watch y disfruta de todas las
                                características de la aplicación</p>
                        </div>
                        <div class="card mx-auto">
                            <div class="card-body">

                                <form v-on:submit.prevent>

                                    <div class="form-outline form-control-sm p-2">
                                        <input type="text" class="form-control form-control-lg"
                                            v-model="v$.user.nombre.$model" placeholder="Nombre y apellidos" />
                                        <div v-if="v$.user.nombre.$dirty">
                                            <div v-if="v$.user.nombre.alphaValidatorWithSpace.$invalid">
                                                <p class="text-danger">El nombre y apellidos solo puede contener letras
                                                </p>
                                            </div>
                                            <div v-for="error of v$.user.nombre.$silentErrors" :key="error.$message">
                                                <div>
                                                    <p class="text-danger">{{ error.$message }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-outline form-control-sm p-2">
                                        <input type="date" class="form-control form-control-lg"
                                            v-model="v$.user.fechaNacimiento.$model" placeholder="dd/mm/yyyy" />
                                        <div v-if="v$.user.fechaNacimiento.$dirty">
                                            <div v-if="v$.user.fechaNacimiento.maxDateValidator.$invalid">
                                                <p class="text-danger">La fecha de nacimiento no puede ser posterior al
                                                    día de hoy
                                                </p>
                                            </div>
                                            <div v-if="v$.user.fechaNacimiento.minAgeValidator.$invalid">
                                                <p class="text-danger">Debes tener 16 años o más para registrarte en la
                                                    aplicación
                                                </p>
                                            </div>
                                            <div v-for="error of v$.user.fechaNacimiento.$silentErrors"
                                                :key="error.$message">
                                                <div>
                                                    <p class="text-danger">{{ error.$message }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-outline form-control-sm p-2">
                                        <input type="email" class="form-control form-control-lg"
                                            v-model="v$.user.email.$model" placeholder="Email. Ej: correo@mail.com"
                                            v-on:change="deleteValidation('email');" />
                                        <div v-if="v$.user.email.$dirty">
                                            <div v-for="error of v$.user.email.$silentErrors" :key="error.$message">
                                                <div>
                                                    <p class="text-danger">{{ error.$message }}</p>
                                                </div>
                                            </div>
                                            <div v-if="this.errors.length > 0">
                                                <div v-for="error of this.errors">
                                                    <div v-if="error.param == 'email'">
                                                        <p class="text-danger">{{ error.msg }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-outline form-control-sm p-2">
                                        <input type="text" class="form-control form-control-lg"
                                            v-model="v$.user.nombreUsuario.$model" placeholder="Nombre de usuario"
                                            v-on:change="deleteValidation('nombreUsuario');" />
                                        <div v-if="v$.user.nombreUsuario.$dirty">
                                            <div v-for="error of v$.user.nombreUsuario.$silentErrors"
                                                :key="error.$message">
                                                <div>
                                                    <p class="text-danger">{{ error.$message }}</p>
                                                </div>
                                            </div>
                                            <div v-if="this.errors.length > 0">
                                                <div v-for="error of this.errors">
                                                    <div v-if="error.param == 'nombreUsuario'">
                                                        <p class="text-danger">{{ error.msg }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="form-outline form-control-sm p-2">
                                        <input type="password" class="form-control form-control-lg"
                                            v-model="v$.user.password.$model" placeholder="Contraseña" />
                                        <div v-if="v$.user.password.$dirty">
                                            <div v-if="v$.user.password.passwordValidatorRegex.$invalid">
                                                <p class="text-danger">La contraseña solo puede contener letras y/o
                                                    números</p>
                                            </div>
                                            <div v-for="error of v$.user.password.$silentErrors" :key="error.$message">
                                                <div>
                                                    <p class="text-danger">{{ error.$message }}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                    <div class="d-flex justify-content-center mt-3">
                                        <button type="button" class="btn btn-primary link-light d-block"
                                            v-on:click="submit();">Registrarme</button>
                                    </div>

                                    <p class="text-center text-muted mt-1 mb-0">¿Ya tienes cuenta?<a href="/"
                                            class="fw-bold text-body"><br><u>Inicia sesión</u></a></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, alpha, helpers } from '@vuelidate/validators'
import moment from 'moment'

const alphaValidatorWithSpace = value => {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)
}

const passwordValidatorRegex = value => {
    return /[a-zA-Z0-9]{8,}/.test(value)
}

const maxDateValidator = value => {
    let date = moment(new Date(value)).locale('es').format('YYYY-MM-DD')
    let today = moment().locale('es').format('YYYY-MM-DD')
    return date < today
}

const minAgeValidator = value => {
    let fechaNacimiento = moment(value);
    let fechaActual = moment();

    let edad = fechaActual.diff(fechaNacimiento, 'years');

    return edad >= 16
}

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            baseURL: 'https://whattowatch-app.herokuapp.com',
            errors: [],
            user: {
                nombre: '',
                fechaNacimiento: '',
                email: '',
                nombreUsuario: '',
                password: ''

            }
        }
    },

    methods: {
        register() {
            let uri = this.baseURL+'/usuarios/registro';
            fetch(uri, {
                method: 'POST',
                body: JSON.stringify({
                    nombre: this.user.nombre, fechaNacimiento: this.user.fechaNacimiento,
                    email: this.user.email, nombreUsuario: this.user.nombreUsuario, password: this.user.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                if (json.status == 400) {
                    this.errors = json.errors;
                    return Promise.reject("Petición inválida");
                }

            }).then(data => {
                this.user = data;
                this.$router.push({ name: 'Home' });

            }).catch(err => {
                console.log(err);
            })
        },

        async submit() {
            const isFormCorrect = await this.v$.$validate();
            if (isFormCorrect) {
                this.register();
            }

        },

        deleteValidation(field) {
            this.errors = this.errors.filter(err => err.param != field);
        },
    },

    validations() {
        return {
            user: {
                nombre: {
                    required: helpers.withMessage("El nombre y apellidos son obligatorios", required),
                    minLength: helpers.withMessage("El nombre y apellidos deben tener 5 caracteres como mínimo", minLength(5)),
                    maxLength: helpers.withMessage("El nombre y apellidos deben tener como máximo 50 caracteres", maxLength(50)),
                    alphaValidatorWithSpace, $autoDirty: true
                },

                fechaNacimiento: {
                    required: helpers.withMessage("La fecha de nacimiento es obligatoria", required),
                    maxDateValidator,
                    minAgeValidator,
                    $autoDirty: true
                },

                email: {
                    required: helpers.withMessage("La dirección de correo es obligatoria", required),
                    email: helpers.withMessage("La dirección de correo no sigue el formato adecuado", email), $autoDirty: true
                },

                nombreUsuario: {
                    required: helpers.withMessage("El nombre de usuario es obligatorio", required),
                    minLength: helpers.withMessage("El nombre de usuario debe tener 5 caracteres como mínimo", minLength(5)),
                    maxLength: helpers.withMessage("El nombre de usuario debe tener como máximo 30 caracteres", maxLength(30)),
                    alpha: helpers.withMessage("El nombre de usuario solo puede contener letras", alpha), $autoDirty: true
                },

                password: {
                    required: helpers.withMessage("La contraseña es obligatoria", required),
                    minLength: helpers.withMessage("La contraseña debe tener 8 caracteres como mínimo", minLength(8)),
                    passwordValidatorRegex, $autoDirty: true
                }
            }
        }
    }

}


</script>

<style>
.card {
    width: 25em;


}
</style>