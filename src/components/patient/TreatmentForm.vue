<template>
    <div class="denver-cards">
        <div class="denver-card">
            <div class="title">Estado del infante</div>
            <div class="w-100">
                <Radar :data="radarData" :options="options" v-if="!loading" />
            </div>
        </div>
        <div class="denver-card">
            <div class="title">Tratamiento Externo</div>
            <va-form class="form-group" ref="ext-treatment-form">
                <div class="treat-inputs" v-for="(treatment, index) in currentTreatment?.external_treatment.list">
                    <div class="form-group treat-input">
                        <div class="form-label">Categoría</div>
                        <va-select v-model="treatment.topic" clearable prevent-overflow :options="topicOptions"
                            :value-by="(type) => type.val" :text-by="(type) => type.name" class="w-100"
                            :rules="[(v) => required(v) || 'Este es un campo requerido.']" />
                    </div>
                    <div class="form-group treat-input">
                        <div class="form-label">Tratamiento</div>
                        <va-input v-model="treatment.description" placeholder="Describe el test" class="w-100" :rules="[
                            (v) => required(v) || 'Este es un campo requerido.',
                            (v) => stringBetween(v, 4, 100) || 'El campo debe tener entre 4 y 100 letras',
                        ]" />
                    </div>


                    <va-button class="treat-btn add" icon="fa-solid fa-minus" @click="removeTreatment(index)"></va-button>
                </div>

                <div class="form-label">Añadir tratamiento</div>
                <va-form class="treat-inputs">
                    <div class="form-group treat-input">
                        <div class="form-label">Categoría</div>
                        <va-select v-model="newExternalTreatment.topic" clearable prevent-overflow :options="topicOptions"
                            :value-by="(type) => type.val" :text-by="(type) => type.name" class="w-100"
                            :rules="[(v) => optional(v) || true]" />
                    </div>
                    <div class="form-group treat-input">
                        <div class="form-label">Tratamiento</div>
                        <va-input v-model="newExternalTreatment.description" placeholder="Describe el test" class="w-100"
                            :rules="[
                                (v) => optional(v) || stringBetween(v, 4, 100) || 'El campo debe tener entre 4 y 100 letras'
                            ]" />
                    </div>
                    <va-button class="treat-btn add" icon="fa-solid fa-plus" @click="addTreatment()"></va-button>
                </va-form>
                <div class="form-submit">
                    <va-button :loading="isSaving" :disabled="!isValid" @click="validate() && submit()" size="large"
                        color="secondary" class="submit-btn">
                        Guardar
                    </va-button>
                </div>
            </va-form>
        </div>
        <div class="denver-card">
            <div class="title">Tratamiento Motor Fino - Juegos</div>
            <va-form class="form-group" ref="games-treatment-form">
                <div class="game-config" v-for="(treatment, index) in gameTreatments">
                    <div class="info">
                        <div class="name">
                            {{ gamesOpts[treatment.game_id - 1].name }}
                        </div>
                        <va-image fit="contain" class="img-map"
                            :src="`/imgs/${gamesOpts[treatment.game_id - 1].default_config.map}.jpeg`" lazy />
                    </div>
                    <div class="config">
                        <div class="form-group">
                            <div class="form-label">Tiempo:</div>
                            <va-select v-model="treatment.config.time" clearable prevent-overflow
                                :options="gamesOpts[treatment.game_id - 1].default_config.config.time"
                                :value-by="(type) => type.val" :text-by="(type) => type.label" class="w-100"
                                :rules="[(v) => v != null || 'Este es un campo requerido.']" />
                        </div>
                        <div class="form-group">
                            <div class="form-label">Música:</div>
                            <va-select v-model="treatment.config.music" clearable prevent-overflow
                                :options="gamesOpts[treatment.game_id - 1].default_config.config.music"
                                :value-by="(type) => type.val" :text-by="(type) => type.label" class="w-100"
                                :rules="[(v) => v != null || 'Este es un campo requerido.']" />

                        </div>
                        <div class="form-group">
                            <div class="form-label">Dificultad:</div>
                            <va-select v-model="treatment.config.dificulty" clearable prevent-overflow
                                :options="gamesOpts[treatment.game_id - 1].default_config.config.dificulty" class="w-100"
                                :value-by="(type) => type.val" :text-by="(type) => type.label"
                                :rules="[(v) => v != null || 'Este es un campo requerido.']" />

                        </div>
                        <div class="form-group">
                            <div class="form-label">Nro Distractores:</div>
                            <va-select v-model="treatment.config.distractors" clearable prevent-overflow
                                :options="gamesOpts[treatment.game_id - 1].default_config.config.distractors" class="w-100"
                                :value-by="(type) => type.val" :text-by="(type) => type.label"
                                :rules="[(v) => v != null || 'Este es un campo requerido.']" />
                        </div>
                        <div class="form-submit">
                            <va-button :loading="isSaving" :disabled="!isValid" @click="removeGame(index)" size="large"
                                color="error" class="submit-btn">
                                Borrar
                            </va-button>
                        </div>
                    </div>
                </div>

                <div class="form-label">Añadir juegos</div>

                <va-form class="treat-inputs">
                    <div class="form-group treat-input">
                        <div class="form-label">Categoría</div>
                        <va-select v-model="newGameTreatment.game_id" clearable prevent-overflow :options="gamesOpts"
                            :value-by="(type) => type.id" :text-by="(type) => type.name" class="w-100"
                            :rules="[(v) => optional(v) || true]" />
                    </div>
                    <va-button class="treat-btn add" icon="fa-solid fa-plus" @click="addGame()"></va-button>
                </va-form>

                <div class="form-submit">
                    <va-button :loading="isSaving" :disabled="!isValidGame" @click="validateGame() && submitGames()"
                        size="large" color="secondary" class="submit-btn">
                        Guardar
                    </va-button>
                </div>
            </va-form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRequesterStore } from '@/stores/requester';
