<template>
    <div class="section-title">
        <div class="label">Nuevo Paciente</div>
    </div>
    <div class="form-container">
        <va-form class="create-form" ref="patient-form">
            <div class="form-group c-1-2">
                <div class="form-label">Nro de Historia clínica *</div>
                <va-input v-model="newPatient.nhc" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => onlyNums(v) || 'Ingrese solo números'
                ]" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Nombre *</div>
                <va-input v-model="newPatient.fullname" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 4, 100) || 'El campo debe tener entre 4 y 100 letras'
                ]" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Apodo *</div>
                <va-input v-model="newPatient.nickname" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 2, 25) || 'El campo debe tener entre 2 y 25 letras'
                ]" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Género *</div>
                <va-select v-model="newPatient.genre" clearable prevent-overflow :options="genres"
                    :value-by="(type) => type.val" :text-by="(type) => type.name" class="w-100"
                    :rules="[(v) => required(v) || 'El género es un campo requerido.']" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Fecha de Nacimiento *</div>
                <va-date-input class="w-100" prevent-overflow clearable v-model="newPatient.birthday"
                    :rules="[(v) => required(v) || 'La fecha de nacimiento es un campo requerido.']"
                    :allowed-days="(date) => (date - currentDate < 0)" :allowed-moths="(date) => (date - currentDate < 0)"
                    :allowed-years="(date) => (date - currentDate < 0)">
                </va-date-input>
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Edad cronológica</div>
                <va-date-input class="w-100" prevent-overflow clearable v-model="newPatient.crono_birthday"
                    :allowed-days="(date) => (date - currentDate < 0)" :allowed-moths="(date) => (date - currentDate < 0)"
                    :allowed-years="(date) => (date - currentDate < 0)">
                </va-date-input>
            </div>
            <div class="form-group">
                <div class="form-label">Prediagnóstico *</div>
                <va-input v-model="newPatient.prediagnosis" type="textarea" class="w-100"
                    :rules="[(v) => optional(v) || stringBetween(v, 0, 250) || 'El campo debe tener entre 0 y 250 letras']" />
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
import { useUtilsStore } from '@/stores/utils';
import { useRouter } from 'vue-router'
import { useUtils } from '@/composables/useUtils.js';

const { nullRemover } = useUtils();
const router = useRouter();
const utilsX = useUtilsStore();
const { isValid, validate } = useForm('patient-form');
const requesterX = useRequesterStore();
const isSaving = ref(false);
const { stringBetween, required, onlyNums, optional } = useValidator();
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
    fullname: null,
    nickname: null,
    birthday: null,
    genre: null,
    prediagnosis: 'n/a',
    nhc: null,
    crono_birthday: null,
})

async function submit() {
    try {
        const body = newPatient.value;
        body.birthday = `${body.birthday.getFullYear()}-${body.birthday.getMonth()}-${body.birthday.getDate()}`;
        body.crono_birthday = body.crono_birthday ? `${body.birthday.getFullYear()}-${body.birthday.getMonth()}-${body.birthday.getDate()}` : null;

        const { data } = await requesterX.Post({
            route: '/patient',
            withAuth: true,
            body: nullRemover(body)
        });
        console.log({ data });

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
    } catch (error) {
        console.log(error);
        utilsX.setNotif({
            title: "Guardando Perfil",
            message: "Algo salio mal :/... ",
            type: "error",
            timeVisible: 3,
            position: "top-center",
        });
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>