<template>
    <v-layout row justify-center>
      <v-form
                  ref="form"
                  v-model="valid"
              >
    <v-dialog v-model="dialog" persistent max-width="400px">
        <v-btn slot="activator" color="cyan accent-4" dark>เพิ่มประเภทสถานประกอบการ</v-btn>
      <v-card>
        <v-card-title  class="font-weight-bold">เพิ่มประเภทสถานประกอบการ</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="NewCT.CTname"
                    label="ชื่อประเภทสถานประกอบการ"
                    :rules="textRules"
                    required
                  ></v-text-field></v-flex> 
                </v-layout>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" flat @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" flat @click="submitCT">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-form>
  </v-layout>
</template>

<script>
const axios = require('axios')
  export default {
    data: () => ({
        valid: true,
        dialog: false,
        NewCT: {
            CTname: ''
        },
        textRules: [
                v => !!v || 'กรุณากรอกข้อมูล'
            ],
    }),
    methods: {
        submitCT() {
          if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }
            let companytype = {
                CTname: this.NewCT.CTname
            }
            axios.post('http://localhost:5003/addcompanytype', companytype)
            .then(res => {
                this.companytype = ''
                this.dialog = false
                this.$emit('AddCT')
            })
        }
    }
  }
</script>