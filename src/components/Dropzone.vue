<script>
export default {
    props: ['data'],
    data() {
        return {
            over: false,
            active: false
        };
    },
    mounted() {
        this.$draggable.on('drag:start', this.onDragStart)
            .on('drag:move', this.onDragMove)
            .on('drag:stop', this.onDragStop);
    },
    destroyed() {
        this.$draggable.off('drag:start', this.onDragStart)
            .off('drag:move', this.onDragMove)
            .off('drag:stop', this.onDragStop);
    },
    methods: {
        onDragStart() {
            this.active = true;
        },
        onDragMove(event) {
            const target = event.sensorEvent.target;
            if (target === this.$el || this.$el.contains(target)) {
                if (this.over === false) {
                    event.source._source.newComponent = this;
                    this.$emit('enter');
                }
                this.over = true;
            }
            else {
                if (this.over === true) {
                    event.source._source.newComponent = null;
                    this.$emit('leave');
                }
                this.over = false;
            }

        },
        onDragStop(event) {
            this.active = false;
            if (!this.over) {
                return;
            }
            this.over = false;

            this.$emit('receive', event.source._source);
            event.source._source.oldComponent.$emit('drop', {
                ...event.source._source,
                data: this.data
            });
        }
    },
    render() {
        if (this.$scopedSlots.default) {
            return this.$scopedSlots.default({
                over: this.over,
                active: this.active
            });
        }
        return this.$slots.default[0];
    }
};
</script>
