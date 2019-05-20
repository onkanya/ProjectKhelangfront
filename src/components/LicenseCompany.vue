<template>
    <v-container grid-list-xl text-xs-center mt-3>
        <v-layout row wrap>
        <v-flex xs12>
            <v-card>
            <v-card-title class="font-weight-bold">
                คำขอรับ / ต่อใบอนุญาตประกอบกิจการ
                <v-spacer></v-spacer>            
                <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
            </v-card-title>
            <v-layout wrap>
                <v-flex xs12 sm6 md3 offset-md2>
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
                            label="วันที่หมดอายุ"
                            prepend-icon="event"
                            readonly
                            required
                            ></v-text-field>
                        <v-date-picker locale="th" @change="onDateChange">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md2 class="mt-4">
                    ถึง
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        :return-value.sync="date2"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <v-text-field
                            slot="activator"
                            v-model="date2"
                            label="วันที่หมดอายุ"
                            prepend-icon="event"
                            readonly
                            required
                            ></v-text-field>
                        <v-date-picker locale="th" @change="onDateChange2">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-data-table
                :headers="headers"
                :items="license"
                :search="search"
                :rows-per-page-items="dropdown"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.LCnolicense }}</td>
                    <td class="text-xs-center">{{ props.item.Cname }}</td>
                    <td class="text-xs-center" style="max-width:170px">{{ convertToDate(props.item.LCstartdate) }}</td>
                    <td class="text-xs-center" style="max-width:170px">{{ convertToDate(props.item.LCexpiredate) }}</td>
                    <td class="text-xs-center" style="max-width:170px">{{ props.item.LCreceiptno }}</td>
                    <td class="text-xs-center" style="max-width:170px">{{ formatNumber(props.item.LFfee) }}</td>
                    <td class="text-xs-center">
                        <v-tooltip top>
                            <v-btn fab dark small
                                color="blue lighten-1"
                                slot="activator"
                                @click="GetLCforPDF(props.item.LCid)"
                            >
                                <v-icon dark>list</v-icon>
                            </v-btn>
                            <span>ออกใบอนุญาต</span>
                        </v-tooltip>
                    </td>
                </template>
                <template slot="footer">
                    <td :colspan="headers.length" style="text-align: rigth;">
                        ค่าธรรมเนียมรวม <strong>{{ formatNumber(summary) }}</strong> บาท
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { GetLCforPDF } from '@/utils/LicensePDFhci'
export default {
    data: () => ({
        date: null,
        date2: null,
        menu: false,
        menu2: false,
        search: '',
        summary: 0,
        headers: [
            {
                text: 'เลขที่ใบอนุญาต',
                align: 'center',
                sortable: false,
                value: 'LCnolicense'
            },
            {
                text: 'สถานประกอบการ',
                align: 'center',
                //   sortable: false,
                value: 'Cname'
            },
            {
                text: 'วันที่ออกใบอนุญาต',
                align: 'center', 
                value: 'LCstartdate'
            },
            { 
                text: 'วันที่ใบอนุญาตหมดอายุ',
                align: 'center', 
                value: 'LCexpiredate' 
            },
            { 
                text: 'เลขที่ใบเสร็จ',
                align: 'center', 
                value: 'LCreceiptno' 
            },
            { 
                text: 'ค่าธรรมเนียม (บาท)',
                align: 'center', 
                value: 'LFfee' 
            },
            {
                text: 'สำรวจสถานประกอบการ', 
                align: 'center',
                sortable: false,
                value: ''
            }
        ],
        alllc: [],
        license: [],
        dropdown: [ 10, 20, 30, {"text":"All","value":-1} ]
    }),
    created () {
        this.fetchData()
    },
    methods: {
        onDateChange (e) {
            // this.NewRequestLicense.RLdate = e
            let d = new Date(e)
            let year = d.getFullYear() + 543
            let m = d.getMonth() > 8 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
            this.date = `${year}-${m}-${d.getDate()}`

            if (this.date2 !== null) {
                this.serchByDate()
            }
        },
        onDateChange2 (e) {
            let d = new Date(e)
            let year = d.getFullYear() + 543
            let m = d.getMonth() > 8 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
            this.date2 = `${year}-${m}-${d.getDate()}`
            if (this.date !== null) {
                this.serchByDate()
            }
        },
        serchByDate () {
            let arr = []
            const d1 = moment(this.date).add(-543, 'years')
            const d2 = moment(this.date2).add(-543, 'years')
            this.alllc.forEach(e => {
                const d = moment(e.LCexpiredate)
                if (d >= d1 && d <= d2) {
                    arr.push(e)
                }
            })
            this.license = arr
        },
        formatNumber(num) {
            // console.log(num)
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        GetLCforPDF (id) {
            GetLCforPDF(id)
        },
        convertToDate (date) {
            // return moment(date).format('DD-MM-YYYY')
            return moment(date).add(543, 'years').format('DD-MM-YYYY')
        },
        fetchData () {
            axios.get('http://localhost:5003/getlicensecompany')
            .then(res => {
                // console.log(res.data)
                this.license = res.data
                this.alllc = this.license
                this.license.forEach(e => {
                    this.summary += Number(e.LFfee)
                })
            })
        },
        Deletelicense (RLid) {
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {
                    axios.post('http://localhost:5003/deletelicense/' + RLid)
                        .then(res => {
                            this.fetchData()
                        })
                    this.$swal.fire(
                        'ลบข้อมูลสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })             
        }

    }
}
</script>