<template>
    <v-card>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="types"
            :search="search"
            hide-actions
            item-key="CTid"
        >
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.CTid }}</td>
                    <td class="">{{ props.item.CTname }}</td>
                    <td class="text-xs-right">
                        <div>                            
                            <v-btn icon class="mx-0">
                                <v-icon color="red darken-1" @click="deleteCT(props.item.CTid)">delete</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0">
                                <v-icon color="cyan lighten-1" @click="UpdateCT(props.item.CTid)">edit</v-icon>
                            </v-btn>
                        </div>
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text class="grey lighten-3" v-for="cate in props.item.category" :key="cate.CTCid">
                        <v-expansion-panel>
                            <v-expansion-panel-content>
                                <div slot="header">{{ cate.CTCname }}
                                    <v-btn icon class="mx-0">
                                        <v-icon color="cyan lighten-1">edit</v-icon>
                                    </v-btn>
                                    <v-btn icon class="mx-0">
                                        <v-icon color="red darken-1">delete</v-icon>
                                    </v-btn>
                                </div>
                                <v-card v-for="(item, i) in cate.CTCD" :key="i">
                                    <v-card-text class="grey lighten-3">
                                        {{ i + 1 }}: {{ item.CTCDname }} 
                                        <v-btn icon class="mx-0">
                                            <v-icon color="cyan lighten-1">edit</v-icon>
                                        </v-btn>
                                        <v-btn icon class="mx-0">
                                            <v-icon color="red darken-1">delete</v-icon>
                                        </v-btn>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    created () {        
        this.fetchCT()
    },
    props: ['updated'],
    data: () => ({
        search: '',
        headers: [
            {
                text: 'รหัสประเภท',
                align: 'left',
                value: 'CTid'
            },
            { 
                text: 'ชื่อประเภท',
                align: 'center',
                value: 'CTname'
            },
            { text: 'จัดการข้อมูล', sortable: false}
        ],
        types: [],
    }),
    watch: {
        updated (val) {
            if (val === true) {
                this.fetchCT()
            }
            this.$emit('FetchSuccess')
        }
    },
    methods: {
        UpdateCT (ctID) {
            this.$emit('triggerUpdate', ctID)
        },
        fetchCT () {
            axios.get('http://localhost:5003/getallcompanytype')
            .then(res => {
                let arr = []
                res.data.forEach(e => {
                    if (arr.find(el => e.CTid === el.CTid) === undefined) {
                        arr.push({
                            CTid: e.CTid,
                            CTname: e.CTname,
                            category: []
                        })
                    }
                })

                arr.forEach(e => {
                    res.data.forEach(el => {
                        if (e.CTid === el.CTid) {
                            if (e.category.find(ele => el.CTCid === ele.CTCid) === undefined) {
                                e.category.push({
                                    CTCid: el.CTCid,
                                    CTCname: el.CTCname,
                                    CTCD: []
                                })
                            }
                        }
                    })
                })

                arr.forEach(ele => {
                    ele.category.forEach(e => {
                        res.data.forEach(el => {
                            if (e.CTCid === el.CTCid) {
                                e.CTCD.push({
                                    CTCDid: el.CTCDid,
                                    CTCDname: el.CTCDname,
                                })
                            }
                        })
                    })
                })
                console.log(arr)
                this.types = arr
            })
        },
        deleteCT (CTid) {
            let self = this
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
                            self.fetchCT()
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