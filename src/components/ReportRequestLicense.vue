<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <!-- <v-btn 
                slot="activator" 
                color="cyan lighten-1" 
                dark 
                to="/newrequestlicense"
                >เพิ่มข้อมูลคำร้องขอรับใบอนุญาตประกอบกิจการ
            </v-btn> -->
            <div v-if="userstatus != 4 && userstatus != 5">
                <v-btn outline small color="error" @click="print">พิมพ์รายงาน</v-btn>
            </div>
            <v-card>
            <v-card-title class="font-weight-bold">
                คำขอรับใบอนุญาตประกอบกิจการ
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
                :rows-per-page-items="dropdown"
                id="PrintTable"
                hide-actions
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.RLnorequest }}</td>
                <td class="text-xs-center">{{ props.item.Cname }}</td>
                <td class="text-xs-center">{{ `${props.item.RLfname}  ${props.item.RLlname}` }}</td>
                <td class="text-xs-center" style="max-width:170px">{{ numberToTel(props.item.RLtel) }}</td>
                <td class="text-xs-center" style="max-width:170px">{{ convertToDate(props.item.RLdate) }}</td>
                <td class="text-xs-center" style="max-width:170px">{{ `${props.item.Ufirstname}  ${props.item.Ulastname}` }}</td>
                <!-- <td class="text-xs-center">
                    <v-tooltip top>
                        <v-btn fab dark small 
                        color="red darken-1"
                        router
                        exact
                        slot="activator"
                        @click="DeleteRequest(props.item.RLid)"
                        >
                        <v-icon dark>delete</v-icon>
                        </v-btn>
                        <span>ลบข้อมูล</span>
                    </v-tooltip>

                    <v-tooltip top>
                        <v-btn fab dark small 
                        color="cyan lighten-1"
                        router
                        exact
                        slot="activator"
                        :to="'/updaterequestlicense/' + props.item.RLid"
                        >
                            <v-icon dark>edit</v-icon>
                        </v-btn>
                        <span>แก้ไขข้อมูล</span>
                    </v-tooltip>
                </td> -->
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
                text: 'ผู้ยื่นคำขอ',
                align: 'center', 
                sortable: false,
                value: 'RLfname' 
                },
                { 
                text: 'เบอร์โทรศัพท์',
                align: 'center',
                sortable: false,
                value: 'RLtel' 
                },
                { 
                text: 'วันที่ทำรายการ',
                align: 'center',
                sortable: false,
                value: 'RLdate' 
                },
                { 
                text: 'เจ้าหน้าที่รับคำขอ',
                align: 'center',
                sortable: false,
                value: 'Ufirstname' 
                },
        ],
        request: []       
    }),
    created () {
        this.fetchData()
    },
    methods: {
        print () {
            const printcontent = document.getElementById('PrintTable')
            const newPage = window.open()
            newPage.document.write(printcontent.outerHTML)
            newPage.print()
            newPage.close()
        },
        numberToTel (tel) {
            return tel = tel.replace( /(\d{3})(\d{3})(\d{4})/, '$1' + '-' + '$2' + '$3' )
        },
        convertToDate (date) {
            return date === '0000-00-00' ? date : moment(date, 'DD-MM-YYYY').add(543, 'years').format('DD-MM-YYYY')
        },
        fetchData () {
            axios.get('http://localhost:5003/getrequest')
            .then(res => {
                this.request = res.data
            })
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
<style type="text/css" media="print">
    @page { size: landscape; }
</style>