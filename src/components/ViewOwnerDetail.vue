<template>
    <v-layout row justify-center mt-5 mb-5 ml-5 mr-5>
        <v-flex xs12 sm12 md12>
            <v-card>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12>
                                <v-container fluid grid-list-lg style="border: 1px solid rgb(204, 204, 204); border-radius: 7px; margin-top: 20px;">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm12 md12>
                                                    <div class="titlename">ข้อมูลเจ้าของสถานประกอบการ: {{ `${owner.Prefixname}${owner.Ofirstname}    ${owner.Olastname}` }}</div>                                                    </div>
                                                </v-flex>
                                            </v-layout>
                                            <v-divider></v-divider>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm6 md3 offset-md1 class="font-weight-bold">
                                                    เลขบัตรประจำตัวประชาชน:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md7>
                                                    {{ numberIDcard(owner.Ocitizenid) }}
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md3 offset-md1 class="font-weight-bold">
                                                    ชื่อ - สกุล:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md7>
                                                    {{ `${owner.Prefixname}  ${owner.Ofirstname}    ${owner.Olastname}` }}
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md3 offset-md1 class="font-weight-bold">
                                                    อายุ:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md3>
                                                    {{ `${owner.Oage} ปี` }}
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md1 class="font-weight-bold">
                                                    สัญชาติ:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md3>
                                                    {{ `${owner.Onationality}` }}
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md3 offset-md1 class="font-weight-bold">
                                                    เบอร์โทรศัพท์:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md3 >
                                                    {{ numberToTel(owner.Otel) }}
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md1 class="font-weight-bold">
                                                    อีเมล์:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md2>
                                                    {{ owner.Oemail }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md3 offset-md1 class="font-weight-bold">
                                                    ที่อยู่:
                                                </v-flex>                       
                                                <v-flex xs12 sm6 md7>
                                                    {{ `เลขที่ ${owner.Ohomeno} หมู่ ${owner.Omoo} ซอย ${owner.Osoi} ถนน ${owner.Oroad} หมู่บ้าน ${owner.Ovillage} ตำบล ${address.subdistrict} อำเภอ ${address.district} จังหวัด ${address.province}` }}
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                        </v-flex>
                        <v-flex xs12>
                            <v-card color="white" class="white--black">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                <v-flex xs12>
                                    <div>
                                    <div class="titlename">สถานประกอบการ</div>
                                    <div>
                                        <ViewCompany/>                                        
                                    </div>
                                    <div style="text-align: right;">
                                    <v-spacer></v-spacer>
                                    
                                    <v-btn color="red darken-4" flat @click="$router.go(-1)" >
                                        <v-icon>arrow_back_ios</v-icon>
                                        <span>ย้อนกลับ</span>
                                    </v-btn>
                                    </div>
                                    </div>
                                </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card>
                        </v-flex> 
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex><!-- <RenewLicensePDF v-if="dialogRenew" :Cid="Cid" :dialog="dialogRenew" @closeDialog="dialogRenew = false"/> -->
    </v-layout>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ViewCompany from './ViewCompany'
export default {
    components: {
        ViewCompany
    },
    data: () => ({
        address: {
            subdistrict: '',
            district: '',
            province: ''
        },
        Oid: 0,
        Cid: 0,
        owner: {}
    }),
    created () {
        axios.get('http://localhost:5003/getownerbyid/' + this.$route.params.id)
                .then(res => {
                    console.log(this.$route.params.id)
                    this.owner = res.data[0]
                    axios.get('http://localhost:5003/getdistrict/' + this.owner.Did)
                        .then(res => {
                            this.address.district = res.data[0].Dname_th
                        })
                    axios.get('http://localhost:5003/getsubdistrict/' + this.owner.SDTid)
                        .then(res => {
                            this.address.subdistrict = res.data[0].SDTname_th
                        })
                    axios.get('http://localhost:5003/getprovince/' + this.owner.Pid)
                        .then(res => {
                            this.address.province = res.data[0].Pname_th
                        })
                })
    },
    methods: {
        numberIDcard(idcard) {
            return idcard = idcard.replace( /(\d{1})(\d{4})(\d{5})(\d{1})(\d{2})/, '$1' + '-' + '$2' + '-' + '$3' + '-' + '$4' + '-' + '$5')
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        numberToTel (tel) {
            return tel = tel.replace( /(\d{3})(\d{3})(\d{4})/, '$1' + '-' + '$2' + '$3' )
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Kanit:100,200,300,400,500,600,700');
    body, html {
    font-family: 'Kanit';
    }
    .titlename {
        font-family: 'Kanit';
        font-size: 22pt;
    }
</style>