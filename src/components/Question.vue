<template>
    <div class="mb-4">
        <h2 class="yekanbakh-medium-deep-sapphire-24px">{{ Title }}</h2>
        <p><strong>پاسخ کوتاه:</strong> {{ Answer }}</p>
        <p><strong>پاسخ بلند:</strong> {{ AnswerDescription }}</p>
    </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    Title: {
      type: String,
      required: true
    },
    Answer: {
      type: String,
      required: true
    },
    AnswerDescription: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.yekanbakh-medium-deep-sapphire-24px {
    font-size: 24px;
    color: #123456;
}
</style>
