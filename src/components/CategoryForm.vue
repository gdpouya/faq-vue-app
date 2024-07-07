<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">عنوان</label>
        <input
          type="text"
          id="title"
          v-model="localCategory.title"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">توضیحات</label>
        <input
          type="text"
          id="description"
          v-model="localCategory.description"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">ذخیره</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'CategoryForm',
  props: {
    initialCategory: {
      type: Object,
      default: () => ({ title: '', description: '' })
    }
  },
  setup (props, { emit }) {
    const localCategory = ref({ ...props.initialCategory })

    // Watch for changes in initialCategory prop and update localCategory
    watch(
      () => props.initialCategory,
      (newVal) => {
        localCategory.value = { ...newVal }
      }
    )

    const handleSubmit = () => {
      emit('submit', localCategory.value)
    }

    return {
      localCategory,
      handleSubmit
    }
  }
}
</script>
