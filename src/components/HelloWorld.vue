<template>
  <div class="hello">

     <sortable group="tabs" v-model="tabs">
      <ul class="tabs" slot-scope="{ items }">
        <sortable-item v-for="tab in items" :key="tab">
          <drag-handle>
            <li>{{ tab }}</li>
          </drag-handle>
        </sortable-item>
      </ul>
     </sortable>

     <dropzone @receive="handleDrop">
       <div slot-scope="scope" class="dropzone" :class="scope">
         Drop item here {{ message }}
       </div>
     </dropzone>


     <sortable group="groups">
      <div class="OuterGroup">
        <sortable-item>
          <div class="FirstOuterItem">
            <drag-handle>
              <span>
                  Group 1 (items): {{ items }}
              </span>
            </drag-handle>

            <sortable group="list" v-model="items">
               <ul slot-scope="{ items }" class="FirstSortable">
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
        </sortable-item>
        <sortable-item>
          <div class="SecondOuterItem">
            <drag-handle>
              <span>
                  Group 1 (items2): {{ items2 }}
              </span>
            </drag-handle>
            <sortable group="list" v-model="items2">
               <ul slot-scope="{ items }" class="SecondSortable">
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
        </sortable-item>
      </div>
     </sortable>


<!--     <sortable group="list" v-model="items">
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
 -->

  
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
      tabs: ['Chrome', 'Firefox', 'Edge'],
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
      if (!item) {
        return;
      }
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
.draggable-source--is-dragging {
  opacity: 0.5;
}
.tabs > li {
  display: inline-block;
  width: 80px;
  padding: 2px 8px;
  margin-right: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.tabs {
  border-bottom: 1px solid #eee;
  min-height: auto;
}
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
