<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-btn slot="activator" color="cyan lighten-1" dark>เพิ่มข้อมูลผู้ใช้ระบบ</v-btn>
        <v-card>
            <v-card-title  class="font-weight-bold">เพิ่มข้อมูลผู้ใช้ระบบ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md6>
                            <v-select
                                v-model="NewUsers.Ustatus"          
                                :items="userstatus"
                                item-text="title"
                                item-value="value"
                                label="สถานะการเข้าใช้งาน"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-select
                                v-model="NewUsers.Prefixid"          
                                :items="prefix"
                                item-text="Prefixname"
                                item-value="Prefixid"
                                label="คำนำหน้า"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="NewUsers.Ufirstname"
                                label="ชื่อ"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="NewUsers.Ulastname"
                                label="สกุล"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="NewUsers.Uusername"
                                label="Username"
                            ></v-text-field>
                        </v-flex> 
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="NewUsers.Upassword"
                                label="Password"
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
            axios.get('http://localhost:5003/prefix')
                .then(res => {
                    this.prefix = res.data
                })
        },
        data: () => ({
            dialog: false,
            prefix: [],
            userstatus: [
                { title: 'ผู้ดูแลระบบ', value: '1' },
                { title: 'ผู้บริหาร', value: '2' },
                { title: 'หัวหน้ากองสาธารณสุขและสิ่งแวดล้อม', value: '3' },
                { title: 'เจ้าหน้าที่รับคำขอรับ / ต่อใบอนุญาตประกอบกิจการ', value: '4' },
                { title: 'เจ้าหน้าที่สำรวจสถานประกอบการ', value: '5' }
            ],
            NewUsers: {
                Uusername: '',
                Upassword: '',
                Prefixid: null,
                Ufirstname: '',
                Ulastname: '',
                Ustatus: ''
            }
        }),
        methods: {
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
                        console.log(res)
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