<template>
    <div class="section-title">
        <div class="label">Mi perfil</div>
    </div>
    <div class="profile-forms">
        <va-form class="profile-form" ref="profile-form">
            <div class="form-group">
                <div class="form-label">Nombre *</div>
                <va-input v-model="forms.profile.name" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 4, 25) || 'El campo debe tener entre 4 y 100 letras'
                ]" />
            </div>
            <div class="form-group">
                <div class="form-label">Email *</div>
                <va-input v-model="forms.profile.email" type="email" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => email(v) || 'Ingresa un Email válido'
                ]" />
            </div>
            <div class="form-submit">
                <va-button :loading="isSaving" :disabled="!profileValid || isSaving"
                    @click="validateProfile() && saveProfile()" size="large" color="secondary" class="submit-btn">
                    Guardar
                </va-button>
            </div>
        </va-form>

        <va-form class="profile-form" ref="new-password-form">
            <div class="form-group">
                <div class="form-label">Contraseña *</div>
                <va-input v-model="forms.changePassword.password" class="w-100"
                    :type="isPasswordVisible ? 'text' : 'password'" :rules="[
                        (v) => required(v) || 'El campo es requerido',
                        (v) => password(v) || 'La contraseña debe tener mayúsculas, minúsculas y números.'
                    ]">
                    <template #appendInner>
                        <va-icon :name="isPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" size="small"
                            color="--va-primary" @click="isPasswordVisible = !isPasswordVisible" />
                    </template>
                </va-input>
            </div>
            <div class="form-group">
                <div class="form-label">Confirmar contraseña *</div>
                <va-input v-model="forms.changePassword.password_confirmation" class="w-100"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'" :rules="[
                        (v) => required(v) || 'El campo es requerido',
                        (v) => password(v) || 'La contraseña debe tener mayúsculas, minúsculas y números.'
                    ]">
                    <template #appendInner>
                        <va-icon :name="isConfirmPasswordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" size="small"
                            color="--va-primary" @click="isConfirmPasswordVisible = !isConfirmPasswordVisible" />
                    </template>
                </va-input>
            </div>
            <div class="form-submit">
                <va-button :loading="isSaving" :disabled="!passwordValid || isSaving"
                    @click="validatePassword() && changePassword()" size="large" color="secondary" class="submit-btn">
                    Actualizar contraseña
                </va-button>
            </div>
        </va-form>
    </div>
</template>
  
<script setup>
import { ref, onBeforeMount } from 'vue';
import { useForm } from 'vuestic-ui';
import { useRequesterStore } from '@/stores/requester';
import { useValidator } from '@/composables/useValidator.js';
import { useUtilsStore } from '@/stores/utils';

const utilsX = useUtilsStore();
const requesterX = useRequesterStore();
const userId = ref(null);
const isSaving = ref(false)
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const { isValid: profileValid, validate: validateProfile } = useForm('profile-form')
const { isValid: passwordValid, validate: validatePassword } = useForm('new-password-form')
const { stringBetween, required, password, email } = useValidator();

const forms = ref({
    changePassword: {
        password: null,
        password_confirmation: null
    },
    profile: {
        name: "",
        email: ""
    }
})

async function saveProfile() {
    try {
        const { data } = await requesterX.Post({
            route: `/user/${userId.value}`,
            withAuth: true,
            body: forms.value.profile
        });

        if (data.success) {
            utilsX.setNotif({
                title: "Actualizar Perfil",
                message: "Perfil actualizado exitosamente!",
                type: "success",
                timeVisible: 3,
                position: "top-center",
            });

            await me();
        }
    } catch (error) {
        utilsX.setNotif({
            title: "Guardando Perfil",
            message: "Algo salio mal :/... " + error.response.data.message,
            type: "error",
            timeVisible: 3,
            position: "top-center",
        });
    }
}

async function changePassword() {
    try {
        const { data } = await requesterX.Post({
            route: `/newpassword/${userId.value}`,
            withAuth: true,
            body: forms.value.changePassword
        });

        if (data.success) {
            utilsX.setNotif({
                title: "Cambiar Contraseña",
                message: "Contraseña actualizada exitosamente!",
                type: "success",
                timeVisible: 3,
                position: "top-center",
            });
        }
    } catch (error) {
        utilsX.setNotif({
            title: "Guardando Perfil",
            message: "Algo salio mal :/... " + error.response.data.message,
            type: "error",
            timeVisible: 3,
            position: "top-center",
        });
    }
}

async function me() {
    const { data } = await requesterX.Get({
        route: `/me`,
        withAuth: true
    });

    if (data.success) {
        userId.value = data.data.id;
        forms.value.profile = {
            name: data.data.name,
            email: data.data.email
        }
    }
}

onBeforeMount(async () => {
    await me();
});
</script>
  
<style lang="scss" src="./style.scss"></style>