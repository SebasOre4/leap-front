<template>
    <div class="form-container">
        <va-form class="create-form" ref="patient-form">
            <div class="form-group c-1-2">
                <div class="form-label">Nro de Historia clínica *</div>
                <va-input v-model="patient.nhc" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => onlyNums(v) || 'Ingrese solo números'
                ]" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Nombre *</div>
                <va-input v-model="patient.fullname" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 4, 100) || 'El campo debe tener entre 4 y 100 letras'
                ]" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Apodo *</div>
                <va-input v-model="patient.nickname" type="text" class="w-100" :rules="[
                    (v) => required(v) || 'El campo es requerido',
                    (v) => stringBetween(v, 2, 25) || 'El campo debe tener entre 2 y 25 letras'
                ]" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Género *</div>
                <va-select v-model="patient.genre" clearable prevent-overflow :options="genres"
                    :value-by="(type) => type.val" :text-by="(type) => type.name" class="w-100"
                    :rules="[(v) => required(v) || 'El género es un campo requerido.']" />
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Fecha de Nacimiento *</div>
                <va-input v-model="helper.birth" type="number" @update:modelValue="mesesToDate('birth')" class="w-100" step="0.01" min="0"
                    placeholder="Ingresar en meses" style="margin-bottom: 5px;" />
                <va-date-input class="w-100" prevent-overflow clearable v-model="patient.birthday"
                    :rules="[(v) => required(v) || 'La fecha de nacimiento es un campo requerido.']"
                    :allowed-days="(date) => (date - currentDate < 0)" :allowed-moths="(date) => (date - currentDate < 0)"
                    :allowed-years="(date) => (date - currentDate < 0)">
                </va-date-input>
            </div>
            <div class="form-group c-1-2">
                <div class="form-label">Edad cronológica</div>
                <va-input v-model="helper.crono" type="number" @update:modelValue="mesesToDate('crono')" class="w-100" step="0.01" min="0"
                    placeholder="Ingresar en meses" style="margin-bottom: 5px;" />
                <va-date-input class="w-100" prevent-overflow clearable v-model="patient.crono_birthday"
                    :allowed-days="(date) => (date - currentDate < 0)" :allowed-moths="(date) => (date - currentDate < 0)"
                    :allowed-years="(date) => (date - currentDate < 0)">
                </va-date-input>
            </div>
            <div class="form-group">
                <div class="form-label">Prediagnóstico *</div>
                <va-input v-model="patient.prediagnosis" type="textarea" class="w-100"
                    :rules="[(v) => optional(v) || stringBetween(v, 0, 250) || 'El campo debe tener entre 0 y 250 letras']" />
            </div>
            <div class="form-submit">
                <va-button :loading="isSaving" :disabled="!isValid || isSaving" @click="validate() && submit()" size="large"
                    color="secondary" class="submit-btn">
                    Guardar
                </va-button>
            </div>
        </va-form>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useRequesterStore } from '@/stores/requester';
import { useValidator } from '@/composables/useValidator.js';
import { useForm } from 'vuestic-ui';
import { useUtilsStore } from '@/stores/utils';

const props = defineProps({
    patient: {
        type: Object,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
})
const helper = ref({
    birth: null,
    crono: null
});
const requesterX = useRequesterStore();
const utilsX = useUtilsStore();
const { isValid, validate } = useForm('patient-form');
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

function mesesToDate(fecha) {
    const meses = fecha === 'birth' ? helper.value.birth : helper.value.crono;
    
    var today = new Date();
    var dates = (meses % 1) * 31;
    var months = meses - (meses % 1)

    today.setMonth(today.getUTCMonth() - months);
    today.setDate(today.getUTCDate() - dates);

    fecha === 'birth' ? props.patient.birthday = today : props.patient.crono_birthday = today;
}

async function submit() {
    try {
        const body = { ...props.patient };
        body.birthday = `${body.birthday.getUTCFullYear()}-${body.birthday.getUTCMonth() + 1}-${body.birthday.getUTCDate()}`;
        body.crono_birthday = body.crono_birthday ? `${body.crono_birthday.getUTCFullYear()}-${body.crono_birthday.getUTCMonth()}-${body.crono_birthday.getUTCDate()}` : null;
        const { data } = await requesterX.Put({
            route: `/patient/${props.patientId}`,
            withAuth: true,
            body: body
        });

        if (data.success) {
            utilsX.setNotif({
                title: "Edición de Paciente",
                message: "Paciente editado Exitosamente!",
                type: "success",
                timeVisible: 3,
                position: "top-center",
            });
        }
    } catch (error) {
        console.log(error);
        utilsX.setNotif({
            title: "Guardando datos",
            message: "Algo salio mal :/... ",
            type: "error",
            timeVisible: 3,
            position: "top-center",
        });
    }
}
</script>

<style lang="scss" src="./style.scss" scoped></style>