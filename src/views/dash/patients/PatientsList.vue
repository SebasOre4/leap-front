<template>
    <div class="section-title">
        <div class="label">Pacientes</div>

        <va-button round siz :to="{ name: 'new-patient' }">Nuevo Paciente</va-button>
    </div>
    <va-button color="blue" class="filter-btn" @click="filter = !filter">
        <fa-icon class="btn-icon" icon="fa-solid fa-filter"></fa-icon> Buscar Paciente
    </va-button>
    <va-form ref="filter-form" class="filter-box" v-if="filter">
        <div class="form-group">
            <div class="form-label">Nombre</div>
            <va-input v-model="query.fullname" type="text" class="w-100" 
            :rules="[(v) => optional(v) || stringBetween(v, 4, 100) || 'El campo debe tener entre 4 y 100 letras']"/>
        </div>
        <div class="form-group">
            <div class="form-label">Historia Clínica</div>
            <va-input v-model="query.nhc" type="text" class="w-100"
            :rules="[(v) => optional(v) || onlyNums(v) || 'Ingrese solo números']"></va-input>
        </div>
        <div class="form-group">
            <div class="form-label">Apodo</div>
            <va-input v-model="query.nickname" type="text" class="w-100" 
            :rules="[(v) => optional(v) || stringBetween(v, 2, 25) || 'El campo debe tener entre 2 y 25 letras']"/>
        </div>
        <div class="form-group">
            <div class="form-label">Estado</div>
            <va-select v-model="query.state" clearable prevent-overflow :options="states" :value-by="(type) => type.val"
                :text-by="(type) => type.name" class="w-100" />
        </div>
        <div class="form-group">
            <div class="form-label">Género</div>
            <va-select v-model="query.genre" clearable prevent-overflow :options="genres" :value-by="(type) => type.val"
                :text-by="(type) => type.name" class="w-100" />
        </div>
        <va-button :loading="isBusy" :disabled="!isValid || isBusy" @click="validate() && getPatients(true)"
            size="large" color="secondary" class="submit-btn">
            Buscar
        </va-button>
    </va-form>
    <div class="patients-list">
        <div v-for="patient in patients" :class="'patient-card ' + (patient.genre === 'M' ? 'male' : 'female')">
            <div class="data">
                <div class="main">
                    <b>{{ patient.fullname }}</b> ({{ patient.nickname }})
                </div>
                <div class="text">
                    <b>Historia Clínica: </b>{{ `HC-${patient.nhc}` }}
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
                <div class="text">
                    <b>Prediagnóstico: </b>{{ patient.prediagnosis }}
                </div>
            </div>
            <div class="actions">
                <va-button round color="info" class="action-btn"
                    :to="{ name: 'patient-detail', params: { id: patient.id } }">
                    <fa-icon class="btn-icon" icon="fa-solid fa-edit"></fa-icon> Editar
                </va-button>
                <va-button round color="primary" class="action-btn" v-if="patient.state === 'Internado'"
                    :to="{ name: 'patient-detail', params: { id: patient.id }, query: { tab: 'diagnosticar' } }">
                    <fa-icon class="btn-icon" icon="fa-solid fa-file-waveform"></fa-icon> Diagnosticar
                </va-button>
                <va-button round color="blue" class="action-btn" v-if="patient.state === 'En tratamiento'"
                    :to="{ name: 'patient-detail', params: { id: patient.id }, query: { tab: 'dar-de-alta' } }">
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
import { useForm } from 'vuestic-ui';
import { useValidator } from '@/composables/useValidator.js';

const { stringBetween, optional, onlyNums } = useValidator();
const { isValid, validate } = useForm('filter-form');
const requesterX = useRequesterStore();
const patients = ref([]);
const pagination = ref([]);
const currentPage = ref(1);
const isBusy = ref(false);
const today = new Date();
const filter = ref(false);
const query = ref({
    fullname: null,
    nickname: null,
    state: null,
    genre: null,
    nhc: null
})
const genres = [
    {
        val: "M",
        name: "Masculino"
    },
    {
        val: "F",
        name: "Femenino"
    },
];
const states = [
    {
        val: "Internado",
        name: "Internado"
    },
    {
        val: "En tratamiento",
        name: "En tratamiento"
    },
];

onBeforeMount(async () => {
    await getPatients()
});

watch(
    () => currentPage.value,
    async (newPage) => {
        await getPatients();
    }
);

async function getPatients(clear) {
    isBusy.value = true;

    if (clear) {
        currentPage.value = 1;
    }

    const { data } = await requesterX.Get({
        route: `/patient?page=${currentPage.value}`,
        withAuth: true,
        params: query.value
    });

    if (data) {
        patients.value = data.data;
        pagination.value = data.meta.links;
    }

    isBusy.value = false;
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
</script>

<style lang="scss" src="./style.scss" scoped></style>