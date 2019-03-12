<template>
  <v-layout row justify-center>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                    Company
                    <div>{{ $route.params.id }}</div>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                            label="เลขที่กิจการ*"
                            v-model="Company.CompanyCode"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="ประเภทของกิจการ*"
                            v-model="Company.TypeServiceCode"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md8>
                        <v-text-field 
                            label="ชื่อกิจการ*" 
                            v-model="Company.CompanyName"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            label="เจ้าของกิจการ*"
                            v-model="Company.OwnerID"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            label="รายละเอียดเพิ่มเติมของกิจการ*"
                            v-model="Company.TypeServiceDetail"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="ที่อยู่กิจการ"
                            v-model="Company.CompanyNo"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="หมู่"
                            v-model="Company.CompanyMoo"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="ซอย"
                            v-model="Company.CompanySoi"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="ถนน"
                            v-model="Company.CompanyRoad"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="ตำบล"
                            v-model="Company.CompanyTumbon"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="เบอร์โทรศัพท์"
                            v-model="Company.CompanyPhone"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="ขนาดพื้นที่กิจการ"
                            v-model="Company.CompanyArea"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="จำนวนเครื่องจักรภายในกิจการ"
                            v-model="Company.CompanyMachine"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            label="จำนวนพนักงาน"
                            v-model="Company.CompanyLabor"
                        >
                        </v-text-field>
                    </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat :to="'/company/'">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="submitUpdateCompany">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
  </v-layout>
</template>


<script>
const axios = require('axios')
  export default { 
    created () {
        axios.get('http://localhost:5003/companygetid/' + this.$route.params.id)
        .then(res => {
            console.log(res)
            this.Company = res.data[0]
        })
    },
    data: () => ({
        Company: {}
    }),
    methods: {
        submitUpdateCompany () {
            let company = {
                    CompanyCode: this.Company.CompanyCode,
                    CompanyName: this.Company.CompanyName,
                    TypeServiceCode: this.Company.TypeServiceCode,
                    TypeServiceDetail: this.Company.TypeServiceDetail,
                    OwnerID: this.Company.OwnerID,
                    CompanyNo: this.Company.CompanyNo,
                    CompanyMoo: this.Company.CompanyMoo,
                    CompanySoi: this.Company.CompanySoi,
                    CompanyRoad: this.Company.CompanyRoad,
                    CompanyTumbon: this.Company.CompanyTumbon,
                    CompanyPhone: this.Company.CompanyPhone,
                    CompanyArea: this.Company.CompanyArea,
                    CompanyMachine: this.Company.CompanyMachine,
                    CompanyLabor: this.Company.CompanyLabor
            }
            axios.post('http://localhost:5003/updatecompany/' + this.$route.params.id, company)
            .then(res => {
                console.log(res) 
                this.$router.push('/company')          
            })
        }
    }
  }
</script>

