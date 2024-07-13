<template>
  <div class="container mt-5">
    <h1>مدیریت دسته‌بندی‌ها</h1>

    <!-- Add Category Button -->
    <button @click="toggleAddCategory" class="btn btn-weinno mb-3">
      افزودن دسته‌بندی
    </button>

    <!-- Category Form for Adding/Editing Category -->
    <CategoryForm v-if="showForm" :category="selectedCategory" @submit="handleFormSubmit" />

    <!-- Categories Table -->
    <div v-if="!showForm">
      <input
        v-model="searchQuery"
        @input="filterCategories"
        class="form-control mb-3"
        placeholder="جستجو بر اساس نام"
      />

      <table  class="table-weinno">
        <thead>
          <tr>
            <th>#</th>
            <th>متن سوال</th>
            <th>امکانات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in paginatedCategories" :key="category.id">
            <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
            <td>{{ category.title }}</td>
            <td>
              <button @click="editCategory(category)" class="btn btn-edit">ویرایش</button>
              <button @click="deleteCategory(category.id)" class="btn btn-delete">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="row pagination justify-content-between">
          <div class="paging-link col-1" :class="{ disabled: currentPage === totalPages }" >
            <a class="page-link" @click="changePage(currentPage - 1)">قبلی</a>
          </div>
          <div class="paging col-3"
            :class="{ active: page === currentPage }"
            v-for="page in totalPages"
            :key="page">
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </div>
          <div class="paging-link col-1" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click="changePage(currentPage + 1)">بعدی</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue'
import apiService from '../services/apiService'
import CategoryForm from '../components/CategoryForm.vue'

export default {
  name: 'ManageCategories',
  components: {
    CategoryForm
  },
  setup () {
    const categories = ref([])
    const searchQuery = ref('')
    const filteredCategories = ref([])
    const showForm = ref(false)
    const selectedCategory = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories()
        categories.value = response.data
        filterCategories()
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const createCategory = async (category) => {
      try {
        await apiService.createCategory(category)
        fetchCategories()
        showForm.value = false
      } catch (error) {
        console.error('Error creating category:', error)
      }
    }

    const updateCategory = async (id, category) => {
      try {
        await apiService.updateCategory(id, category)
        fetchCategories()
        showForm.value = false
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

    const filterCategories = () => {
      const query = searchQuery.value.toLowerCase()
      filteredCategories.value = categories.value.filter(category =>
        category.title.toLowerCase().includes(query)
      )
      currentPage.value = 1
    }

    const toggleAddCategory = () => {
      showForm.value = !showForm.value
      selectedCategory.value = null
    }

    const editCategory = (category) => {
      selectedCategory.value = reactive({ ...category })
      showForm.value = true
    }

    const handleFormSubmit = (category) => {
      if (selectedCategory.value) {
        updateCategory(selectedCategory.value.id, category)
      } else {
        createCategory(category)
      }
    }

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    const totalPages = computed(() => {
      return Math.ceil(filteredCategories.value.length / itemsPerPage.value)
    })

    const paginatedCategories = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredCategories.value.slice(start, end)
    })

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      searchQuery,
      filteredCategories,
      showForm,
      selectedCategory,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedCategories,
      createCategory,
      updateCategory,
      deleteCategory,
      filterCategories,
      toggleAddCategory,
      editCategory,
      handleFormSubmit,
      changePage
    }
  }
}
</script>

<style scoped>

</style>
