<template>
    <v-container  grid-list-xl text-xs-center>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md12>
                <v-layout row justify-center>
                    <v-flex xs12 sm10 md10>
                        <AddLicenseFee :CTid="LicenseFee[0].CTid" @AddLF="onTypeDataChange"/>
                    </v-flex>
                </v-layout>
                <v-card color="white" class="white--black">
                    <v-card-title class="font-weight-bold">
                        ค่าธรรมเนียมการออกใบอนุญาตประกอบกิจการ
                    <v-spacer></v-spacer>       
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        ></v-text-field>
                    </v-card-title>
                    <div class="font-weight-bold">
                        ประเภท: {{ LicenseFee[0].CTname }}
                    </div>
                    <v-data-table
                        :headers="headers"
                        :items="LicenseFee"
                        :search="search"
                    >
                        <template slot="items" slot-scope="props">
                        <td>{{ props.item.LFid }}</td>
                        <td class="text-xs-center">{{ props.item.LFname }}</td>
                        <td class="text-xs-center">{{ props.item.LFfee }}</td>
                        <td class="text-xs-center">
                            <v-tooltip top>
                                <v-btn fab dark small 
                                color="red darken-1"
                                router
                                exact
                                slot="activator"
                                @click="deleteLF(props.item.LFid)"
                                >
                                <v-icon dark>delete</v-icon>
                                </v-btn>
                                <span>ลบข้อมูล</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <v-btn fab dark small 
                                color="cyan lighten-1"
                                router
                                exact
                                slot="activator"
                                @click="UpdateLF(props.item.LFid)"
                                >
                                    <v-icon dark>edit</v-icon>
                                </v-btn>
                                <span>แก้ไขข้อมูล</span>
                            </v-tooltip>
                        </td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                        </v-alert>
                    </v-data-table>
                </v-card>
            </v-flex>
            <UpdateLF v-if="dialogLF" :LFid="LFid" :dialog="dialogLF" @closeDialogLF="dialogLF = false" @onUpdateSuccess="onUpdateSuccess"/>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import AddLicenseFee from './AddLicenseFee'
import UpdateLF from './UpdateLF'
export default {
    components: {
        AddLicenseFee,
        UpdateLF
    },
    data: () => ({
        LicenseFee: [],
        search: '',
        headers: [
            {
                text: 'รหัสค่าธรรมเนียม',
                align: 'left',
                value: 'LFid'
            },
            { 
                text: 'รายละเอียดค่าธรรมเนียม',
                align: 'center',
                value: 'LFname'
            },
            { 
                text: 'อัตราค่าธรรมเนียม(บาท)',
                align: 'center',
                value: 'LFfee'
            },
            { text: 'จัดการข้อมูล', sortable: false}
        ],
        dialogLF: false,
        updated: false,
    }),
    created () {
        this.fetchLF()
    },
    watch: {
        updated (val) {
            if (val === true) {
                this.fetchLF()
            }
            // this.$emit('FetchSuccess')
        }
    },
    methods: {
        onUpdateSuccess () {
            this.updated = true
            this.dialogLF = false
        },
        UpdateLF (lfID) {
            this.dialogLF = true
            this.LFid = lfID
        },
        onTypeDataChange () {
            this.updated = true
        },
        fetchLF () {
            axios.get('http://localhost:5003/getLFbyCT/' + this.$route.params.id)
                .then(res => {
                    this.LicenseFee = res.data
                })
        },
        deleteLF (LFid) {
            let self = this
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลค่าธรรมเนียมหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if(result.value) {
                    axios.post('http://localhost:5003/deleteLF/' + LFid)
                        .then(res => {
                            self.fetchLF()
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
