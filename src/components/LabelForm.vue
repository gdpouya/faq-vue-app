<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">عنوان</label>
        <input
          type="text"
          id="title"
          v-model="localLabel.title"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">توضیحات</label>
        <input
          type="text"
          id="description"
          v-model="localLabel.description"
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
  name: 'LabelForm',
  props: {
    initialLabel: {
      type: Object,
      default: () => ({ title: '', description: '' })
    }
  },
  setup (props, { emit }) {
    const localLabel = ref({ ...props.initialLabel })

    // Watch for changes in initialLabel prop and update localLabel
    watch(
      () => props.initialLabel,
      (newVal) => {
        localLabel.value = { ...newVal }
      }
    )

    const handleSubmit = () => {
      emit('submit', localLabel.value)
    }

    return {
      localLabel,
      handleSubmit
    }
  }
}
</script>
