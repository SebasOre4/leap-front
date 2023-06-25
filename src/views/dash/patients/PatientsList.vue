<template>
    <va-modal v-model="showModal" hide-default-actions blur size="small">
        <template #header>
            <h2 class="form-header">Nuevo Paciente</h2>
        </template>
        <va-form class="create-form" ref="patient-form">
            <div class="form-group">
                <div class="form-label">Nombre *</div>
                <va-input v-model="newPatient.name" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 4, 25) || 'El campo debe tener entre 4 y 100 letras'
                ]" />
            </div>
            <div class="form-group">
                <div class="form-label">Apodo *</div>
                <va-input v-model="newPatient.nickname" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 4, 25) || 'El campo debe tener entre 4 y 100 letras'
                ]" />
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
        <div class="label">Pacientes</div>
        <va-button round siz @click="showModal = !showModal">Nuevo Paciente</va-button>
    </div>
    <div class="patients-list">
        <div v-for="patient in patients" :class="'patient-card ' + (patient.genre === 'M' ? 'male' : 'female')">
            <div class="data">
                <div class="main">
                    <b>{{ patient.fullname }}</b> ({{ patient.nickname }})
                </div>
                <div class="text">
                    <b>Genero: </b>{{ getGenre(patient.genre) }}
                </div>
                <div class="text">
                    <b>Fecha nacimiento: </b>{{ new Date(patient.birthday).toLocaleDateString("es-ES", {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }) }}
                </div>
                <div class="text">
                    <b>Edad: </b>{{ `${getAge(patient.birthday)} años o ${getAge(patient.birthday) * 12} meses` }}
                </div>
                <div class="text">
                    <b>Estado: </b>{{ patient.state }}
                </div>
            </div>
            <div class="actions">
                <va-button round color="info" class="action-btn">
                    <fa-icon class="btn-icon" icon="fa-solid fa-edit"></fa-icon> Editar
                </va-button>
                <va-button round color="primary" class="action-btn" v-if="patient.state === 'Internado'">
                    <fa-icon class="btn-icon" icon="fa-solid fa-file-waveform"></fa-icon> Diagnosticar
                </va-button>
                <va-button round color="blue" class="action-btn" v-if="patient.state === 'En tratamiento'">
                    <fa-icon class="btn-icon" icon="fa-solid fa-heart-pulse"></fa-icon> Dar de Alta
                </va-button>
            </div>
        </div>
    </div>
    <LeapPagination v-if="patients.length > 0" :pagination="pagination" @new-page="newPage"></LeapPagination>
</template>
  
<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRequesterStore } from '@/stores/requester';
import LeapPagination from '@/components/leap-pagination/LeapPagination.vue';
import { useValidator } from '@/composables/useValidator.js';
import { useForm } from 'vuestic-ui';

const { isValid, validate } = useForm('patient-form');
const requesterX = useRequesterStore();
const patients = ref([]);
const pagination = ref([]);
const currentPage = ref(1);
const today = new Date();
const showModal = ref(false);
const isSaving = ref(false);
const { stringBetween, required } = useValidator();
const newPatient = ref({
    name: null,
    nickname: null
})

onBeforeMount(async () => {
    await getPatients()
});

watch(
    () => currentPage.value,
    async (newPage) => {
        await getPatients();
    }
);

async function getPatients() {
    const { data } = await requesterX.Get({
        route: `/patient?page=${currentPage.value}`,
        withAuth: true
    });

    if (data) {
        patients.value = data.data;
        pagination.value = data.meta.links;
    }
}

function getAge(birth) {
    const age = today - new Date(birth);
    return Math.round(age / (365.25 * 24 * 60 * 60 * 1000));
}

function getGenre(genre) {
    return genre === "F" ? "(F) Femenino" : "(M) Masculino";
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

async function submit() {
    const { data } = await requesterX.Post({
        route: '/patient',
        withAuth: true,
        body: newPatient.value
    });

    if (data.success) {
        utilsX.setNotif({
            title: "Creación de Paciente",
            message: "Paciente creado Exitosamente!",
            type: "success",
            timeVisible: 3,
            position: "top-center",
        });

        showModal.value = false;

        getPatients();
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>