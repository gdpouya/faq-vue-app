<template>
  <div class="container mt-5">
    <h1>مدیریت دسته‌بندی‌ها</h1>
    <button @click="addCategory" class="btn btn-primary mb-3">
      افزودن دسته‌بندی
    </button>
    <div v-for="category in categories" :key="category.id" class="mb-3">
      <CategoryForm
        :category="category"
        @submit="updateCategory(category.id, $event)"
      />
      <button @click="deleteCategory(category.id)" class="btn btn-danger">
        حذف
      </button>
    </div>
    <CategoryForm @submit="createCategory" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService'
import CategoryForm from '../components/CategoryForm.vue'

export default {
  name: 'ManageCategories',
  components: {
    CategoryForm
  },
  setup () {
    const categories = ref([])

    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories()
        categories.value = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const createCategory = async (category) => {
      try {
        await apiService.createCategory(category)
        fetchCategories()
      } catch (error) {
        console.error('Error creating category:', error)
      }
    }

    const updateCategory = async (id, category) => {
      try {
        await apiService.updateCategory(id, category)
        fetchCategories()
      } catch (error) {
        console.error('Error updating category:', error)
      }
    }

    const deleteCategory = async (id) => {
      try {
        await apiService.deleteCategory(id)
        fetchCategories()
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      createCategory,
      updateCategory,
      deleteCategory
    }
  }
}
</script>
