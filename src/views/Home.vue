<template>
  <div class="container mt-5">
    <div class="text-center mb-4">
      <img
        src="https://cdn.animaapp.com/projects/668a493911355406a7822a05/releases/668a499494e39f8125241b4d/img/logo.png"
        alt="Logo" class="mb-2" />
      <h1 class="yekanbakh-medium-deep-sapphire-24px">سوالات متداول</h1>
    </div>
    <div class="d-flex justify-content-center mb-4">
      <CategoryButton
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :is-selected="selectedCategory === category.id"
      @category-selected="fetchCategoryQuestions"
    />
    </div>
    <div class="questions" v-if="questions.length">
      <Question v-for="question in questions" :key="question.id" :title="question.title"
        :shortAnswer="question.shortAnswer" :longAnswer="question.longAnswer" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService'
import CategoryButton from '../components/CategoryButton.vue'
import Question from '../components/Question.vue'

export default {
  name: 'Home',
  components: {
    CategoryButton,
    Question
  },
  setup () {
    const categories = ref([])
    const questions = ref([])

    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories()
        categories.value = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const fetchCategoryQuestions = async (categoryId) => {
      try {
        const response = await apiService.getCategory(categoryId)
        questions.value = response.data.questions
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      questions,
      fetchCategoryQuestions
    }
  }
}
</script>

<style scoped>
.yekanbakh-medium-deep-sapphire-24px {
  font-size: 24px;
  color: #123456;
  /* Adjust color as needed */
}
</style>
