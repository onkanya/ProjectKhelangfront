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
                                                <v-flex xs12 sm12 md7>
                                                    <div class="titlename">ข้อมูลสถานประกอบการ: {{ Company.Cname }}</div>
                                                </v-flex>
                                                <v-flex xs12 sm12 md3 offset-md2>
                                                    <v-tooltip top>
                                                        <v-btn fab dark 
                                                        color="deep-purple darken-1"
                                                        router
                                                        exact
                                                        slot="activator"
                                                        @click="ViewDetailOwner(Company.Oid)"
                                                        >
                                                            <v-icon dark>person_pin</v-icon>
                                                        </v-btn>
                                                            <span>เจ้าของสถานประกอบการ</span>
                                                    </v-tooltip>
                                                    <v-tooltip top>
                                                        <v-btn fab dark 
                                                        color="blue accent-3"
                                                        router
                                                        exact
                                                        slot="activator"
                                                        :to="'/viewinvestigation/' + Company.RLid"
                                                        >
                                                            <v-icon dark>security</v-icon>
                                                        </v-btn>
                                                            <span>เรียกดูประวัติการสำรวจ</span>
                                                    </v-tooltip>
                                                    <v-tooltip top v-if="Company.LCreceiptno != null">
                                                        <v-btn fab dark 
                                                        color="teal lighten-2"
                                                        router
                                                        exact
                                                        slot="activator"
                                                        @click="RenewLicensePDF(Company.Cid)"
                                                        >
                                                            <v-icon dark>autorenew</v-icon>
                                                        </v-btn>
                                                            <span>ต่อใบอนุญาตประกอบกิจการ</span>
                                                    </v-tooltip>
                                                </v-flex>
                                            </v-layout>
                                            <v-divider></v-divider>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm6 md2 offset-md1 class="font-weight-bold">
                                                    ประเภทสถานประกอบการ:
                                                </v-flex>
                                                <v-flex xs12 sm6 md9>
                                                    {{ Company.CTname }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 offset-md1 class="font-weight-bold">
                                                    รายละเอียด: 
                                                </v-flex>
                                                <v-flex xs12 sm6 md8>
                                                    <div>{{ `${Company.LFname} (${Company.Cnoted})` }}</div>
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 offset-md1 class="font-weight-bold">
                                                    ค่าธรรมเนียมรายปี:
                                                </v-flex>
                                                <v-flex xs12 sm6 md2>
                                                    {{ `${formatNumber(Company.LFfee)} บาท` }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 class="font-weight-bold">
                                                    ขนาดพื้นที่:
                                                </v-flex>
                                                <v-flex xs6 sm3 md4>
                                                    {{ `${Company.Carea} ตารางเมตร` }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 offset-md1 class="font-weight-bold">
                                                    เครื่องจักร:
                                                </v-flex>
                                                <v-flex xs6 sm3 md2>
                                                    {{ `${Company.Cmachine} แรงม้า` }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 class="font-weight-bold">
                                                    จำนวนพนักงาน:
                                                </v-flex>
                                                <v-flex xs6 sm3 md4>
                                                    {{ `${Company.Cemployee} คน` }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 offset-md1 class="font-weight-bold">
                                                    เบอร์โทรศัพท์:
                                                </v-flex>
                                                <v-flex xs12 sm6 md8>
                                                    {{ numberToTel(Company.Ctel) }}
                                                </v-flex>
                                                <v-flex xs12 sm6 md2 offset-md1 class="font-weight-bold">
                                                    ที่อยู่:
                                                </v-flex>
                                                <v-flex xs12 sm6 md8>
                                                    {{ `เลขที่ ${Company.Chomeno}  หมู่ที่ ${Company.Cmoo} ซอย ${Company.Csoi} ถนน ${Company.Croad} หมู่บ้าน ${Company.Cvillage} ตำบล ${address.subdistrict} อำเภอ ${address.district} จังหวัด ${address.province}` }}
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
                                    <div class="titlename">ใบอนุญาตประกอบกิจการ</div>
                                    <div>
                                        <ViewLC :updated="updated" @FetchSuccess="onFetchSuccess" />
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
        </v-flex>
        <ViewOwner v-if="dialog" :Oid="Oid" :dialog="dialog" @closeDialog="dialog = false"/>
        <RenewLicensePDF v-if="dialogRenew" :Cid="Cid" :dialog="dialogRenew" @closeDialog="dialogRenew = false" @onUpdateSuccess="onUpdateSuccess"/>
        <!-- <RenewLicensePDF v-if="dialogRenew" :Cid="Cid" :dialog="dialogRenew" @closeDialog="dialogRenew = false"/> -->
    </v-layout>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ViewLC from './ViewLC'
import ViewOwner from './ViewOwner'
import { GetLCforPDF } from '@/utils/LicensePDFhci'
import RenewLicensePDF from './RenewLicensePDF'
export default {
    components: {
        ViewLC,
        ViewOwner,
        RenewLicensePDF
    },
    data: () => ({
        Company: {},
        owner: [],
        address: {
            subdistrict: '',
            district: '',
            province: ''
        },
        fee: null,
        Oid: 0,
        Cid: 0,
        dialog: false,
        dialogRenew: false,
        updated: false
    }),
    created () {
        axios.get('http://localhost:5003/companygetid/' + this.$route.params.id)
            .then(res => {
                this.Company = res.data[0]
                this.date = this.Company.Cstartdate
                axios.get('http://localhost:5003/getdistrict/' + this.Company.Did)
                    .then(res => {
                        this.address.district = res.data[0].Dname_th
                    })
                axios.get('http://localhost:5003/getsubdistrict/' + this.Company.SDTid)
                    .then(res => {
                        this.address.subdistrict = res.data[0].SDTname_th
                    })
                axios.get('http://localhost:5003/getprovince/' + this.Company.Pid)
                    .then(res => {
                        this.address.province = res.data[0].Pname_th
                    })
        })
    },
    methods: {
        onFetchSuccess () {
            this.updated = false
        },
        onUpdateSuccess () {
            this.updated = true
            this.dialogCT = false
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        numberToTel (tel) {
            return tel = tel.replace( /(\d{3})(\d{3})(\d{4})/, '$1' + '-' + '$2' + '$3' )
        },
        ViewDetailOwner (ownerID) {
            this.dialog = true
            this.Oid = ownerID
        },
        RenewLicensePDF (comID) {
            this.dialogRenew = true
            this.Cid = comID
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
        font-size: 24pt;
    }
</style>