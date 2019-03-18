<template>
    <v-dialog v-model="dialog" max-width="800px">
        <v-card>
            <v-card-title  class="font-weight-bold">แก้ไขประเภทสถานประกอบการ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                            <v-text-field
                                v-model="CT.CTname"
                                label="ชื่อประเภทสถานประกอบการ"
                            ></v-text-field></v-flex> 
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" flat @click="closeDialogCT">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="SubmitCT">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
const axios = require('axios')
    export default {
        props: ['CTid', 'dialog'],
        created () {
            axios.get('http://localhost:5003/getcompanytype/' + this.CTid)
                .then(res => {
                    console.log(res.data)
                    this.CT = res.data[0]
                })
        },
        data: () => ({
            CT: {},
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
            closeDialogCT () {
                this.$emit('closeDialogCT')
            },
            SubmitCT () {
                let CT = {
                    CTname: this.CT.CTname
                }
                axios.post('http://localhost:5003/updatecompanytype/' + this.CTid, CT)
                        .then(res => {
                            console.log(res)        
                        })
                    this.$swal.fire(
                        'แก้ไขข้อมูลประเภทสถานประกอบการสำเร็จ!',
                        '',
                        'success'
                    )
            }
            
        }
    }
</script>