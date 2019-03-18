<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
        <v-flex xs12>
            <!-- <NewOwner @AddOwner='fetchData'/>       -->
            <v-btn 
                slot="activator" 
                color="cyan lighten-1" 
                dark 
                to="/newowner"
                >เพิ่มข้อมูลเจ้าของสถานประกอบการ
            </v-btn>
            <v-card>
                <v-card-title>
                    เจ้าของสถานประกอบการ
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
                    :items="owner"
                    :search="search"
                >
                    <template slot="items" slot-scope="props">
                    <td>{{ props.item.Ocitizenid }}</td>
                    <td class="text-xs-center">{{ `${props.item.Ofirstname}  ${props.item.Olastname}` }}</td>
                    <td class="text-xs-center">{{ props.item.Otel }}</td>
                    <td class="text-xs-center">
                        <v-btn fab dark small 
                        color="red darken-1"
                        router
                        exact
                        @click="DeleteOwner(props.item.Oid)"
                        >
                        <v-icon dark>delete</v-icon>
                        </v-btn>

                        <v-btn fab dark small 
                        color="cyan lighten-1"
                        router
                        exact
                        :to="'/updateowner/' + props.item.Oid"
                        >
                        <v-icon dark>edit</v-icon>
                        </v-btn>
                    </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </v-card>
        </v-flex>
        </v-layout>         
    </v-container>
</template>

<script>
// import NewOwner from './NewOwner'
const axios = require('axios')
export default {
    // components: {
    //   NewOwner
    // },
    data: () => ({
        search: '',
        headers: [
            {
              text: 'รหัสประจำตัวเจ้าของกิจการ',
              align: 'center',
            //   sortable: false,
              value: 'Ocitizenid'
            },
            {
              text: 'ชื่อ - สกุล',
              align: 'center', 
              value: 'Ofirstname'
            },
            { 
              text: 'เบอร์โทรศัพท์',
              align: 'center', 
              value: 'Otel' 
            },
            {
              text: 'จัดการข้อมูล', 
              align: 'center',
              sortable: false,
              value: ''
            }
        ],
        owner: []       
    }),
    created () {
        this.fetchData()
        // axios.get('http://localhost:5003/owner')
        //     .then(res => {
        //         console.log(res)
        //         this.owner = res.data
        //     })
    },
    methods: {
        fetchData () {
            console.log('AddOwner')
            axios.get('http://localhost:5003/owner')
            .then(res => {
                this.owner = res.data
            })
        },
        DeleteOwner (Oid) {
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {
                    axios.post('http://localhost:5003/deleteowner/' + Oid)
                        .then(res => {
                            this.fetchData()
                        })
                    this.$swal.fire(
                        'ลบข้อมูลสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })             
        }

    }
}
</script>