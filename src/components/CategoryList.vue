<template>
  <div class="container mt-4">
    <h1>Categories</h1>
    <ul class="list-group">
      <li v-for="category in categories" :key="category.id" class="list-group-item">
        {{ category.title }}
        <button class="btn btn-primary btn-sm float-right" @click="fetchQuestions(category.id)">View Questions</button>
      </li>
    </ul>
  </div>
</template>

<script>
import apiService from '@/services/apiService'

export default {
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      try {
        const response = await apiService.getCategories()
        this.categories = response.data
      } catch (error) {
        console.error('There was an error!', error)
      }
    },
    async fetchQuestions (categoryId) {
      // Logic to fetch and display questions for the selected category
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
