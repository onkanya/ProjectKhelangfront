<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap mt-3 mb-3>
        <v-flex xs12>
            <!-- <NewOwner @AddOwner='fetchData'/>       -->
            <!-- <v-btn 
                slot="activator" 
                color="cyan lighten-1" 
                dark 
                to="/newowner"
                >เพิ่มข้อมูลเจ้าของสถานประกอบการ
            </v-btn> -->
            <v-card>
                <v-card-title class="font-weight-bold">
                    เจ้าของสถานประกอบการ
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
                    :items="owner"
                    :search="search"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ numberIDcard(props.item.Ocitizenid) }}</td>
                    <td class="text-xs-center">{{ `${props.item.Ofirstname}  ${props.item.Olastname}` }}</td>
                    <td class="text-xs-center">{{ numberToTel(props.item.Otel) }}</td>
                    <td class="text-xs-center">
                        <v-tooltip top>
                            <v-btn fab dark small 
                            color="red darken-1"
                            router
                            exact
                            slot="activator"
                            @click="DeleteOwner(props.item.Oid)"
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
                            :to="'/updateowner/' + props.item.Oid"
                            >
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <span>แก้ไขข้อมูล</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <v-btn fab dark small 
                            color="blue lighten-1"
                            router
                            exact
                            slot="activator"
                            :to="'/viewownerdetail/' + props.item.Oid"
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
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// import NewOwner from './NewOwner'
// const axios = require('axios')
import axios from 'axios'
export default {
    data: () => ({
        search: '',
        headers: [
            {
                text: 'รหัสประจำตัวเจ้าของกิจการ',
                align: 'center',
                sortable: false,
                value: 'Ocitizenid'
            },
            {
                text: 'ชื่อ - สกุล',
                align: 'center',
                sortable: false,
                value: 'Ofirstname'
            },
            { 
                text: 'เบอร์โทรศัพท์',
                align: 'center',
                sortable: false,
                value: 'Otel' 
            },
            {
                text: 'จัดการข้อมูล', 
                align: 'center',
                sortable: false,
                    value: ''
            }
        ],
        owner: [],
        dialog: false,
        Oid: 0,   
    }),
    created () {
        this.fetchData()
        // axios.get('http://localhost:5003/owner')
        //     .then(res => {
        //         console.log(res)
        //         this.owner = res.data
        //     })
    },
    methods: {
        fetchData () {
            this.dialog = false
            console.log('AddOwner')
            axios.get('http://localhost:5003/owner')
            .then(res => {
                this.owner = res.data
            })
        },
        numberToTel (tel) {
            return tel = tel.replace( /(\d{3})(\d{3})(\d{4})/, '$1' + '-' + '$2' + '$3' )
        },
        numberIDcard(idcard) {
            return idcard = idcard.replace( /(\d{1})(\d{4})(\d{5})(\d{1})(\d{2})/, '$1' + '-' + '$2' + '-' + '$3' + '-' + '$4' + '-' + '$5')
        },
        DeleteOwner (Oid) {
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
                    axios.post('http://localhost:5003/deleteowner/' + Oid)
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