import { useValidator } from '@/composables/useValidator.js';
import { useForm } from 'vuestic-ui';
import { useUtilsStore } from '@/stores/utils';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'vue-chartjs';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

const emit = defineEmits(['treatmentAdded'])
const props = defineProps({
    patientId: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
})

const utilsX = useUtilsStore();
const { isValid, validate } = useForm('ext-treatment-form');
const { isValid: isValidGame, validate: validateGame } = useForm('games-treatment-form');
const { stringBetween, optional, required } = useValidator();
const requesterX = useRequesterStore();

const isSaving = ref(false);
const loading = ref(true);
const gamesOpts = ref([]);
const gameTreatments = ref([]);
const newExternalTreatment = ref({
    topic: null,
    description: "",
});
const newGameTreatment = ref({
    game_id: null
});
const currentTreatment = ref(null);
const radarData = ref({
    labels: ["Personal - Social", "Motor Fino - Adaptativo", "Lenguaje", "Motor Grande"],
    datasets: [
        {
            label: 'Edad actual',
            backgroundColor: 'rgba(120,40,356,0.2)',
            borderColor: 'rgba(120,40,356,1)',
            pointBackgroundColor: 'rgba(120,40,356,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(120,40,356,1)',
            data: [props.age, props.age, props.age, props.age]
        },
        {
            label: 'Edad detectada',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [1, 1, 1, 1]
        }
    ]
});
const options = {
    responsive: true,
    maintainAspectRatio: false
};
const topicOptions = [
    {
        val: "personalSocial",
        name: "Personal - Social"
    },
    {
        val: "motorFino",
        name: "Motor Fino - Adaptativo"
    },
    {
        val: "lenguaje",
        name: "Lenguaje"
    },
    {
        val: "motorGrande",
        name: "Motor Grande"
    },
];

