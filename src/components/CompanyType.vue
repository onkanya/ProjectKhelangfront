<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <v-card-title>
                        ประเภทสถานประกอบการ
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-layout row justify-center>
                        <v-flex xs12 sm10 md10>
                            <Types @AddCT="onTypeDataChange" />
                            <Typecategories @AddCTC="onTypeDataChange" />
                            <Typecategoriesdetail @AddCTCD="onTypeDataChange" />
                            <AllType @FetchSuccess="onFetchSuccess" :updated="updated" />
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <UpdateCT v-if="dialogCT" :CTid="CTid" :dialog="dialogCT" @closeDialogCT="dialogCT = false"/>
    </v-container>
</template>

<script>
import axios from 'axios'
import Types from './types'
import Typecategories from './typecategories'
import Typecategoriesdetail from './typecategoriesdetail'
import AllType from './alltype'
import UpdateCT from './UpdateCT'
export default {
    components: {
        Types,
        Typecategories,
        Typecategoriesdetail,
        AllType,
        UpdateCT
    },
    data: () => ({
        types: [],
        Typecategories: [],
        Typecategoriesdetail: [],
        search: '',
        dialogCT: false,
        updated: false,
        headers: [
            {
                text: 'รหัสประเภท',
                align: 'left',
                value: 'CTid'
            },
            { text: 'ชื่อประเภท', value: 'CTname' },
            { text: 'จัดการข้อมูล', sortable: false}
        ]
    }),
    methods: {
        onTypeDataChange () {
            this.updated = true
        },
        onFetchSuccess () {
            this.updated = false
        },
        UpdateCT (CTid) { 
            this.dialogCT = true
            this.CTid = CTid
        },
        deleteCT (CTid) {
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลประเภทสถานประกอบการหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if(result.value) {
                    axios.post('http://localhost:5003/deleteCTid/' + CTid)
                        .then(res => {
                            this.onTypeDataChange   
                        })                    
                    this.$swal.fire(
                        'ลบข้อมูลประเภทสถานประกอบการสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })
        }        
    }
}
</script>
