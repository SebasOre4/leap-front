<template>
    <div class="leap-sidebar">
        <div class="bg-shapes">
            <div class="leap-circle wh1" style="top: -50%; left: -20%;"></div>
            <div class="leap-circle wh2" style="bottom: -10%; right: 0%;"></div>
            <div class="leap-circle wh3" style="top: 55%; left: 2%;"></div>
            <div class="leap-circle wh4" style="top: 68%; left: 9%;"></div>
            <div class="leap-circle wh5" style="top: 72.5%; left: 11.7%;"></div>
        </div>
        <div class="nav-icons">
            <div class="logo">Leap.</div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-icon-link">
                    <fa-icon icon="fa-solid fa-user" class="nav-icon"></fa-icon>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-icon-link">
                    <fa-icon icon="fa-solid fa-user" class="nav-icon"></fa-icon>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-icon-link">
                    <fa-icon icon="fa-solid fa-user" class="nav-icon"></fa-icon>
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-icon-link">
                    <fa-icon icon="fa-solid fa-user" class="nav-icon"></fa-icon>
                </router-link>
            </div>
        </div>
        <nav class="nav-items">
            <div class="app-title">Leap App</div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                    Dashboad
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                    Reportes
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                    Pacientes
                </router-link>
            </div>
            <div class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                    Tratamientos (Juegos)
                </router-link>
            </div>
            <div class="logout" >
                <va-button @click="logout()" size="large" preset="secondary" color="#ffffff">
                    <fa-icon icon="fa-solid fa-arrow-right-to-bracket" class="btn-icon" />
                    Cerrar Sesión
                </va-button>
            </div>
        </nav>
    </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router'
import { useRequesterStore } from '../../stores/requester';
import { useUserStore } from '../../stores/user';
import { useUtilsStore } from '../../stores/utils';

const router = useRouter()
const requesterX = useRequesterStore();
const utilsX = useUtilsStore();
const userX = useUserStore();

async function logout() {
  try {
    const { data } = await requesterX.Get({
      route: "/logout",
      withAuth: true
    });
    if (data.success) {
      utilsX.setNotif({
        title: "Cierre de Sesión",
        message: "Cierre de Sesión Exitoso!",
        type: "success",
        timeVisible: 3,
        position: "top-center",
      });
      userX.setApiUser(null);
      router.push({ name: "login" });
    }
  } catch (error) {
    utilsX.setNotif({
      title: "Cierre sesión",
      message: "Algo salio mal :/",
      type: "error",
      timeVisible: 3,
      position: "top-center",
    });
  }
}
</script>
    
<style lang="scss">
.leap-sidebar {
    background: var(--leap-secondary-color);
    width: 70px;
    max-width: 90%;
    height: 100%;
    border-radius: 0px 15px 15px 0px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
        width: 350px;
    }

    .bg-shapes {
        position: absolute;
        width: 100%;
        height: 100vh;
        overflow: hidden;

        .leap-circle {
            position: absolute;
            content: '';
            background: white;
            opacity: 10%;
            border-radius: 50%;

            &.wh1 {
                width: 80vh;
                height: 80vh;
            }

            &.wh2 {
                width: 20vh;
                height: 20vh;
            }

            &.wh3 {
                width: 10vh;
                height: 10vh;
            }

            &.wh4 {
                width: 5vh;
                height: 5vh;
            }

            &.wh5 {
                width: 2vh;
                height: 2vh;
            }
        }
    }

    .nav-icons {
        background-color: var(--leap-primary-color);
        width: 60px;
        height: 100%;
        border-radius: 0px 15px 15px 0px;
        position: absolute;
        z-index: 2;

        .logo {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            font-size: 23px;
            opacity: 0.6;
            color: white;
            height: 170px;
        }

        .nav-item {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                .nav-icon-link {
                    background: white;
                    color: var(--leap-primary-color);
                }
            }

            .nav-icon-link {
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                transition: all 0.3s ease;


                .nav-icon {
                    width: 60%;
                    height: 60%;
                }
            }
        }
    }

    .nav-items {
        top: 0px;
        left: 60px;
        width: calc(100% - 60px);
        min-width: 200px;
        height: 100%;
        position: absolute;
        z-index: 1;

        .app-title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
            height: 170px;
            font-weight: 600;
        }

        .nav-item {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            &:hover {
                .nav-link {
                    background: #f2f2f2f2;
                    color: var(--leap-primary-color);
                }
            }

            .nav-link {
                color: white;
                border-radius: 30px 0px 0px 30px;
                width: 95%;
                padding-left: 20px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                transition: all 0.3s ease;
            }
        }

        .logout {
            position: absolute;
            bottom: 15px;
            left: 0px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .btn-icon{
                margin-right: 10px;
            }
        }
    }
}
</style>