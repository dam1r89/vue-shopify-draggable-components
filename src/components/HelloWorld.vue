<template>
  <div class="hello">
   <droppable></droppable>
   <sortable group="list" v-model="items">
      <ul slot-scope="{ items }">
        <sortable-item v-for="item in items" :key="item.id">
          <li>
            {{ item.name }}
          </li>
        </sortable-item>
      </ul>
   </sortable>
   <sortable group="list" v-model="items2">
      <ul slot-scope="{ items }">
        <sortable-item v-for="item in items" :key="item.id">
          <li>
            {{ item.name }}
          </li>
        </sortable-item>
      </ul>
   </sortable>
   <sortable group="list2" v-model="items3">
      <ul slot-scope="{ items }">
        <sortable-item v-for="item in items" :key="item.id">
          <li>
            {{ item.name }}
          </li>
        </sortable-item>
      </ul>
   </sortable>
  </div>
</template>

<script>
import Droppable from './Droppable.vue';
import Sortable from './Sortable.vue';
import SortableItem from './SortableItem.vue';

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
    SortableItem
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
ul {
  list-style-type: none;
}
li {
  margin-bottom: 4px;
  background: #eee;
  border: 1px solid #777;
  border-radius: 3px;
  padding: 8px;
  width: 300px;
}
</style>
