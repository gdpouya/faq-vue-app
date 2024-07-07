<template>
  <div class="container mt-5">
    <h1>مدیریت برچسب‌ها</h1>
    <button @click="addLabel" class="btn btn-primary mb-3">افزودن برچسب</button>
    <div v-for="label in labels" :key="label.id" class="mb-3">
      <LabelForm :label="label" @submit="updateLabel(label.id, $event)" />
      <button @click="deleteLabel(label.id)" class="btn btn-danger">حذف</button>
    </div>
    <LabelForm @submit="createLabel" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService'
import LabelForm from '../components/LabelForm.vue'

export default {
  name: 'ManageLabels',
  components: {
    LabelForm
  },
  setup () {
    const labels = ref([])

    const fetchLabels = async () => {
      try {
        const response = await apiService.getLabels()
        labels.value = response.data
      } catch (error) {
        console.error('Error fetching labels:', error)
      }
    }

    const createLabel = async (label) => {
      try {
        await apiService.createLabel(label)
        fetchLabels()
      } catch (error) {
        console.error('Error creating label:', error)
      }
    }

    const updateLabel = async (id, label) => {
      try {
        await apiService.updateLabel(id, label)
        fetchLabels()
      } catch (error) {
        console.error('Error updating label:', error)
      }
    }

    const deleteLabel = async (id) => {
      try {
        await apiService.deleteLabel(id)
        fetchLabels()
      } catch (error) {
        console.error('Error deleting label:', error)
      }
    }

    onMounted(() => {
      fetchLabels()
    })

    return {
      labels,
      createLabel,
      updateLabel,
      deleteLabel
    }
  }
}
</script>
