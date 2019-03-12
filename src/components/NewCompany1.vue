<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-btn slot="activator" color="purple darken-2" dark>เพิ่มข้อมูลกิจการ</v-btn>
      <v-card>
        <v-card-title
        class="headline grey lighten-2"
        primary-title
        >
            Company
          <!-- <span class="headline">Company</span> -->
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                    label="เลขที่กิจการ*"
                    v-model="NewCompany.CompanyCode"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="ประเภทของกิจการ*"
                    v-model="NewCompany.TypeServiceCode"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md8>
                <v-text-field 
                    label="ชื่อกิจการ*" 
                    v-model="NewCompany.CompanyName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    label="เจ้าของกิจการ*"
                    v-model="NewCompany.OwnerID"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    label="รายละเอียดเพิ่มเติมของกิจการ*"
                    v-model="NewCompany.TypeServiceDetail"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="ที่อยู่กิจการ"
                    v-model="NewCompany.CompanyNo"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="หมู่"
                    v-model="NewCompany.CompanyMoo"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="ซอย"
                    v-model="NewCompany.CompanySoi"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="ถนน"
                    v-model="NewCompany.CompanyRoad"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="ตำบล"
                    v-model="NewCompany.CompanyTumbon"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="เบอร์โทรศัพท์"
                    v-model="NewCompany.CompanyPhone"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="ขนาดพื้นที่กิจการ"
                    v-model="NewCompany.CompanyArea"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="จำนวนเครื่องจักรภายในกิจการ"
                    v-model="NewCompany.CompanyMachine"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                    label="จำนวนพนักงาน"
                    v-model="NewCompany.CompanyLabor"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submitNewCompany">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
const axios = require('axios')
  export default {  
    data: () => ({
        dialog: false,
        NewCompany: {    
            CompanyCode: '',
            CampanyName: '',
            TypeServiceCode: '',
            TypeServiceDetail: '',
            OwnerID: '',
            CompanyNo: '',
            CompanyMoo: '',
            CompanySoi: '',
            CompanyRoad: '',
            CompanyTumbon: '',
            CompanyPhone: '',
            CompanyArea: '',
            CompanyMachine: '',
            CompanyLabor: ''
        }
    }),
    methods: {
        submitNewCompany () {
            let company = {
                CompanyCode: this.NewCompany.CompanyCode,
                CompanyName: this.NewCompany.CompanyName,
                TypeServiceCode: this.NewCompany.TypeServiceCode,
                TypeServiceDetail: this.NewCompany.TypeServiceDetail,
                OwnerID: this.NewCompany.OwnerID,
                CompanyNo: this.NewCompany.CompanyNo,
                CompanyMoo: this.NewCompany.CompanyMoo,
                CompanySoi: this.NewCompany.CompanySoi,
                CompanyRoad: this.NewCompany.CompanyRoad,
                CompanyTumbon: this.NewCompany.CompanyTumbon,
                CompanyPhone: this.NewCompany.CompanyPhone,
                CompanyArea: this.NewCompany.CompanyArea,
                CompanyMachine: this.NewCompany.CompanyMachine,
                CompanyLabor: this.NewCompany.CompanyLabor
            }
            axios.post('http://localhost:5003/addcompany', company)
            .then(res => {
                // console.log(res)
                this.$emit('AddCompany')
                this.dialog = false
                this.NewCompany = ''              
            })
        }
    }
  }
</script>

