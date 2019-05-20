<template>
    <v-dialog v-model="dialog" max-width="800px">
        <v-card>
            <v-card-title class="font-weight-bold">แก้ไขข้อมูลผู้ใช้ระบบ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md6>
                            <v-select
                                v-model="users.Ustatus"          
                                :items="userstatus"
                                item-text="title"
                                item-value="value"
                                label="สถานะการเข้าใช้งาน"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-select
                                v-model="users.Prefixid"          
                                :items="prefix"
                                item-text="Prefixname"
                                item-value="Prefixid"
                                label="คำนำหน้า"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="users.Ufirstname"
                                label="ชื่อ"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="users.Ulastname"
                                label="สกุล"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="users.Uusername"
                                label="Username"
                            ></v-text-field>
                        </v-flex> 
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="users.Upassword"
                                label="Password"
                            ></v-text-field>
                        </v-flex>                        
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" flat @click="closeDialog">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="SubmitUsers">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
const axios = require('axios')
    export default {
        props: ['Uid', 'dialog'],
        created () {
            axios.get('http://localhost:5003/getusers/' + this.Uid)
                .then(res => {
                    console.log(res.data)
                    this.users = res.data[0]
                })
            axios.get('http://localhost:5003/prefix')
                .then(res => {
                    this.prefix = res.data
                })
        },
        data: () => ({
            users: {},
            prefix: [],
            userstatus: [
                { title: 'ผู้ดูแลระบบ', value: '1' },
                { title: 'ผู้บริหาร', value: '2' },
                { title: 'หัวหน้ากองสาธารณสุขและสิ่งแวดล้อม', value: '3' },
                { title: 'เจ้าหน้าที่รับคำขอรับ / ต่อใบอนุญาตประกอบกิจการ', value: '4' },
                { title: 'เจ้าหน้าที่สำรวจสถานประกอบการ', value: '5' }
            ]
        }),
        methods: {
            closeDialog () {
                this.$emit('closeDialog')
            },
            SubmitUsers () {
                let users = {
                    Uusername: this.users.Uusername,
                    Upassword: this.users.Upassword,
                    Prefixid: this.users.Prefixid,
                    Ufirstname: this.users.Ufirstname,
                    Ulastname: this.users.Ulastname,
                    Ustatus: this.users.Ustatus
                }
                axios.post('http://localhost:5003/updateusers/' + this.Uid, users)
                    .then(res => {
                        this.$swal.fire({
                            title: 'สำเร็จแล้ว!',
                            text: "คุณได้ทำการเพิ่ม User แล้ว!",
                            type: 'success',
                        })
                        this.$emit('UpdateUsers')
                    })
            }
            
        }
    }
</script>