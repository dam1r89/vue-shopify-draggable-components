import { Draggable } from '@shopify/draggable';
import Dropzone from './components/Dropzone.vue';
import Sortable from './components/Sortable.vue';
import SortableItem from './components/SortableItem.vue';
import DragHandle from './components/DragHandle.vue';

const MyPlugin = {};

MyPlugin.install = function(Vue) {

    const draggableClass = 'draggable-item';
    const dragHandleClass = 'drag-handle';

    Vue.prototype.$draggable = new Draggable([], {
        draggableClass,
        dragHandleClass,
        draggable: `.${draggableClass}`,
        handle: `.${dragHandleClass}`,
        mirror: {
            constrainDimensions: true,
        },
    });

    Vue.component('DragHandle', DragHandle);
    Vue.component('Dropzone', Dropzone);
    Vue.component('Sortable', Sortable);
    Vue.component('SortableItem', SortableItem);

    Vue.mixin({
        mounted() {
            if (!this.$parent) {
                this.$draggable.addContainer(this.$el);
            }
        }
    });
};

export default MyPlugin;
