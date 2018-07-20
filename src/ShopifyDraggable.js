const MyPlugin = {};

import { Draggable } from '@shopify/draggable';

MyPlugin.install = function(Vue) {

    const draggableClass = 'draggable-item';
    const dragHandleClass = 'drag-handle';

    Vue.prototype.$draggable = new Draggable([], {
        draggableClass,
        dragHandleClass,
        draggable: `.${draggableClass}`,
        handle: `.${dragHandleClass}`,
    });

    Vue.mixin({
        mounted() {
            if (!this.$parent) {
                this.$draggable.addContainer(this.$el);
            }
        }
    })
}

export default MyPlugin;