<template>
  <button
    @click="handleClick"
    :class="{
      btn: true,
      'btn-outline-primary': !isSelected,
      'btn-primary': isSelected,
    }"
  >
  {{ category.title }}
  </button>
</template>

<script>
export default {
  name: 'CategoryButton',
  props: {
    category: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('category-selected', this.category.id)
    }
  }
}
</script>
