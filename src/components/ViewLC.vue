<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                :headers="headers"
                :items="license"
                :search="search"
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
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { GetLCforPDF } from '@/utils/LicensePDFhci'
export default {
    props: ['updated'],
    data: () => ({
        search: '',
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
                sortable: false,
                value: 'Cname'
            },
            {
                text: 'วันที่ออกใบอนุญาต',
                align: 'center',
                sortable: false,
                value: 'LCstartdate'
            },
            { 
                text: 'วันที่ใบอนุญาตหมดอายุ',
                align: 'center',
                sortable: false,
                value: 'LCexpiredate' 
            },
            { 
                text: 'เลขที่ใบเสร็จ',
                align: 'center',
                sortable: false,
                value: 'LCreceiptno' 
            },
            { 
                text: 'ค่าธรรมเนียม (บาท)',
                align: 'center',
                sortable: false,
                value: 'LFfee' 
            },
            {
                text: 'ใบอนุญาต', 
                align: 'center',
                sortable: false,
                value: ''
            }
        ],
        license: []       
    }),
    created () {
        this.fetchData()
    },
    watch: {
        updated (val) {
            if (val === true) {
                this.fetchData()
            }
            this.$emit('FetchSuccess')
        }
    },
    methods: {
        onFetchSuccess () {
            this.updated = false
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        GetLCforPDF (id) {
            GetLCforPDF(id)
        },
        convertToDate (date) {
            // return moment(date).format('DD-MM-YYYY')
            // return moment(date, 'DD-MM-YYYY').add(543, 'years').format('DD-MM-YYYY')
            return moment(date).add(543, 'years').format('DD-MM-YYYY')
        },
        dateFormat (date) {
            return moment(date).format('DD-MM-YYYY')
        },
        fetchData () {
            axios.get('http://localhost:5003/getlicensebycompany/' + this.$route.params.id)
            .then(res => {
                console.log(res.data)
                this.license = res.data
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