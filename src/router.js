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
import ReceiptInvestigation from "./views/ReceiptInvestigation.vue"
import NewInvestigation from "./views/NewInvestigation.vue"
import ViewInvestigation from "./views/ViewInvestigation.vue"
import UpdateInvestigation from "./views/UpdateInvestigation.vue"
import LicenseCompany from "./views/LicenseCompany.vue"
import CompanyInvestigation from "./views/CompanyInvestigation.vue"
import ViewLC from "./views/ViewLC.vue"
import LicenseFee from "./views/LicenseFee.vue"

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
      path: "/receiptinvestigation",
      name: "receiptinvestigation",
      component: ReceiptInvestigation
    },
    {
      path: "/newinvestigation/:id",
      name: "newinvestigation",
      component: NewInvestigation
    },
    {
      path: "/viewinvestigation/:id",
      name: "viewinvestigation",
      component: ViewInvestigation
    },
    {
      path: "/updateinvestigation/:id",
      name: "updateinvestigation",
      component: UpdateInvestigation
    },
    {
      path: "/licensecompany",
      name: "licensecompany",
      component: LicenseCompany
    },
    {
      path: "/companyinvestigation/:id",
      name: "companyinvestigation",
      component: CompanyInvestigation
    },
    {
      path: "/licensefee/:id",
      name: "licensefee",
      component: LicenseFee
    },
    {
      path: "/viewlc",
      name: "viewlc",
      component: ViewLC
    },
  ]
});
