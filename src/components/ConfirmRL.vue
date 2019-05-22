<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <v-card>
            <v-card-title class="font-weight-bold">
                ตรวจคำขอรับใบอนุญาตประกอบกิจการ
                <v-spacer></v-spacer>            
                <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="request"
                :search="search"
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.RLnorequest }}</td>
                <td class="text-xs-center">{{ props.item.Cname }}</td>
                <td class="text-xs-center" style="max-width:170px">{{ convertToDate(props.item.RLgetlicensedate) }}</td>
                <!-- <td class="text-xs-center" style="max-width:170px">{{ RLstatustoText(props.item.RLstatus) }}</td> -->
                <td class="text-xs-center" style="max-width:170px">
                    <div v-bind:class="[(props.item.RLstatus === '2') ? 'red--text' : (props.item.RLstatus === '1') ? 'light-blue--text' : '']">
                        {{ RLstatustoText(props.item.RLstatus) }}
                    </div>
                </td>
                <td class="text-xs-center">
                    <v-tooltip top>
                        <v-btn fab dark small 
                        color="cyan lighten-1"
                        router
                        exact
                        slot="activator"
                        :to="'/updatestatusrl/' + props.item.RLid"
                        >
                            <v-icon dark>edit</v-icon>
                        </v-btn>
                        <span>ตรวจสอบคำขอ</span>
                    </v-tooltip>
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
import moment, { invalid } from 'moment'
export default {
    data: () => ({
        search: '',
        headers: [
            {
                text: 'เลขที่คำขอ',
                align: 'center',
                sortable: false,
                value: 'RLnorequest'
            },
            {
                text: 'ชื่อสถานประกอบการ',
                align: 'center',
                sortable: false,
                value: 'Cname'
            },
            { 
                text: 'วันที่นัดรับใบอนุญาต',
                align: 'center',
                sortable: false,
                value: 'RLgetlicensedate' 
            },
            { 
                text: 'สถานะการดำเนินการ',
                align: 'center',
                value: 'RLstatus' 
            },
            {
                text: 'จัดการข้อมูล', 
                align: 'center',
                sortable: false,
                value: ''
            }
        ],
        request: [],
    }),
    created () {
        this.fetchData()
    },
    methods: {
        convertToDate (date) {
            // return date === '0000-00-00' ? '0000-00-00' : moment(date).format('DD-MM-YYYY')
            return date === '0000-00-00' ? 'รอตรวจสอบ' : moment(date).format('DD-MM-YYYY')
        },
        fetchData () {
            axios.get('http://localhost:5003/getrequest')
            .then(res => {
                this.request = res.data
            })
        },
        RLstatustoText (RLstatus) {
            let text = ''
            switch (RLstatus) {
                case '1':
                    text = 'รอตรวจสอบคำขอ'
                    break
                case '2':
                    text = 'เอกสารหลักฐานไม่ครบ'
                    break
                case '3':
                    text = 'เอกสารหลักฐานครบ'
                    break
                default:
                    text = 'ไม่พบสถานะ'
                    break
            }
            return text
        },
        DeleteRequest (RLid) {
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
                    axios.post('http://localhost:5003/deleterequest/' + RLid)
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