<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="600px" persistent>
            <v-card>
                <v-card-title  class="font-weight-bold">แก้ไขอัตราค่าธรรมเนียม</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form
                            ref="form"
                            v-model="valid"
                        >
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                    v-model="LF.LFname"
                                    label="รายละเอียดค่าธรรมเนียม"
                                    :rules="textRules"
                                ></v-text-field>
                            </v-flex> 
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                    v-model="LF.LFfee"
                                    label="อัตราค่าธรรมเนียม"
                                    :mask="mask"
                                    :rules="textRules"
                                    readonly
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-4" flat @click="closeDialogLF">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="SubmitLF">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
const axios = require('axios')
    export default {
        props: ['LFid', 'dialog'],
        created () {
            axios.get('http://localhost:5003/getupdateLF/' + this.LFid)
                .then(res => {
                    this.LF = res.data[0]
                })
        },
        data: () => ({
            LF: {},
            textRules: [
                v => !!v || 'กรุณากรอกข้อมูล'
            ],
            mask: '####',            
        }),
        methods: {
            closeDialogLF () {
                this.$emit('closeDialogLF')
            },
            SubmitLF () {
                if (!this.$refs.form.validate()) {
                    this.$swal.fire({
                        title: 'ข้อมูลไม่ครบถ้วน!',
                        text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                        type: 'warning',
                    })
                    return
                }
                let LF = {
                    LFname: this.LF.LFname,
                    LFfee: this.LF.LFfee
                }
                axios.post('http://localhost:5003/updateLF/' + this.LFid, LF)
                    .then(res => {
                        this.dialog = false
                        this.LF = ''
                        this.$emit('onUpdateSuccess')
                    })
                    this.$swal.fire(
                        'แก้ไขข้อมูลค่าธรรมเนียมสำเร็จ!',
                        '',
                        'success'
                    )
            }
            
        }
    }
</script>