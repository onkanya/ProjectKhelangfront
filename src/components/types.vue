<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="400px">
        <v-btn slot="activator" color="cyan accent-4" dark>เพิ่มประเภทสถานประกอบการ</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มประเภทสถานประกอบการ</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                        <v-text-field
                            v-model="NewCT.CTname"
                            label="ชื่อประเภทสถานประกอบการ"
                        ></v-text-field></v-flex> 
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-4" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submitCT">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
const axios = require('axios')
  export default {
    data: () => ({
        dialog: false,
        NewCT: {
            CTname: ''
        }
    }),
    methods: {
        submitCT() {
            let companytype = {
                CTname: this.NewCT.CTname
            }
            axios.post('http://localhost:5003/addcompanytype', companytype)
            .then(res => {
                console.log(res)
                this.companytype = ''
                this.dialog = false
            })
        }
    }
  }
</script>