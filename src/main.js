import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { Draggable } from '@shopify/draggable';

const draggable  = new Draggable([], {
  draggable: '.draggable-item'
});  

new Vue({
  render: h => h(App),
  provide: {
    draggable
  },
  mounted() {
    draggable.addContainer(this.$el); 
  }
}).$mount('#app')
