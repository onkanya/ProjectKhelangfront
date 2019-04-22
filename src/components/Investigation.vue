<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <v-card>
            <v-card-title class="font-weight-bold">
                สำรวจสถานประกอบการ
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
                <td class="text-xs-center">{{ `${props.item.RLfname} ${props.item.RLlname}` }}</td>
                <td class="text-xs-center" style="max-width:170px">{{ convertToDate(props.item.RLgetlicensedate) }}</td>
                <td class="text-xs-center" style="max-width:170px">{{ HCISresulttoText(props.item.HCISresult) }}</td>
                <td class="text-xs-center">
                    <v-tooltip top v-if="props.item.HCISresult == 1">
                        <v-btn fab dark small
                            color="blue lighten-1"
                            router
                            exact
                            slot="activator"
                            :to="'/viewinvestigation/' + props.item.RLid"
                        >
                            <v-icon dark>visibility</v-icon>
                        </v-btn>
                        <span>รายละเอียดการสำรวจ</span>
                    </v-tooltip>
                    <v-tooltip top v-else-if="props.item.HCISresult == 2" >
                        <v-btn fab dark small
                            color="cyan lighten-1"
                            router
                            exact
                            slot="activator"
                            :to="'/newinvestigation/' + props.item.RLid"
                        >
                            <v-icon dark>edit</v-icon>
                        </v-btn>
                        <span>แก้ไขข้อมูลสำรวจ</span>
                    </v-tooltip>
                    <v-tooltip top v-else-if="props.item.HCISresult == 3">
                        <v-btn fab dark small
                            color="blue lighten-1"
                            router
                            exact
                            slot="activator"
                            :to="'/viewinvestigation/' + props.item.RLid"
                        >
                            <v-icon dark>visibility</v-icon>
                        </v-btn>
                        <span>รายละเอียดการสำรวจ</span>
                    </v-tooltip>
                    <v-tooltip top v-else>
                        <v-btn fab dark small
                        color="orange accent-2"
                        router
                        exact
                        slot="activator"
                        :to="'/newinvestigation/' + props.item.RLid"
                    >
                        <v-icon dark>playlist_add</v-icon>
                    </v-btn>
                        <span>สำรวจสถานประกอบการ</span>
                    </v-tooltip>
                    
                </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                ไม่พบข้อมูล "{{ search }}" ในผลลัพธ์.
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
export default {
    data: () => ({
        search: '',
        headers: [
            {
                text: 'เลขที่คำขอ',
                align: 'center',
                //   sortable: false,
                value: 'RLnorequest'
            },
            {
                text: 'สถานประกอบการ',
                align: 'center',
                //   sortable: false,
                value: 'RLTname'
            },
            {
                text: 'ชื่อ - สกุลผู้ยื่นคำขอ',
                align: 'center', 
                value: ''
            },
            { 
                text: 'วันที่นัดรับใบอนุญาต',
                align: 'center', 
                value: 'RLdate' 
            },
            { 
                text: 'ผลลัพธ์การสำรวจสถานประกอบการ',
                align: 'center', 
                value: 'HCISresult' 
            },
            {
                text: 'สำรวจสถานประกอบการ', 
                align: 'center',
                sortable: false,
                value: ''
            }
        ],
        request: [] 
    }),
    created () {
        this.fetchData()
    },
    methods: {
        convertToDate (date) {
            return date === '0000-00-00' ? date : moment(date).format('DD-MM-YYYY')
        },
        fetchData () {
            axios.get('http://localhost:5003/getrequestforinvestigation')
            .then(res => {
                this.request = res.data
            })
        },
        HCISresulttoText (HCISresult) {
            let text = ''
            switch (HCISresult) {
                case '1':
                    text = 'ผ่านการสำรวจ'
                    break
                case '2':
                    text = 'แก้ไขปรับปรุง'
                    break
                case '3':
                    text = 'ไม่ผ่านการสำรวจ'
                    break
                default:
                    text = 'รอสำรวจสถานประกอบการ'
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