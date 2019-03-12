import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import CompanyType from "./views/CompanyType.vue"
import Owner from "./views/Owner.vue"
import NewOwner from "./views/NewOwner.vue"
import UpdateOwner from "./views/UpdateOwner.vue"
import Company from "./views/Company.vue"
import NewCompany from "./views/NewCompany.vue"
import UpdateCompany from "./views/UpdateCompany.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/owner",
      name: "owner",
      component: Owner
    },
    {
      path: "/newowner",
      name: "newowner",
      component: NewOwner
    },
    {
      path: "/updateowner/:id",
      name: "updateowner",
      component: UpdateOwner
    },
    {
      path: "/company",
      name: "company",
      component: Company
    },
    {
      path: "/newcompany",
      name: "newcompany",
      component: NewCompany
    },
    {
      path: "/companytype",
      name: "companytype",
      component: CompanyType
    },
    {
      path: "/updatecompany/:id",
      name: "updatecompany",
      component: UpdateCompany
    }
  ]
});
