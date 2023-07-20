<template>
    <div class="age-info">El infante tiene {{ age }} meses de edad</div>
    <va-form class="denver-cards" ref="diagnosis-form">
        <div v-for="(item, key, index) in newDiagnosis.denverTest" class="denver-card" :class="{
            'error': (item.state === null || item.state === undefined) && !isValid
        }">
            <div class="title">
                {{ `${index + 1}. ${item.label}` }}
                <div class="error" v-if="(item.state === null || item.state === undefined) && !isValid"><fa-icon
                        icon="fa-solid fa-triangle-exclamation"></fa-icon>Completa este test para continuar</div>
            </div>
            <div class="test-data">
                <div class="state">
                    <div class="subtitle">Estado</div>
                    <div class="instruction">
                        <fa-icon v-if="item.state === null" class="state-icon info"
                            icon="fa-solid fa-highlighter"></fa-icon>
                        <fa-icon v-else-if="item.state" class="state-icon ok"
                            :icon="`fa-solid ${item.wrongs > 0 ? 'fa-triangle-exclamation' : 'fa-circle-check'}`"></fa-icon>
                        <fa-icon v-else class="state-icon wrong" icon="fa-solid fa-circle-xmark"></fa-icon>
                        <p v-if="item.state === null" class="instruction-label info">Llena el test en base a los hitos que
                            el infante logra.</p>
                        <p v-else-if="item.state" class="instruction-label ok">
                            3 hitos alcanzados{{ item.wrongs > 0 ? ", resultado dudoso." : "" }}
                        </p>
                        <p v-else class="instruction-label wrong">Hitos fallidos para la edad del infante</p>
                    </div>
                </div>
                <div class="hitos-slider">
                    <div class="subtitle">Hito</div>
                    <div class="hito-info">
                        <fa-icon icon="fa-solid fa-chevron-left" @click="prevHito(item)" class="control-arrow" :class="{
                            'off': item.currentIndex <= 0
                        }"></fa-icon>
                        <div class="hito-card">
                            <div class="label">{{ `${item.currentIndex + 1}. ${item.tests[item.currentIndex].label}` }}
                            </div>
                            <div class="age-rule">
                                <div class="rule">
                                    <div class="painted" :style="{
                                        left: `${calcLeft(item)}%`,
                                        width: `${100 - calcLeft(item)}%`
                                    }"></div>
                                </div>
                                <div class="age-label" :style="{
                                    left: '0px',
                                }">{{ item.tests[item.currentIndex].fromAge }}</div>
                                <div class="age-label" :style="{
                                    left: `${calcLeft(item)}%`,
                                }">{{ item.tests[item.currentIndex].expectedAge }}</div>
                                <div class="age-label" :style="{
                                    left: '100%',
                                }">{{ item.tests[item.currentIndex].toAge }}</div>
                                <div class="age-label child-age" :style="{
                                    left: `${calcLeftAge(item)}%`,
                                }">{{ props.age }}</div>
                            </div>
                        </div>
                        <fa-icon icon="fa-solid fa-chevron-right" @click="nextHito(item)" class="control-arrow" :class="{
                            'off': item.currentIndex >= item.tests.length - 1
                        }"></fa-icon>
                    </div>
                    <div class="detected-age">{{ item.detectedAge != null ?
                        `Edad detectada: ${item.detectedAge}`
                        : "Debesmarcar almenos un hito logrado para detectar la edad" }}
                    </div>
                    <div class="actions">
                        <div class="action ok" :class="{
                            'active': item.tests[item.currentIndex].state === true
                        }" @click="checkHito(item, true)">
                            <fa-icon icon="fa-solid fa-check" class="action-icon"></fa-icon>
                            <p>Lo logra</p>
                        </div>
                        <div class="action wrong" :class="{
                            'active': item.tests[item.currentIndex].state === false
                        }" @click="checkHito(item, false)">
                            <fa-icon icon="fa-solid fa-xmark" class="action-icon"></fa-icon>
                            <p>No lo logra</p>
                        </div>
                        <div class="form-group">
                            <div class="form-label">Observaciones</div>
                            <va-input v-model="item.observations" autosize type="textarea"
                                placeholder="Escribe tus observaciones" class="w-100" :rules="[
                                    (v) => !(item.state === null || item.state === undefined),
                                    (v) => optional(v) || stringBetween(v, 0, 500) || 'El campo debe tener entre 0 y 500 letras'
                                ]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="denver-card">
            <div class="title">Finalizar Diagnóstico</div>
            <div class="form-group">
                <div class="form-label">Diagnóstico presuntivo</div>
                <va-input v-model="newDiagnosis.result" readonly placeholder="Llena el test para que el resultado aparezca"
                    class="w-100" :rules="[
                        (v) => required(v) || 'Llena el test para que el resultado aparezca',
                        (v) => stringBetween(v, 4, 10) || 'El campo debe tener entre 0 y 10 letras'
                    ]" />
            </div>

            <div class="form-group">
                <div class="form-label">Recomendaciones</div>
                <va-input v-model="newDiagnosis.recomendations" autosize type="textarea"
                    placeholder="Escribe tus recomendaciones" class="w-100"
                    :rules="[(v) => optional(v) || stringBetween(v, 0, 500) || 'El campo debe tener entre 0 y 500 letras']" />
            </div>
            <div class="form-submit">
                <va-button :loading="isSaving" :disabled="!isValid || isSaving" @click="validate() && submit()" size="large"
                    color="secondary" class="submit-btn">
                    Guardar
                </va-button>
            </div>
        </div>
    </va-form>
