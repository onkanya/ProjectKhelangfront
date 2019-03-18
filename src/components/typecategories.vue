<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-btn slot="activator" color="cyan accent-4" dark>เพิ่มประเภทของประเภทสถานประกอบการ</v-btn>
        <v-card>
            <v-card-title  class="font-weight-bold">เพิ่มประเภทของประเภทสถานประกอบการ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                v-model="NewCTC.CTid"            
                                :items="types"
                                item-text="CTname"
                                item-value="CTid"
                                label="ประเภทสถานประกอบการ"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field
                                v-model="NewCTC.CTCname"
                                label="ชื่อประเภทของประเภทสถานประกอบการ"
                            ></v-text-field></v-flex> 
                        </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="submitCTC">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
const axios = require('axios')
  export default {
    created () {
        axios.get('http://localhost:5003/getcompanytype')
            .then(res => {
                this.types = res.data
            })
    },
    data: () => ({
        dialog: false,
        NewCTC: {
            CTid: null,
            CTCname: ''
        },
        types: []
    }),
    methods: {
        submitCTC () {
            let companytypecategories = {
                CTid: this.NewCTC.CTid,
                CTCname: this.NewCTC.CTCname
            }
            axios.post('http://localhost:5003/addtypecategories', companytypecategories)
            .then(res => {
                console.log(res)
                this.NewCTC =  {
                    CTid: null,
                    CTCname: ''
                }
                this.dialog = false
                this.$emit('AddCTC')
            })
        }
    }
  }
</script>