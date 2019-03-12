<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row justify-center>                
            <v-btn slot="activator" color="cyan accent-4" dark @click="typecategoriesisShow = !typecategoriesisShow">เพิ่มรายละเอียดประเภทของประเภทสถานประกอบการ</v-btn> 
        </v-layout>
        <v-layout row justify-center v-if="typecategoriesisShow">
            <v-flex xs12 sm10 md8>
                <v-stepper v-model="e6" vertical>
                    <v-stepper-step :complete="e6 > 1" step="1">
                    เลือกประเภทของสถานประกอบการ
                    </v-stepper-step>

                    <v-stepper-content step="1">
                    <v-card color="grey lighten-1" class="mb-5" height="150px">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 sm10 md8>
                                <v-select       
                                    :items="types"
                                    item-text="CTname"
                                    item-value="CTid"
                                    label="ประเภทสถานประกอบการ"
                                    @change="selectCT"
                                    required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-btn color="primary" @click="e6 = 2">ถัดไป</v-btn>
                    <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="e6 > 2" step="2">เลือกประเภทของประเภทสถานประกอบการ</v-stepper-step>

                    <v-stepper-content step="2">
                    <v-card color="grey lighten-1" class="mb-5" height="150px">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 sm10 md8>
                                <v-select
                                    v-model="NewCTCD.CTCid"            
                                    :items="typecategories"
                                    item-text="CTCname"
                                    item-value="CTCid"
                                    label="ประเภทของประเภทสถานประกอบการ"
                                    required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-btn color="primary" @click="e6 = 3">ถัดไป</v-btn>
                    <v-btn flat @click="e6 = 1">Cancel</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="e6 > 3" step="3">กรอกรายละเอียดประเภทของประเภทสถานประกอบการ</v-stepper-step>

                    <v-stepper-content step="3">
                    <v-card color="grey lighten-1" class="mb-5" height="150px">
                        <v-layout row wrap justify-center>
                            <v-flex xs12 sm10 md8>
                                    <v-text-field
                                        v-model="NewCTCD.CTCDname"
                                        label="ชื่อประเภทของประเภทสถานประกอบการ"
                                    ></v-text-field>
                            </v-flex> 
                        </v-layout>
                    </v-card>
                    <v-btn color="primary" @click="submitCTCD">ถัดไป</v-btn>
                    <v-btn flat @click="e6 = 2">Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-flex>
        </v-layout>
</v-container>
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
        types: [],
        NewCTCD: {
            CTCid: null,
            CTCDname: ''
        },
        typecategories: [],
        e6: 1,
        typecategoriesisShow: false
    }),
    methods: {
        submitCTCD () {
            let companytypecategoriesdetail = {
                CTCid: this.NewCTCD.CTCid,
                CTCDname: this.NewCTCD.CTCDname
            }
            axios.post('http://localhost:5003/addtypecategoriesdetail', companytypecategoriesdetail)
            .then(res => {
                console.log(res)
                this.NewCTCD =  {
                    CTCid: null,
                    CTCDname: ''
                }
                this.dialog = false
                this.e6 = 1
                // this.$emit('AddCTCD')
            })
        },
        selectCT (event) {
            axios.get('http://localhost:5003/getcompanytypecategories/' + event)
                .then(res => {
                    this.typecategories = res.data
                })
        }
    }
  }
</script>