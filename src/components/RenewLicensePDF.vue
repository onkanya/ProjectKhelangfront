<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
        <v-card>
            <v-card-title class="font-weight-bold">ต่อใบอนุญาต</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                        <v-layout wrap>
                            <v-flex xs12 sm12 md4 offset-md2>
                                ตามใบอนุญาตเลขที่:
                            </v-flex>
                            <v-flex xs12 sm12 md5 class="font-weight-bold">
                                {{ lc.LCnolicense }}
                            </v-flex>
                            <v-flex xs12 sm12 md4 offset-md2>
                                วันที่หมดอายุเดิม:
                            </v-flex>
                            <v-flex xs12 sm12 md5 class="font-weight-bold">
                                {{ convertToDate(lc.LCexpiredate) }}
                            </v-flex>
                            <v-flex xs12 sm12 md6 >
                                <v-text-field
                                    v-model="renewLicense.LCreceiptno"
                                    label="ใบเสร็จรับเงิน เล่มที่"
                                    :rules="textRules" 
                                    required            
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                                <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :nudge-right="40"
                                    :return-value.sync="date"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                >
                                    <v-text-field
                                        slot="activator"
                                        v-model="date"
                                        label="วันที่ชำระเงิน"
                                        prepend-icon="event"
                                        readonly
                                        :rules="textRules"
                                        required
                                        ></v-text-field>
                                    <v-date-picker locale="th" @change="onDateChange">
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 sm12 md12>                
                                <v-autocomplete
                                    v-model="renewLicense.BNo"
                                    :items="boss"
                                    item-text="BName"
                                    item-value="BNo"
                                    label="เจ้าพนักงานท้องถิ่น"
                                    :rules="textRules"
                                >
                                </v-autocomplete>
                            </v-flex>
                        </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-4" flat @click="closeDialog">ยกเลิก</v-btn>
                    <v-btn color="blue darken-1" flat @click="SubmitLicense">ออกใบอนุญาต</v-btn>
                    <!-- <v-tooltip top>
                        <v-btn fab dark small
                            color="blue lighten-1"
                            router
                            exact
                            slot="activator"
                            @click="printPDF"
                        >
                            <v-icon dark>list</v-icon>
                        </v-btn>
                        <span>ออกใบอนุญาต</span>
                    </v-tooltip> -->
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'
import { GetLCforPDF } from '@/utils/LicensePDFhci'
import { BAHTTEXT } from '@/utils/bathToText'
import moment from 'moment'
import crute from '@/assets/crute'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    THSarabun: {
        normal: 'THSarabun.ttf',
        bold: 'THSarabun Bold.ttf',
        italics: 'THSarabun Italic.ttf',
        bolditalics: 'THSarabun Bold Italic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}
export default {
    props: ['Cid', 'dialog'],
    created () {
        axios.get('http://localhost:5003/getlicensebycompany/' + this.Cid)
            .then(res => {
                this.lc = res.data[0]
                console.log(this.lc.LCexpiredate)
            })
        axios.get('http://localhost:5003/boss')
            .then(res => {
                this.boss = res.data
            })
    },
    data: () => ({
        boss: {},
        date: null,
        menu: false,
        valid: true,
        RequestLicense: {},
        addressO: {
            districtO: '',
            subdistrictO: '',
            provinceO: ''
        },
        addressC: {
            districtC: '',
            subdistrictC: '',
            provinceC: ''
        },
        textRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ],
        renewLicense: {
            LCreceiptno	: '',
            LCreceiptdate: null,
            BNo: null
        },
        LCid: null,
        licensePDF: {},
        owner: {},
        lc: {}
    }),
    methods: {
        convertToDate (date) {
            // return moment(date).format('DD-MM-YYYY')
            // return moment(date, 'DD-MM-YYYY').add(543, 'years').format('DD-MM-YYYY')
            return moment(date).add(543, 'years').format('DD-MM-YYYY')
        },
        onDateChange (e) {
            // this.NewRequestLicense.RLdate = e
            let d = new Date(e)
            let year = d.getFullYear() + 543
            let m = d.getMonth() > 8 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
            this.date = `${year}-${m}-${d.getDate()}`
            
        },
        getLCforPDF (id) {
            GetLCforPDF(id)
        },
        closeDialog () {
            this.$emit('closeDialog')
        },
        SubmitLicense () {
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }   
            let license = {
                Cid: this.Cid,
                LCreceiptno	: this.renewLicense.LCreceiptno,
                LCreceiptdate: this.date,
                LCstartdate: this.lc.LCexpiredate,
                BNo: this.renewLicense.BNo
            }
            this.$swal.fire({
                title: 'ยืนยันการเพิ่มข้อมูล',
                text: "คุณต้องการออกใบอนุญาตประกอบกิจการหรือไม่ ?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {         
                    axios.post('http://localhost:5003/renewcompanylicense', license)
                    .then(res => {
                        this.LCid = res.data.LCid 
                        this.renewLicense = ''
                        this.closeDialog()
                        this.getLCforPDF(this.LCid)
                        this.$emit('onUpdateSuccess')
                        // this.$router.push('/investigation')       
                    })
                    // this.$swal.fire(
                    //     'เพิ่มข้อมูลสำเร็จ!',
                    //     '',
                    //     'success'
                    // )
                }
            })
        }
    }
}
</script>