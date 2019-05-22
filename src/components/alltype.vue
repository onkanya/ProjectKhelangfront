<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <v-card>
            <v-card-title class="font-weight-bold">
                ประเภทสถานประกอบการ
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
                :items="types"
                :search="search"
            >
                <template slot="items" slot-scope="props">
                <td>{{ props.item.CTid }}</td>
                <td class="text-xs-center">{{ props.item.CTname }}</td>
                <td class="text-xs-center">
                    <v-tooltip top>
                            <v-btn fab dark small 
                            color="red darken-1"
                            router
                            exact
                            slot="activator"
                            @click="deleteCT(props.item.CTid)"
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
                            @click="UpdateCT(props.item.CTid)"
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
                            :to="'/licensefee/' + props.item.CTid"
                            >
                                <v-icon dark>rate_review</v-icon>
                            </v-btn>
                            <span>จัดการข้อมูลค่าธรรมเนียม</span>
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
export default {
    created () {        
        this.fetchCT()
    },
    props: ['updated'],
    data: () => ({
        search: '',
        headers: [
            {
                text: 'รหัสประเภท',
                align: 'left',
                value: 'CTid'
            },
            { 
                text: 'ชื่อประเภท',
                align: 'center',
                value: 'CTname'
            },
            { text: 'จัดการข้อมูล', sortable: false}
        ],
        types: [],
    }),
    watch: {
        updated (val) {
            if (val === true) {
                this.fetchCT()
            }
            this.$emit('FetchSuccess')
        }
    },
    methods: {
        UpdateCT (ctID) {
            this.$emit('triggerUpdate', ctID)
        },
        fetchCT () {
            axios.get('http://localhost:5003/getallcompanytype')
            .then(res => {
                this.types = res.data
                // let arr = []
                // res.data.forEach(e => {
                //     if (arr.find(el => e.CTid === el.CTid) === undefined) {
                //         arr.push({
                //             CTid: e.CTid,
                //             CTname: e.CTname,
                //             category: []
                //         })
                //     }
                // })

                // arr.forEach(e => {
                //     res.data.forEach(el => {
                //         if (e.CTid === el.CTid) {
                //             if (e.category.find(ele => el.CTCid === ele.CTCid) === undefined) {
                //                 e.category.push({
                //                     CTCid: el.CTCid,
                //                     CTCname: el.CTCname,
                //                     CTCD: []
                //                 })
                //             }
                //         }
                //     })
                // })

                // arr.forEach(ele => {
                //     ele.category.forEach(e => {
                //         res.data.forEach(el => {
                //             if (e.CTCid === el.CTCid) {
                //                 e.CTCD.push({
                //                     CTCDid: el.CTCDid,
                //                     CTCDname: el.CTCDname,
                //                 })
                //             }
                //         })
                //     })
                // })
                // console.log(arr)
                // this.types = arr
            })
        },
        deleteCT (CTid) {
            let self = this
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลประเภทสถานประกอบการหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if(result.value) {
                    axios.post('http://localhost:5003/deleteCTid/' + CTid)
                        .then(res => {
                            self.fetchCT()
                        })
                    this.$swal.fire(
                        'ลบข้อมูลประเภทสถานประกอบการสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })
        }
    }
}
</script>