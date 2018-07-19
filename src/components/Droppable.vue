<template>
    <div class="dropzone" :class="{ active, over }">
        Dropzone
    </div>
</template>
<style>
   .dropzone {
        background: tomato;
        border: 2px solid transparent;
   } 
   .dropzone.active {
        border-color: blue;
   }
   .dropzone.over {
        border-color: red;
   }

</style>
<script>
export default {
    data() {
        return {
            over: false,
            active: false
        }
    },
    mounted() {
        // draggable.addContainer(this.$el);
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
                    this.$emit('enter');
                }
                this.over = true; 
            }
            else {
                if (this.over === true) {
                    this.$emit('leave');
                }
                this.over = false;
            }

        },
        onDragStop() {
            this.active = false;
            if (!this.over) {
                return;
            }
            this.$emit('drop');
            console.log('dropped');
        }
    }
}
</script>