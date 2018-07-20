
<style>

</style>
<script>
function move({source, over, overContainer, children}) {
  const emptyOverContainer = !children.length;
  const differentContainer = source.parentNode !== overContainer;
  const sameContainer = over && !differentContainer;

  if (emptyOverContainer) {
    return moveInsideEmptyContainer(source, overContainer);
  } else if (sameContainer) {
    return moveWithinContainer(source, over);
  } else if (differentContainer) {
    return moveOutsideContainer(source, over, overContainer);
  } else {
    return null;
  }
}

function moveInsideEmptyContainer(source, overContainer) {
  const oldContainer = source.parentNode;

  overContainer.appendChild(source);

  return {oldContainer, newContainer: overContainer};
}

function moveWithinContainer(source, over) {
  const oldIndex = index(source);
  const newIndex = index(over);

  if (oldIndex < newIndex) {
    source.parentNode.insertBefore(source, over.nextElementSibling);
  } else {
    source.parentNode.insertBefore(source, over);
  }

  return {oldContainer: source.parentNode, newContainer: source.parentNode};
}

function index(element) {
  return Array.prototype.indexOf.call(element.parentNode.children, element);
}

function moveOutsideContainer(source, over, overContainer) {
  const oldContainer = source.parentNode;

  if (over) {
    over.parentNode.insertBefore(source, over);
  } else {
    // need to figure out proper position
    overContainer.appendChild(source);
  }

  return {oldContainer, newContainer: source.parentNode};
}


function moveArray(items, oldIndex, newIndex) {
  const itemRemovedArray = [
    ...items.slice(0, oldIndex),
    ...items.slice(oldIndex + 1, items.length)
  ]
  return [
    ...itemRemovedArray.slice(0, newIndex),
    items[oldIndex],
    ...itemRemovedArray.slice(newIndex, itemRemovedArray.length)
  ]
}

export default {
    props: ['value', 'group'],
    inject: ['draggable'],
    provide() {
      return {
        itemClass: 'draggable-item',
        handleClass: 'draggable-handle',
      }
    },
    mounted() {
      this.draggable.on('drag:start', this.onDragStart)
          .on('drag:over', this.onDragOver)
          .on('drag:stop', this.onDragStop)
    },
    destroyed() {
      this.draggable.off('drag:start', this.onDragStart)
          .off('drag:over', this.onDragOver)
          .off('drag:stop', this.onDragStop)
    },
    methods: {
        isChild(event) {
            const target = event.sensorEvent.target;
            return target === this.$el || this.$el.contains(target)
        },
        index(element) {
          return this.draggable.getDraggableElementsForContainer(element.parentNode).indexOf(element);
        },
        onDragStart(event) {

            if (this.isChild(event)) {
                const startIndex =  this.index(event.source);
                event.source._source = {
                    component: this,
                    startIndex,
                    item: this.value[startIndex]
                }
            }
            
        },
        onDragOver(event) {
            if (event.over === event.originalSource || event.over === event.source) {
              return;
            }

            if (!this.isChild(event)) {
                return;
            }

            const {source, over} = event;
            const overContainer = this.$el;

            source._source.newComponent = this;

            if (source._source.component.group !== this.group) {
                return;
            }

            const children = this.draggable.getDraggableElementsForContainer(overContainer);
            move({source, over, overContainer, children});
        },
        onDragStop(event) {
            const newIndex = this.index(event.source);
            const newContainer = event.source.parentNode;

            const e = event.source._source;

            const belongToSameGroup = this.group === e.component.group && e.component.group === e.newComponent.group

            if (!belongToSameGroup) {
                return;
            }

            const sendingOrReceivingElement = newContainer === this.$el || e.component === this;

            if (!sendingOrReceivingElement) {
                return;
            }

            const sameContainer = e.component.$el === newContainer;
            if (sameContainer) {
                this.$emit('input', moveArray(this.value, e.startIndex, newIndex));
            } else if  (newContainer === this.$el) {
                // if new container is me, add
                const newArray = [...this.value];
                newArray.splice(newIndex, 0, e.item);
                this.$emit('input', newArray);
                this.$emit('receive', e.item);
            } else if (e.component === this) {
                const newArray = [...this.value];
                const removed = newArray.splice(e.startIndex, 1);
                this.$emit('input', newArray);
                this.$emit('remove', removed[0]);
            } 
        }
    },
    render() {
      return this.$scopedSlots.default({
        items: this.value,
      })
    }
}
</script>