</template>
  
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRequesterStore } from '@/stores/requester';
import { useValidator } from '@/composables/useValidator.js';
import { useForm } from 'vuestic-ui';
import { useUtilsStore } from '@/stores/utils';

const emit = defineEmits(['diagnosticated'])

const utilsX = useUtilsStore();

const { isValid, validate } = useForm('diagnosis-form');

const isSaving = ref(false);

const props = defineProps({
    patientId: {
        type: String,
        required: true
    },
    isFinalDiagnosis: {
        type: Boolean,
        required: false,
        default: false
    },
    treatmentId: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
})

const successTests = ref(0);
const wrongTests = ref(0);

const { stringBetween, optional, required } = useValidator();

const requesterX = useRequesterStore();

const newDiagnosis = ref({
    recomendations: "",
    result: "",
    denverTest: {}
});

watch([successTests, wrongTests], (newVal) => {
    if (successTests.value + wrongTests.value === 4) {
        switch (successTests.value) {
            case 4:
                newDiagnosis.value.result = "Normal";
                break;
            case 3:
                newDiagnosis.value.result = "Normal";
                break;
            case 2:
                newDiagnosis.value.result = "Dudoso";
                break;
            case 1:
                newDiagnosis.value.result = "Anormal";
                break;
            case 0:
                newDiagnosis.value.result = "Anormal";
                break;
        }
    } else {
        newDiagnosis.value.result = "";
    }
});

function checkHito(item, value) {
    //primera parte lógica de auto avance y checks
    if (item.higherIndex === null || item.higherIndex < item.currentIndex) {
        item.higherIndex = item.currentIndex;
    }

    if (item.tests[item.currentIndex].state != undefined && item.tests[item.currentIndex].state != null) {
        if (item.tests[item.currentIndex].state === value) {
            item.tests[item.currentIndex].state = null;
            value ? item.oks-- : item.wrongs--;
            value ? successTests.value-- : wrongTests.value--;
            item.state = null;
            if (item.currentIndex === item.higherIndex) {
                for (let index = 0; index < item.currentIndex; index++) {
                    item.tests[index].state = null;
                }
                item.currentIndex = item.ageIndex;
                item.higherIndex = null;
                item.detectedAge = null;
                item.wrongs = 0;
                item.oks = 0;
            }
        } else {
            item.tests[item.currentIndex].state = value;
            if (value) {
                item.oks++;
                successTests.value--;
                if (item.wrongs > 0) {
                    item.wrongs--;
                }
            } else {
                item.wrongs++;
                wrongTests.value--;
                if (item.wrongs > 0) {
                    item.oks--;
                }
            }
            item.state = null;
        }
    } else {
        item.tests[item.currentIndex].state = value;
        if (value) {
            item.oks++;
        } else {
            if (item.currentIndex <= item.ageIndex) {
                item.wrongs++;
                item.oks = 0;
            }
        }
    }
    if (item.currentIndex > 0 && item.currentIndex <= item.tests.length - 1 && item.higherIndex != null && item.tests[item.currentIndex].state != null) {
        do {
            !value || item.tests[item.higherIndex].state === false || item.higherIndex == item.tests.length - 1 ? item.currentIndex-- : item.currentIndex++;
        } while (item.tests[item.currentIndex].state != undefined && item.tests[item.currentIndex].state != null);
    }

    //segunda parte lógica de calificación
    if (item.higherIndex != null && item.state === null) {
        if (item.wrongs <= 1) {
            if (item.oks >= 3) {
                item.state = true;
                successTests.value++;
                if (item.higherIndex > item.ageIndex) {
                    for (let index = item.higherIndex; index >= 0; index--) {
                        const element = item.tests[index];
                        if (element.state) {
                            item.detectedAge = element.expectedAge;
                            break;
                        }
                    }
                } else {
                    item.detectedAge = props.age;
                }
            }
        } else {
            item.state = false;
            wrongTests.value++;
            for (let index = item.higherIndex; index >= 0; index--) {
                const element = item.tests[index];
                if (element.state) {
                    item.detectedAge = element.expectedAge;
                    break;
                }
            }
        }
    } else if (item.state) {
        if (item.higherIndex > item.ageIndex) {
            for (let index = item.higherIndex; index >= 0; index--) {
                const element = item.tests[index];
                if (element.state) {
                    item.detectedAge = element.expectedAge;
                    break;
                }
            }
        } else {
            item.detectedAge = props.age;
        }
    } else {
        for (let index = item.higherIndex; index >= 0; index--) {
            const element = item.tests[index];
            if (element?.state) {
                item.detectedAge = element.expectedAge;
                break;
            }
        }
    }
}

