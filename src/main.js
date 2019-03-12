import Vue from "vue";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Vuetify)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
