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
import Users from "./views/Users.vue"
import RequestLicense from "./views/RequestLicense.vue"
import NewRequestLicense from "./views/NewRequestLicense.vue"
import UpdateRequestLicense from "./views/UpdateRequestLicense.vue"
import ConfirmRL from "./views/ConfirmRL.vue"
import UpdateStatusRL from "./views/UpdateStatusRL.vue"
import Investigation from "./views/Investigation.vue"
import NewInvestigation from "./views/NewInvestigation.vue"

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
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/requestlicense",
      name: "requestlicense",
      component: RequestLicense
    },
    {
      path: "/newrequestlicense",
      name: "newrequestlicense",
      component: NewRequestLicense
    },
    {
      path: "/updaterequestlicense/:id",
      name: "updaterequestlicense",
      component: UpdateRequestLicense
    },
    {
      path: "/confirmrequest",
      name: "confirmrequest",
      component: ConfirmRL
    },
    {
      path: "/updatestatusrl/:id",
      name: "updatestatusrl",
      component: UpdateStatusRL
    },
    {
      path: "/investigation",
      name: "investigation",
      component: Investigation
    },
    {
      path: "/newinvestigation/:id",
      name: "newinvestigation",
      component: NewInvestigation
    }
  ]
});