async function submit() {
    try {
        isSaving.value = true;
        console.log(currentTreatment.value?.external_treatment.list);
        const toSend = {
            external_treatment: JSON.stringify(currentTreatment.value?.external_treatment)
        }

        console.log(toSend);

        const { data } = await requesterX.Put({
            route: `/treatment/${currentTreatment.value.id}`,
            withAuth: true,
            body: toSend
        });

        if (data.success) {
            loading.value = true;
            currentTreatment.value = data.data;
            const testData = currentTreatment.value.initial_diagnosis.denver_test;

            if (currentTreatment.value.external_treatment === null) {
                currentTreatment.value.external_treatment = {
                    list: []
                };
            }

            radarData.value.datasets[1].data = [
                testData.personalSocial.detectedAge,
                testData.motorFino.detectedAge,
                testData.lenguaje.detectedAge,
                testData.motorGrande.detectedAge
            ];

            utilsX.setNotif({
                title: "Actualizando tratamientos",
                message: "Tratamiento actualizado Exitosamente!",
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
    } finally {
        isSaving.value = false;
        loading.value = false;
    }
}

async function submitGames() {
    try {
        isSaving.value = true;

        const toSend = {
            game_treatments: gameTreatments.value.map((game) => {
                return {
                    ...game,
                    config: JSON.stringify(game.config)
                }
            })
        }

        const { data } = await requesterX.Post({
            route: `/exercises/${currentTreatment.value.id}`,
            withAuth: true,
            body: toSend
        });

        if (data) {
            loading.value = true;

            gameTreatments.value = data.data;

            utilsX.setNotif({
                title: "Actualizando tratamientos",
                message: "Tratamiento actualizado Exitosamente!",
                type: "success",
                timeVisible: 3,
                position: "top-center",
            });
        }
    } catch (error) {
        utilsX.setNotif({
            title: "Guardando datos",
            message: "Algo salio mal :/... ",
            type: "error",
            timeVisible: 3,
            position: "top-center",
        });
    } finally {
        isSaving.value = false;
        loading.value = false;
    }
}

function removeTreatment(index) {
    currentTreatment.value?.external_treatment.list.splice(index, 1);
}

function addTreatment() {
    currentTreatment.value?.external_treatment.list.push(newExternalTreatment.value);
    newExternalTreatment.value = {
        topic: null,
        description: "",
    };
}

function addGame() {
    gameTreatments.value?.push({
        ...newGameTreatment.value,
        config: {
            time: null,
            music: null,
            dificulty: null,
            distractors: null
        }
    });

    newGameTreatment.value = {
        game_id: null
    };
}

function removeGame(index) {
    gameTreatments.value?.splice(index, 1);
}

onBeforeMount(async () => {
    const { data } = await requesterX.Get({
        route: `/current-treatment/${props.patientId}`,
        withAuth: true,
    });

    const { data: gamesData } = await requesterX.Get({
        route: `/games`,
        withAuth: true,
    });

    if (data.success && gamesData) {
        currentTreatment.value = data.data;
        gamesOpts.value = gamesData.data;

        const { data: gameTreatmentsData } = await requesterX.Get({
            route: `/exercises/${currentTreatment.value.id}`,
            withAuth: true,
        });

        gameTreatments.value = gameTreatmentsData.data;

        const testData = currentTreatment.value.initial_diagnosis.denver_test;

        if (currentTreatment.value.external_treatment === null) {
            currentTreatment.value.external_treatment = {
                list: []
            };
        }

        radarData.value.datasets[1].data = [
            testData.personalSocial.detectedAge,
            testData.motorFino.detectedAge,
            testData.lenguaje.detectedAge,
            testData.motorGrande.detectedAge
        ];

        radarData.value.datasets.push({
            label: 'Edad en el diagnóstico',
            backgroundColor: '#00cc4420',
            borderColor: '#00cc44',
            pointBackgroundColor: '#00cc44',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#00cc44',
            data: [currentTreatment.value.initial_diagnosis.evaluated_age, currentTreatment.value.initial_diagnosis.evaluated_age, currentTreatment.value.initial_diagnosis.evaluated_age, currentTreatment.value.initial_diagnosis.evaluated_age]
        });

        loading.value = false;
    }
});
</script>

<style lang="scss" src="./style.scss" scoped></style>