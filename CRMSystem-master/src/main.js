import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入Echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts



Vue.use(ElementUI);


// Vue.config.productionTip = false;
Vue.config.productionTip = process.env.NODE_ENV === 'production';//动态的显示，再开发环境就显示false，生产环境就显示true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
