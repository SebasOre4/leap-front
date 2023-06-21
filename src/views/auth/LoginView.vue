<template>
  <div class="login-container">
    <h1 class="login-title">Leap App</h1>
    <form class="login-form" @submit.prevent="login()">
      <div class="login-header">
        <div class="logo">Leap.</div>
      </div>
      <div class="login-body">
        <div class="form-group">
          <div class="form-label">Correo Electrónico</div>
          <va-input v-model="email" type="email" required class="w-100" />
        </div>
        <div class="form-group">
          <div class="form-label">Contraseña</div>
          <va-input v-model="password" class="w-100" required :type="isPasswordVisible ? 'text' : 'password'">
            <template #appendInner>
              <va-icon :name="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" size="small"
                color="--va-primary" @click="isPasswordVisible = !isPasswordVisible" />
            </template>
          </va-input>
        </div>
        <div>
          <va-button type="submit" size="large" color="continue">
            <fa-icon icon="fa-solid fa-arrow-right-to-bracket" class="btn-icon" />
            Iniciar sesión
          </va-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useRequesterStore } from '@/stores/requester';
import { useUserStore } from '@/stores/user';
import { useUtilsStore } from '@/stores/utils';

const router = useRouter()
const requesterX = useRequesterStore();
const utilsX = useUtilsStore();
const userX = useUserStore();
const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);

async function login() {
  try {
    const { data } = await requesterX.Post({
      route: "/login",
      body: {
        email: email.value,
        password: password.value,
      }
    });
    if (data.success) {
      utilsX.setNotif({
        title: "Ingreso",
        message: "Ingreso Exitoso!",
        type: "success",
        timeVisible: 3,
        position: "top-center",
      });
      userX.setApiUser({
        name: data.data.name,
        email: email.value,
        token: data.data.token,
        superadmin: data.data.superadmin
      });
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
    utilsX.setNotif({
      title: "Ingreso",
      message: "Algo salio mal :/",
      type: "error",
      timeVisible: 3,
      position: "top-center",
    });
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;

  .login-title {
    font-size: 55px;
    color: white;
    margin-bottom: 40px;
    user-select: none;
  }

  .login-form {
    background-color: white;
    overflow: hidden;
    border-radius: 25px;
    width: 400px;

    .login-header {
      background-color: var(--leap-primary-color);
      padding: 15px;

      .logo {
        user-select: none;
        font-size: 23px;
        opacity: 0.6;
        color: white;
      }
    }

    .login-body {
      padding: 40px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
      height: 300px;

      .btn-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>