function prevHito(item) {
    return item.currentIndex > 0 && item.currentIndex--;
}

function nextHito(item) {
    return item.currentIndex < item.tests.length - 1 && item.currentIndex++
}

function calcLeft(item) {
    return item.tests[item.currentIndex].expectedAge * 100 / (item.tests[item.currentIndex].toAge + item.tests[item.currentIndex].fromAge)
}

function calcLeftAge(item) {
    if (props.age < item.tests[item.currentIndex].fromAge) {
        return -7;
    } else if (props.age > item.tests[item.currentIndex].toAge) {
        return 107;
    } else {
        return props.age * 100 / (item.tests[item.currentIndex].toAge + item.tests[item.currentIndex].fromAge)
    }
}

function prepareTest() {
    for (const key in newDiagnosis.value.denverTest) {
        if (Object.hasOwnProperty.call(newDiagnosis.value.denverTest, key)) {
            const element = newDiagnosis.value.denverTest[key];
            let index = 0;
            if (props.age >= element.tests[element.tests.length - 1].toAge) {
                index = element.tests.length - 1;
            } else if (props.age >= element.tests[0].expectedAge) {
                index = element.tests.findIndex((el, index) => {
                    if (props.age >= el.expectedAge) {
                        if (props.age <= el.toAge) {
                            if (props.age < element.tests[index + 1]?.expectedAge) {
                                return true;
                            }
                        } else if (props.age < element.tests[index + 1].expectedAge) {
                            return true;
                        }
                    }
                });
            }

            element.state = null;
            element.observations = "";
            element.detectedAge = null;
            element.higherIndex = null;
            element.wrongs = 0;
            element.oks = 0;
            element.currentIndex = element.ageIndex = index < 0 ? 0 : index;
        }
    }
}

async function submit() {
    try {
        const body = {
            denver_test: JSON.stringify(newDiagnosis.value.denverTest),
            recomendations: newDiagnosis.value.recomendations,
            result: newDiagnosis.value.result,
            evaluated_age: props.age
        }

        const res = await requesterX.Post({
            route: props.isFinalDiagnosis ? `/discharge-patient/${props.patientId}/${props.treatmentId}` : `/diagnose-patient/${props.patientId}`,
            body,
            withAuth: true,
        });

        console.log(res);

        if (res.data.success) {
            if (props.isFinalDiagnosis) {
                utilsX.setNotif({
                    title: "Dando de alta a paciente",
                    message: "Paciente dado de alta Exitosamente!",
                    type: "success",
                    timeVisible: 3,
                    position: "top-center",
                });
            } else {
                utilsX.setNotif({
                    title: "Diagnosticando paciente",
                    message: "Paciente diagnosticado Exitosamente!",
                    type: "success",
                    timeVisible: 3,
                    position: "top-center",
                });
            }

            emit('diagnosticated');
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

onBeforeMount(async () => {
    const { data } = await requesterX.Get({
        route: '/denver-test',
        withAuth: true,
    });

    if (data.success) {
        newDiagnosis.value.denverTest = data.data;
        prepareTest();
    }
});
</script>

<style lang="scss" src="./style.scss" scoped></style>