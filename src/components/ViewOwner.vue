<template>
    <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
            <v-card-title class="font-weight-bold">ข้อมูลเจ้าของสถานประกอบการ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md3 offset-md1 class="font-weight-bold">
                            เลขบัตรประจำตัวประชาชน:
                        </v-flex>                       
                        <v-flex xs12 sm6 md7>
                            {{ owner.Ocitizenid }}
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
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" flat @click="closeDialog">
                    <v-icon>arrow_back_ios</v-icon>
                    <span>ย้อนกลับ</span></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
const axios = require('axios')
    export default {
        props: ['Oid', 'dialog'],
        created () {
            axios.get('http://localhost:5003/ownergetid/' + this.Oid)
                .then(res => {
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
        data: () => ({
            owner: {},
            address: {
                district: '',
                subdistrict: '',
                province: ''
            }
        }),
        methods: {
            closeDialog () {
                this.$emit('closeDialog')
            },
            numberToTel (tel) {
                return tel = tel.substr(0, 3) + '-' + tel.substr(3, 3) + tel.substr(6,4)
            }
        }
    }
</script>