<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="400px">            
            <v-btn slot="activator" color="cyan accent-4" dark>เพิ่มรายละเอียดประเภทของประเภทสถานประกอบการ</v-btn>
        <v-card>
            <v-card-title class="font-weight-bold">เพิ่มประเภทของประเภทสถานประกอบการ</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-select       
                                :items="types"
                                item-text="CTname"
                                item-value="CTid"
                                label="ประเภทสถานประกอบการ"
                                @change="selectCT"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-select
                                v-model="NewCTCD.CTCid"            
                                :items="typecategories"
                                item-text="CTCname"
                                item-value="CTCid"
                                label="ประเภทของประเภทสถานประกอบการ"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                                <v-text-field
                                    v-model="NewCTCD.CTCDname"
                                    label="ชื่อประเภทของประเภทสถานประกอบการ"
                                ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-4" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="submitCTCD">Save</v-btn>
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
                this.NewCTCD =  {
                    CTCid: null,
                    CTCDname: ''
                }
                this.dialog = false
                this.e6 = 1
                this.$emit('AddCTCD')
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