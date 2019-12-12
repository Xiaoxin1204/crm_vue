import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

import Console from "./components/Console.vue"
import CustomerCare from "./components/CustomerCare.vue"
import CustomerConstructAnalysis from "./components/CustomerConstructAnalysis.vue"
import CustomerContributeAnalysis from "./components/CustomerContributeAnalysis.vue"
import CustomerDevelopmentPlan from "./components/CustomerDevelopmentPlan.vue"
import CustomerInfoManagement from "./components/CustomerInfoManagement.vue"
import CustomerInternationalSea from "./components/CustomerInternationalSea.vue"
import CustomerLoseAnalysis from "./components/CustomerLoseAnalysis.vue"
import CustomerLoseManagement from "./components/CustomerLoseManagement.vue"
import CustomerServeAnalysis from "./components/CustomerServeAnalysis.vue"
import DataDictionaryManagement from "./components/DataDictionaryManagement.vue"
import MarketingOpportunityManagement from "./components/MarketingOpportunityManagement.vue"
import SelectProductInfo from "./components/SelectProductInfo.vue"
import SelectProductReserves from "./components/SelectProductReserves.vue"
import ServiceCreate from "./components/ServiceCreate.vue"
import ServiceManagement from "./components/ServiceManagement.vue"


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/Register",
      name: "Register",
      component: Register
    },
    {
      path: "/Home",
      name: "home",
      redirect: "/Home/Console",
      component: Home,
      children:[
        {
          path: "Console",
          name: "Console",
          component: Console
        },
        {
          path: "CustomerCare",
          name: "CustomerCare",
          component: CustomerCare
        },
        {
          path: "CustomerConstructAnalysis",
          name: "CustomerConstructAnalysis",
          component: CustomerConstructAnalysis
        },
        {
          path:"CustomerContributeAnalysis",
          name:"CustomerContributeAnalysis",
          component: CustomerContributeAnalysis
        },
        {
          path:"CustomerDevelopmentPlan",
          name:"CustomerDevelopmentPlan",
          component: CustomerDevelopmentPlan
        },
        {
          path:"CustomerInfoManagement/:id",
          name:"CustomerInfoManagement",
          component: CustomerInfoManagement
        },
        {
          path:"CustomerInternationalSea",
          name:"CustomerInternationalSea",
          component: CustomerInternationalSea
        },
        {
          path:"CustomerLoseAnalysis",
          name:"CustomerLoseAnalysis",
          component: CustomerLoseAnalysis
        },
        {
          path:"CustomerLoseManagement",
          name:"CustomerLoseManagement",
          component: CustomerLoseManagement
        },
        {
          path:"CustomerServeAnalysis",
          name:"CustomerServeAnalysis",
          component: CustomerServeAnalysis
        },
        {
          path:"DataDictionaryManagement",
          name:"DataDictionaryManagement",
          component: DataDictionaryManagement
        },
        {
          path:"MarketingOpportunityManagement",
          name:"MarketingOpportunityManagement",
          component: MarketingOpportunityManagement
        },
        {
          path:"SelectProductInfo",
          name:"SelectProductInfo",
          component: SelectProductInfo
        },
        {
          path:"SelectProductReserves",
          name:"SelectProductReserves",
          component: SelectProductReserves
        },
        {
          path:"ServiceCreate",
          name:"ServiceCreate",
          component: ServiceCreate
        },
        {
          path:"ServiceManagement",
          name:"ServiceManagement",
          component: ServiceManagement
        },
      ]
    },

  ]
});
