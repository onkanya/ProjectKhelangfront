<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" color="cyan accent-4" dark>เพิ่มข้อมูลค่าธรรมเนียม</v-btn>
        <v-card>
            <v-card-title  class="font-weight-bold">ข้อมูลค่าธรรมเนียม</v-card-title>
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
                                v-model="NewLF.LFname"
                                label="รายละเอียดค่าธรรมเนียม"
                                :rules="textRules"
                            ></v-text-field>
                        </v-flex> 
                        <v-flex xs12 sm12 md12>
                            <v-text-field
                                v-model="NewLF.LFfee"
                                label="อัตราค่าธรรมเนียม"
                                :rules="textRules"
                                :mask="mask"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-4" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitLF">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
const axios = require('axios')
    export default {
        props: ['CTid', 'updated'],
        data: () => ({
            valid: true,
            dialog: false,
            NewLF: {
                LFname: '',
                LFfee: null
            },
            textRules: [
                v => !!v || 'กรุณากรอกข้อมูล'
            ],
            mask: "####"
        }),
        methods: {
            submitLF() {
                if (!this.$refs.form.validate()) {
                    this.$swal.fire({
                        title: 'ข้อมูลไม่ครบถ้วน!',
                        text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                        type: 'warning',
                    })
                    return
                }
                let licensefee = {
                    LFname: this.NewLF.LFname,
                    CTid: this.CTid,
                    LFfee: this.NewLF.LFfee
                }
                axios.post('http://localhost:5003/addlicensefee', licensefee)
                    .then(res => {
                        this.licensefee = ''
                        this.dialog = false
                        this.$emit('AddLF')
                    })
                    this.$swal.fire(
                        'เพิ่มข้อมูลสำเร็จ!',
                        '',
                        'success'
                    )
            }
        }
    }
</script>