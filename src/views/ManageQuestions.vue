<template>
  <div class="container mt-5">
    <h1>مدیریت سوالات</h1>
    <button @click="addQuestion" class="btn btn-primary mb-3">
      افزودن سوال
    </button>
    <div v-for="question in questions" :key="question.id" class="mb-3">
      <QuestionForm
        :question="question"
        @submit="updateQuestion(question.id, $event)"
      />
      <button @click="deleteQuestion(question.id)" class="btn btn-danger">
        حذف
      </button>
    </div>
    <QuestionForm @submit="createQuestion" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService'
import QuestionForm from '../components/QuestionForm.vue'

export default {
  name: 'ManageQuestions',
  components: {
    QuestionForm
  },
  setup () {
    const questions = ref([])

    const fetchQuestions = async () => {
      try {
        const response = await apiService.getQuestions()
        questions.value = response.data
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    const createQuestion = async (question) => {
      try {
        await apiService.createQuestion(question)
        fetchQuestions()
      } catch (error) {
        console.error('Error creating question:', error)
      }
    }

    const updateQuestion = async (id, question) => {
      try {
        await apiService.updateQuestion(id, question)
        fetchQuestions()
      } catch (error) {
        console.error('Error updating question:', error)
      }
    }

    const deleteQuestion = async (id) => {
      try {
        await apiService.deleteQuestion(id)
        fetchQuestions()
      } catch (error) {
        console.error('Error deleting question:', error)
      }
    }

    onMounted(() => {
      fetchQuestions()
    })

    return {
      questions,
      createQuestion,
      updateQuestion,
      deleteQuestion
    }
  }
}
</script>
