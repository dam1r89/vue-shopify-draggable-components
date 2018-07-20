<script>
  export default {
    render() {
      return this.$slots.default[0]
    },
    mounted() {
      this.$el.classList.add(this.$draggable.options.dragHandleClass)
    }
  }
</script>