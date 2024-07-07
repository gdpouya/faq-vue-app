import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ManageCategories from '../views/ManageCategories.vue'
import ManageQuestions from '../views/ManageQuestions.vue'
import ManageLabels from '../views/ManageLabels.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/manage-categories', component: ManageCategories },
  { path: '/manage-questions', component: ManageQuestions },
  { path: '/manage-labels', component: ManageLabels }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
