<template>
    <va-modal v-model="showModal" hide-default-actions blur size="small">
        <template #header>
            <h2 class="form-header">Nuevo Usuario (Doctor)</h2>
        </template>
        <va-form class="create-form" ref="doc-form">
            <div class="form-group">
                <div class="form-label">Nombre *</div>
                <va-input v-model="newDoc.name" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 4, 25) || 'El campo debe tener entre 4 y 100 letras'
                ]" />
            </div>
            <div class="form-group">
                <div class="form-label">Email *</div>
                <va-input v-model="newDoc.email" type="email" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => email(v) || 'Ingresa un Email válido'
                ]" />
            </div>
            <div class="form-group">
                <div class="form-label">Contraseña *</div>
                <va-input v-model="newDoc.password" class="w-100" :type="isPasswordVisible ? 'text' : 'password'" :rules="[
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
                <div class="form-label">Es Administrador? *</div>
                <va-switch v-model="newDoc.superadmin" />
            </div>
            <div class="form-submit">
                <va-button :loading="isSaving" :disabled="!isValid || isSaving" @click="validate() && submit()" size="large"
                    color="secondary" class="submit-btn">
                    Crear
                </va-button>
                <va-button @click="showModal = !showModal" preset="secondary">Cancelar</va-button>
            </div>
        </va-form>
    </va-modal>
    <div class="section-title">
        <div class="label">Doctores</div>
        <va-button round siz @click="showModal = !showModal">Nuevo Doctor</va-button>
    </div>
    <div class="doctors-list">
        <div v-for="doc in doctors" :class="'doc-card ' + (doc.superadmin ? 'admin' : 'doc')">
            <div class="data">
                <div class="main">
                    <b>{{ doc.name }}</b>
                </div>
                <div class="text">
                    <b>Email: </b>{{ doc.email }}
                </div>
                <div class="text">
                    <b>Administrador: </b>{{ doc.superadmin ? 'Si' : 'No' }}
                </div>
            </div>
            <div class="actions">
                <va-button round color="info" class="action-btn">
                    <fa-icon class="btn-icon" icon="fa-solid fa-edit"></fa-icon> Editar
                </va-button>
                <va-button round color="error" class="action-btn">
                    <fa-icon class="btn-icon" icon="fa-solid fa-trash"></fa-icon> Eliminar
                </va-button>
            </div>
        </div>
    </div>
    <LeapPagination v-if="doctors.length > 0" :pagination="pagination" @new-page="newPage"></LeapPagination>
</template>
  
<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useForm } from 'vuestic-ui';
import { useRequesterStore } from '@/stores/requester';
import { useValidator } from '@/composables/useValidator.js';
import LeapPagination from '@/components/leap-pagination/LeapPagination.vue';
import { useUtilsStore } from '@/stores/utils';

const utilsX = useUtilsStore();
const requesterX = useRequesterStore();
const doctors = ref([]);
const pagination = ref([]);
const currentPage = ref(1);
const isSaving = ref(false)
const isPasswordVisible = ref(false);
const showModal = ref(false);
const { isValid, validate } = useForm('doc-form')
const { stringBetween, required, password, email } = useValidator();

const newDoc = ref({
    name: null,
    email: null,
    superadmin: false,
    password: null
})

onBeforeMount(async () => {
    await getDoctors()
});

watch(
    () => currentPage.value,
    async (newPage) => {
        await getDoctors();
    }
);

async function getDoctors() {
    const { data } = await requesterX.Get({
        route: `/user?page=${currentPage.value}`,
        withAuth: true
    });

    if (data) {
        doctors.value = data.data;
        pagination.value = data.meta.links;
    }
}

async function submit() {
    const { data } = await requesterX.Post({
        route: '/register',
        withAuth: true,
        body: newDoc.value
    });

    if (data.success) {
      utilsX.setNotif({
        title: "Creación de Usuario",
        message: "usuario creado Exitosamente!",
        type: "success",
        timeVisible: 3,
        position: "top-center",
      });

      showModal.value = false;

      getDoctors();
    }
}

function newPage(page) {
    if (page.includes('Previous')) {
        currentPage.value--;
    } else if (page.includes('Next')) {
        currentPage.value++;
    } else {
        currentPage.value = page * 1;
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>

