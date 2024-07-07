// src/services/apiService.js

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5184/api', // Replace with your actual API base URL
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCategories () {
    return apiClient.get('/categories')
  },
  getCategory (id) {
    return apiClient.get(`/categories/${id}`)
  },
  createCategory (category) {
    return apiClient.post('/categories', category)
  },
  updateCategory (id, category) {
    return apiClient.put(`/categories/${id}`, category)
  },
  deleteCategory (id) {
    return apiClient.delete(`/categories/${id}`)
  },
  getLabels () {
    return apiClient.get('/labels')
  },
  getLabel (id) {
    return apiClient.get(`/labels/${id}`)
  },
  createLabel (label) {
    return apiClient.post('/labels', label)
  },
  updateLabel (id, label) {
    return apiClient.put(`/labels/${id}`, label)
  },
  deleteLabel (id) {
    return apiClient.delete(`/labels/${id}`)
  },
  getQuestions () {
    return apiClient.get('/questions')
  },
  getQuestion (id) {
    return apiClient.get(`/questions/${id}`)
  },
  createQuestion (question) {
    return apiClient.post('/questions', question)
  },
  updateQuestion (id, question) {
    return apiClient.put(`/questions/${id}`, question)
  },
  deleteQuestion (id) {
    return apiClient.delete(`/questions/${id}`)
  }
}
