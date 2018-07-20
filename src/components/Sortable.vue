
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
    mounted() {
      this.$draggable.addContainer(this.$el);
      this.$draggable.on('drag:start', this.onDragStart)
        .on('drag:over:container', this.onDragOverContainer)
        .on('drag:out:container', this.onDragOutContainer)
          .on('drag:over', this.onDragOver)
          .on('drag:stop', this.onDragStop)
    },
    destroyed() {
      this.$draggable.removeContainer(this.$el);
      this.$draggable.off('drag:start', this.onDragStart)
          .off('drag:over', this.onDragOver)
          .off('drag:stop', this.onDragStop)
    },
    methods: {
      shouldIgnore(e) {
        if (e.oldComponent.group !== this.group) {
            return true;
        }

        if (e.oldComponent.value === this.value && e.oldComponent.$el !== this.$el) {
            return true;
        }
        return false;
      },
        isChild(event) {
            const target = event.sensorEvent.target;
            return target === this.$el || this.$el.contains(target)
        },
        index(element) {
          return this.$draggable.getDraggableElementsForContainer(element.parentNode).indexOf(element);
        },
        onDragStart(event) {
          if (!this.isChild(event)) {
            return;
          }
          const oldIndex =  this.index(event.source);
          event.source._source = {
              oldComponent: this,
              oldIndex,
              item: this.value[oldIndex]
          }
            
        },
        onDragOverContainer(event) {
          const {source, over, overContainer} = event;
          if (overContainer !== this.$el){
            return;
          }

          const e = event.source._source;
          e.newComponent = this;

          if (this.shouldIgnore(e)) {
            return;
          }

          const children = this.$draggable.getDraggableElementsForContainer(overContainer);
          move({source, over, overContainer, children});

        },
        onDragOutContainer(event) {
          const {source} = event;


          const e = event.source._source;
          e.newComponent = null;

          if (this.shouldIgnore(e)) {
            return;
          }

          const overContainer = e.oldComponent.$el;
          const children = this.$draggable.getDraggableElementsForContainer(overContainer);
          const over = children[event.source._source.oldIndex];

           move({source, over, overContainer, children});
 
        },
        onDragOver(event) {
          
          if (event.over === event.originalSource || event.over === event.source) {
            return;
          }

          if (!this.isChild(event)) {
              return;
          }

          const e = event.source._source;
          e.newComponent = this;

          if (this.shouldIgnore(e)) {
            return;
          }

          const {source, over} = event;
          const overContainer = this.$el;

          const children = this.$draggable.getDraggableElementsForContainer(overContainer);
          move({source, over, overContainer, children});
        },
        onDragStop(event) {
            const e = event.source._source;

            const belongToSameGroup = e.newComponent && this.group === e.oldComponent.group && e.oldComponent.group === e.newComponent.group;

            if (!belongToSameGroup) {
                return;
            }

            const sendingOrReceivingElement = e.newComponent === this || e.oldComponent === this;

            if (!sendingOrReceivingElement) {
                return;
            }

            const sameBinding = e.newComponent !== this && e.newComponent.value === this.value;
            if (sameBinding) {
                return;
            }

            e.newIndex = this.index(event.source); 

            const sameContainer = e.oldComponent === e.newComponent;
            if (sameContainer) {
                this.onSortItems(e);
            } else if  (e.newComponent === this) {
                this.onReceiveItem(e);
            } else if (e.oldComponent === this) {
                this.onRemoveItem(e);
            } 
        },
        onSortItems(e) {
            this.$emit('input', moveArray(this.value, e.oldIndex, e.newIndex));
        },
        onReceiveItem(e) {
            if (e.oldComponent.value === this.value) {
                return;
            }
            const newArray = [...this.value];
            newArray.splice(e.newIndex, 0, e.item);
            this.$emit('input', newArray);
            this.$emit('receive', e.item);
        },
        onRemoveItem(e) {
            if (e.newComponent.value === this.value) {
                return;
            }
            this.$emit('input', this.value.filter(item => item !== e.item));
            this.$emit('remove', e.item);
        }
    },
    render() {
      return this.$scopedSlots.default({
        items: this.value,
      })
    }
}
</script>