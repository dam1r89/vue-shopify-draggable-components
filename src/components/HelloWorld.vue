<template>
  <div class="hello">
     <droppable @drop="handleDrop">
       <div slot-scope="scope" class="dropzone" :class="scope">
         Drop item here {{ message }}
       </div>
     </droppable>
     Group 1 (items): {{ items }}
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
     Group 1 (items2): {{ items2 }}
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
  
     Group 2 (items3): {{ items3 }}
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
     Group 2 (copy, items3): {{ items3 }}
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
</template>

<script>

export default {
  name: 'HelloWorld',
  data() {
    return {
      message: '',
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
  props: {
    msg: String
  },
  methods: {
    handleDrop({ item }) {
      this.message = item.name;
      setTimeout(() => {
        this.message = '';
      }, 1400)
      this.items3 = this.items3.filter(x => x !== item);

    }  
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
}
ul {
  list-style-type: none;
  min-height: 60px
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
     background: blue;
     color: white;
}
.dropzone.over {
     background: red;
     color: white;
}

</style>
