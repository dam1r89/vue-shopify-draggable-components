<template>
  <div class="hello">
    <div>
       <droppable>
         <div class="dropzone">
           Drop item here
         </div>
       </droppable>
       Group 1 (items)
       <sortable group="list" v-model="items">
          <ul slot-scope="{ items }">
            <sortable-item v-for="item in items" :key="item.id">
              <drag-handle>
                <li>
                  {{ item.name }}
                </li>
              </drag-handle>
            </sortable-item>
          </ul>
       </sortable>
       Group 1 (items2)
       <sortable group="list" v-model="items2">
          <ul slot-scope="{ items }">
            <sortable-item v-for="item in items" :key="item.id">
              <drag-handle>
                <li>
                  {{ item.name }}
                </li>
              </drag-handle>
            </sortable-item>
          </ul>
       </sortable>

       Group 2 (items3)
       <sortable group="list2" v-model="items3">
          <ul slot-scope="{ items }">
            <sortable-item v-for="item in items" :key="item.id">
              <drag-handle>
                <li>
                  {{ item.name }}
                </li>
              </drag-handle>
            </sortable-item>
          </ul>
       </sortable>
       Group 2 (copy, items3)
       <sortable group="list2" v-model="items3">
          <ul slot-scope="{ items }">
            <sortable-item v-for="item in items" :key="item.id">
              <drag-handle>
                <li>
                  {{ item.name }}
                </li>
              </drag-handle>
            </sortable-item>
          </ul>
       </sortable>
    </div>
    <div>
      <p>
        items: {{ items }}
      </p>
      <p>
        items2: {{ items2 }}
      </p>
      <p>
        items3: {{ items3 }}
      </p>
    </div>
  </div>
</template>

<script>
import Droppable from './Droppable.vue';
import Sortable from './Sortable.vue';
import SortableItem from './SortableItem.vue';
import DragHandle from './DragHandle.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      items: [{
        id: 1,
        name: 'One'
      }, {
        id: 2,
        name: 'Two'
      }] ,
      items2: [{
        id: 3,
        name: 'Three' 
      }, {
        id: 4,
        name: 'Four'
      }],
      items3: [{
        id: 5,
        name: 'Five' 
      }, {
        id: 6,
        name: 'Six'
      }]
    }
  },
  components: {
    Droppable,
    Sortable,
    SortableItem,
    DragHandle
  },
  props: {
    msg: String
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.drag-handle {
  cursor: pointer;
}
.hello {
  text-align: left;
  display: flex;
}
ul {
  list-style-type: none;
}
li {
  text-align: center;
  margin-bottom: 4px;
  background: #eee;
  border: 1px solid #777;
  border-radius: 3px;
  padding: 8px;
  width: 300px;
}
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
