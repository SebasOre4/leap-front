<template>
    <div class="section-title">
        <div class="label">Nuevo Paciente</div>
    </div>
    <div class="form-container">
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
            <div class="form-group">
                <div class="form-label">Fecha de Nacimiento *</div>
                <va-date-input class="w-100" prevent-overflow clearable v-model="newPatient.birthday"
                    :allowed-days="(date) => (date - currentDate < 0)" :allowed-moths="(date) => (date - currentDate < 0)"
                    :allowed-years="(date) => (date - currentDate < 0)">
                </va-date-input>
            </div>
            <div class="form-group">
                <div class="form-label">Género *</div>
                <va-select v-model="newPatient.genre" clearable prevent-overflow :options="genres"
                    :value-by="(type) => type.val" :text-by="(type) => type.name" class="w-100"
                    :rules="[(v) => required(v) || 'El género es un campo requerido.']" />
            </div>
            <div class="form-submit">
                <va-button :loading="isSaving" :disabled="!isValid || isSaving" @click="validate() && submit()" size="large"
                    color="secondary" class="submit-btn">
                    Crear
                </va-button>
            </div>
        </va-form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRequesterStore } from '@/stores/requester';
import { useValidator } from '@/composables/useValidator.js';
import { useForm } from 'vuestic-ui';

const { isValid, validate } = useForm('patient-form');
const requesterX = useRequesterStore();
const isSaving = ref(false);
const { stringBetween, required } = useValidator();
const currentDate = new Date();
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
const newPatient = ref({
    name: null,
    nickname: null
})

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

        router.push({ name: "patient-detail", params: { id: data.data.id } });
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>