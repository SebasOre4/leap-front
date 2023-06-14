<template>
    <div class="pagination-btns">
        <va-button v-for="link in props.pagination" :disabled="link.url === null" class="pag-btn"
            :preset="link.active ? null : 'secondary'" @click="!link.active && pageClick(link)">
            <fa-icon v-if="link.label.includes('Previous')" icon="fa-solid fa-chevron-left"></fa-icon>
            <fa-icon v-else-if="link.label.includes('Next')" icon="fa-solid fa-chevron-right"></fa-icon>
            <div v-else class="label">{{ link.label }}</div>
        </va-button>
    </div>
</template>
  
<script setup>
const props = defineProps({
    pagination: {
        type: Array,
        required: true
    },
})

const emit = defineEmits(['newPage'])

function pageClick(link){
    console.log(link);
    emit('newPage', link.label);
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
  