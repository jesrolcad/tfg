<template>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Login</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Login-Form-Basic.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

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
                            <div class="bs-icon-xl bs-icon-circle bs-icon-primary-light text-black-50 bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person text-black-50">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                </svg></div>
                            <form class="text-center" method="post">
                                <div class="mb-3"><input class="form-control" type="text" name="nombreUsuario" placeholder="Nombre de usuario" style="width: 1;" v-model="nombreUsuario"></div>
                                <div class="mb-3"><input class="form-control" type="password" name="password" placeholder="Contraseña" v-model="password"></div>
                                <div class="mb-3"><button class="btn btn-primary link-light d-block w-100" type="submit" style="background: var(--bs-blue);">Iniciar sesión</button></div>
                                <p class="text-muted"><span style="color: rgb(3, 3, 3);">¿No tienes cuenta? Regístrate aquí&nbsp;</span></p>
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

import { mapActions } from 'vuex'


export default {
  name: "Login",
  data() {
    return {
      nombreUsuario: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(['login'])
  }
};
</script>


