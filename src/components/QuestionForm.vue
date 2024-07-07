<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">عنوان</label>
        <input
          type="text"
          id="title"
          v-model="localQuestion.title"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="answer" class="form-label">پاسخ</label>
        <input
          type="text"
          id="answer"
          v-model="localQuestion.answer"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="answerDescription" class="form-label">توضیحات پاسخ</label>
        <textarea
          id="answerDescription"
          v-model="localQuestion.answerDescription"
          class="form-control"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="isDeleted" class="form-label">حذف شده</label>
        <input
          type="checkbox"
          id="isDeleted"
          v-model="localQuestion.isDeleted"
          class="form-check-input"
        />
      </div>
      <button type="submit" class="btn btn-primary">ذخیره</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'QuestionForm',
  props: {
    initialQuestion: {
      type: Object,
      default: () => ({
        title: '',
        answer: '',
        answerDescription: '',
        isDeleted: false
      })
    }
  },
  setup (props, { emit }) {
    const localQuestion = ref({ ...props.initialQuestion })

    watch(
      () => props.initialQuestion,
      (newVal) => {
        localQuestion.value = { ...newVal }
      }
    )

    const handleSubmit = () => {
      emit('submit', localQuestion.value)
    }

    return {
      localQuestion,
      handleSubmit
    }
  }
}
</script>
