<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                :headers="headers"
                :items="company"
                :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.Cid }}</td>
                    <td class="text-xs-center">{{ props.item.Cname }}</td>
                    <td class="text-xs-center" style="max-width:170px">{{ props.item.CTname }}</td>
                    <td class="text-xs-center">{{ `${props.item.Ofirstname}  ${props.item.Olastname}` }}</td>
                    <td class="text-xs-center">
                        <v-tooltip top>
                            <v-btn fab dark small 
                            color="red darken-1"
                            router
                            exact
                            slot="activator"
                            @click="DeleteCompany(props.item.Cid)"
                            >
                            <v-icon dark>delete</v-icon>
                            </v-btn>
                            <span>ลบข้อมูลสถานประกอบการ</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn fab dark small 
                            color="cyan lighten-1"
                            router
                            exact
                            slot="activator"
                            :to="'/updatecompany/' + props.item.Cid"
                            >
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                                <span>แก้ไขข้อมูลสถานประกอบการ</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <v-btn fab dark small 
                            color="blue lighten-1"
                            router
                            exact
                            slot="activator"
                            :to="'/companyinvestigation/' + props.item.Cid"
                            >
                                <v-icon dark>rate_review</v-icon>
                            </v-btn>
                            <span>เรียกดูข้อมูลสถานประกอบการ</span>
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
export default {
    data: () => ({
        search: '',
        headers: [
            {
                text: 'เลขที่กิจการ',
                align: 'center',
                // sortable: false,
                value: 'Cid'
                },
                { 
                text: 'ชื่อกิจการ', 
                value: 'Cname',
                align: 'center' 
                },
                { 
                text: 'ประเภทกิจการ', 
                value: 'CTname',
                align: 'center' 
                },
                { 
                text: 'เจ้าของกิจการ', 
                value: 'Oid',
                align: 'center' 
                },
                {
                text: 'จัดการข้อมูล', 
                align: 'center',
                value: ''
            }
        ],
        company: []       
    }),
    created () {
        this.fetchData()
    },
    methods: {
        fetchData () {
        axios.get('http://localhost:5003/getcompanybyowner/' + this.$route.params.id)
            .then(res => {
                console.log(res)
                this.company = res.data
            })      
        },
        DeleteCompany (Cid) {
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลสถานประกอบการหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if(result.value) {
                    axios.post('http://localhost:5003/deletecompany/' + Cid)
                        .then(res => {
                            this.fetchData()        
                        })
                    this.$swal.fire(
                        'ลบข้อมูลสถานประกอบการสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })
        }
    }
}
</script>