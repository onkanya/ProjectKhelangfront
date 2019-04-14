<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="cyan lighten-1" dark>เพิ่มข้อมูลการสำรวจสถานประกอบการ</v-btn>
        <v-card>
            <v-card-title  class="font-weight-bold">เพิ่มข้อมูลการสำรวจสถานประกอบการ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>                
                            <v-autocomplete
                                :items="request"
                                item-text="RLnorequest"
                                item-value="RLid"
                                label="เลขที่คำขอรับ / ต่อใบอนุญาต"
                                @change="selectRLnorequest"
                            >
                            </v-autocomplete>
                        </v-flex> 
                        <v-flex xs12 sm12 md12>                
                            <v-text-field
                                v-model="RLtext.Cid"
                                label="ชื่อสถานประกอบการ"
                                disabled
                            ></v-text-field>
                        </v-flex> 
                        <v-flex xs12 sm12 md12>                
                            <v-text-field
                                v-model="RLtext.RLname"
                                label="ผู้ยื่นคำขอ"
                                disabled
                            ></v-text-field>
                        </v-flex> 
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="SubmitNewUsers">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
const axios = require('axios')
    export default {
        created () {
            axios.get('http://localhost:5003/getrequestforinvestigation')
            .then(res => {
                console.log(res)
                this.request = res.data
            })
        },
        data: () => ({
            dialog: false,
            NewInvestigation: {
                RLid: null
            },
            request: [],
            RLtext: {}
        }),
        methods: {
            fetchData () {
                this.dialog = false
                axios.get('http://localhost:5003/getusers')
                    .then(res => {
                        this.users = res.data
                    })      
            },
            selectRLnorequest (event) {
                axios.get('http://localhost:5003/getRLid/' + event)
                    .then(res => {
                        console.log(res)
                        this.RLtext = res.data[0]
                    })
            },
            SubmitNewUsers () {
                let users = {
                    Uusername: this.NewUsers.Uusername,
                    Upassword: this.NewUsers.Upassword,
                    Prefixid: this.NewUsers.Prefixid,
                    Ufirstname: this.NewUsers.Ufirstname,
                    Ulastname: this.NewUsers.Ulastname,
                    Ustatus: this.NewUsers.Ustatus
                }
                axios.post('http://localhost:5003/addusers', users)
                    .then(res => {
                        this.$swal.fire({
                            title: 'สำเร็จแล้ว!',
                            text: "คุณได้ทำการเพิ่ม User แล้ว!",
                            type: 'success',
                        })
                        this.NewUsers =  {
                            Uusername: '',
                            Upassword: '',
                            Prefixid: null,
                            Ufirstname: '',
                            Ulastname: '',
                            Ustatus: ''
                        }
                        this.dialog = false
                        this.$emit('AddUsers')
                    })
            }
            
        }
    }
</script>