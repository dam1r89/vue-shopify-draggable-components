import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ShopifyDraggable from './ShopifyDraggable';

Vue.use(ShopifyDraggable);

new Vue({
  render: h => h(App),
}).$mount('#app')
