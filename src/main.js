import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { Draggable } from '@shopify/draggable';

Vue.prototype.$draggable  = new Draggable([], {
  draggable: '.draggable-item'
});  


new Vue({
  render: h => h(App),
  mounted() {
    this.$draggable.addContainer(this.$el); 
  }
}).$mount('#app')
