<script>
export default {
    mounted() {
        this.$el.classList.add(this.$draggable.options.draggableClass);
    },
    render() {
        return this.$slots.default[0];
    },
};
</script>