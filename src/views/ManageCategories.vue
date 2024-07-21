<template>
  <div class="container mt-5">
    <h1>مدیریت دسته‌بندی‌ها</h1>

    <!-- Category Form for Adding/Editing Category -->
    <CategoryForm v-if="showForm" :category="selectedCategory" @submit="handleFormSubmit" />

    <!-- Categories Table -->
    <div v-if="!showForm">
      <div class="row mb-3 mr-1 justify-content-between">
        <!-- Add Category Button -->
        <div class="col-2">
          <button @click="toggleAddCategory" class="btn btn-weinno mr-1">
            افزودن دسته‌بندی
          </button>
        </div>
        <div class="col-5">
          <div class="row justify-content-between">
            <button @click="searchCategory" class="btn btn-weinno col-2">
              جستجو
            </button>
            <div class="col-10">
              <input
              v-model="searchQuery"
              class="ml-1 w-100 h-100"
              placeholder="جستجو بر اساس نام"
              />
            </div>
          </div>
        </div>
      </div>

      <table class="table-weinno rounded-top">
        <thead>
          <tr>
            <th>#</th>
            <th>متن سوال</th>
            <th>امکانات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="category.id">
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
      <div v-if="showPagging" class="row pagination justify-content-between">
        <div class="col-1 paging">
          <a class="paging-link btn" :class="{ invisible: currentPage === 1 }"
          @click="changePage(currentPage - 1)">قبلی</a>
        </div>
        <div v-if="totalPages > 2" class="col-5">
        <div class=" d-flex justify-content-center">
          <div class=" d-inline-flex ">
            <a class="page-link" :class="{active: currentPage === 1}"
            @click="changePage(1)">1</a>
          </div>
          <div class=" d-inline-flex ">
            <a v-if="currentPage > 4 && totalPages > 7"
            class="page-disable">...</a>
            <a v-else class="page-link" :class="{active: currentPage === 2}"
            @click="changePage(2)">2</a>
          </div>
          <div class=" d-inline-flex ">
            <a v-if="currentPage < 5 || totalPages < 7"
            class="page-link" :class="{active: currentPage === 3}"
            @click="changePage(3)">3</a>
            <a v-else-if="currentPage > totalPages - 4 "
            class="page-link"
            @click="changePage(totalPages - 4)" >{{ totalPages - 4 }}</a>
            <a v-else class="page-link"
            @click="changePage(currentPage - 1)">{{ currentPage - 1 }}</a>
          </div>
          <div v-if="totalPages > 6" class=" d-inline-flex ">
            <a v-if="currentPage > totalPages - 3"
            class="page-link"
            @click="changePage(totalPages - 3)" >{{ totalPages - 3 }}</a>
            <a v-else-if="currentPage <  4"
            class="page-link"
            @click="changePage(4)">4</a>
            <a v-else class="page-link active" >{{ currentPage }}</a>
          </div>
          <div v-if="totalPages > 5" class=" d-inline-flex ">
            <a v-if="currentPage <  5 && totalPages > 6"
            class="page-link"
            @click="changePage(5)">5</a>
            <a v-else-if="currentPage < totalPages - 3 && totalPages > 6"
            class="page-link"
            @click="changePage(currentPage +1)">{{ currentPage +1 }}</a>
            <a v-else class="page-link" :class="{active: currentPage === totalPages - 2}"
            @click="changePage(totalPages - 2)">{{ totalPages - 2 }}</a>
          </div>
          <div v-if="totalPages > 4" class=" d-inline-flex ">
            <a v-if="currentPage <= totalPages - 4 && totalPages > 7"
            class="page-disable">...</a>
            <a v-else class="page-link" :class="{active: currentPage === totalPages - 1}"
            @click="changePage(totalPages-1)" >{{ totalPages - 1 }}</a>
          </div>
          <div v-if="totalPages > 3" class=" d-inline-flex ">
            <a class="page-link"
            :class="{active: currentPage === totalPages}"
            @click="changePage(totalPages)">{{ totalPages }}</a>
          </div>
        </div>
        </div>
        <div class="col-1 paging" >
          <a class="paging-link btn" :class="{ invisible: currentPage === totalPages }"
          @click="changePage(currentPage + 1)">بعدی</a>
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
    const showForm = ref(false)
    const showPagging = ref(true)
    const selectedCategory = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(20)
    const totalItems = ref(0)

    const fetchCategories = async (page = 1, search = '') => {
      try {
        const response = await apiService.getCategories(page, search)
        categories.value = response.data.categories
        totalItems.value = response.data.totalItems
        itemsPerPage.value = response.data.itemPerPage
        showPagging.value = (response.data.totalItems > response.data.itemPerPage)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const createCategory = async (category) => {
      try {
        await apiService.createCategory(category)
        fetchCategories(currentPage.value)
        showForm.value = false
      } catch (error) {
        console.error('Error creating category:', error)
      }
    }

    const updateCategory = async (id, category) => {
      try {
        await apiService.updateCategory(id, category)
        fetchCategories(currentPage.value)
        showForm.value = false
      } catch (error) {
        console.error('Error updating category:', error)
      }
    }

    const deleteCategory = async (id) => {
      try {
        await apiService.deleteCategory(id)
        fetchCategories(currentPage.value)
      } catch (error) {
        console.error('Error deleting category:', error)
      }
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

    const searchCategory = () => {
      fetchCategories(1, searchQuery.value)
    }

    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        currentPage.value = page
        fetchCategories(currentPage.value, searchQuery.value)
      }
    }

    const totalPages = computed(() => {
      return Math.ceil(totalItems.value / itemsPerPage.value)
    })

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      searchQuery,
      showForm,
      showPagging,
      selectedCategory,
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      createCategory,
      updateCategory,
      deleteCategory,
      toggleAddCategory,
      searchCategory,
      editCategory,
      handleFormSubmit,
      changePage
    }
  }
}
</script>

<style scoped>
</style>
