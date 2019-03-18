<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
          <v-btn 
                slot="activator" 
                color="cyan lighten-1" 
                dark 
                to="/newrequestlicense"
                >เพิ่มข้อมูลคำร้องขอรับ / ต่อใบอนุญาตประกอบกิจการ
            </v-btn>
        <v-card>
          <v-card-title class="font-weight-bold">
            คำขอรับ / ต่อใบอนุญาตประกอบกิจการ
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
            :items="request"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.RLid }}</td>
              <td class="text-xs-center">{{ props.item.Cname }}</td>
              <td class="text-xs-center">{{ `${props.item.RLfname}  ${props.item.RLlname}` }}</td>
              <td class="text-xs-center" style="max-width:170px">{{ props.item.RLtel }}</td>
              <td class="text-xs-center" style="max-width:170px">{{ props.item.RLdate }}</td>
              <td class="text-xs-center">
                <v-btn fab dark small 
                color="red darken-1"
                router
                exact
                @click="DeleteCompany(props.item.Cid)"
                >
                  <v-icon dark>delete</v-icon>
                </v-btn>

                  <v-btn fab dark small 
                  color="cyan lighten-1"
                  router
                  exact
                  :to="'/updatecompany/' + props.item.Cid"
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
import axios from 'axios'
export default {
    data: () => ({
        search: '',
        headers: [
            {
              text: 'เลขที่คำขอ',
              align: 'center',
            //   sortable: false,
              value: 'RTid'
            },
            {
              text: 'ชื่อสถานประกอบการ',
              align: 'center', 
              value: ''
            },
            { 
              text: 'ผู้ยื่นคำขอ',
              align: 'center', 
              value: '' 
            },
            { 
              text: 'เบอร์โทรศัพท์',
              align: 'center', 
              value: 'RTtel' 
            },
            { 
              text: 'วันที่ทำรายการ',
              align: 'center', 
              value: 'RTdate' 
            },
            {
              text: 'จัดการข้อมูล', 
              align: 'center',
              sortable: false,
              value: ''
            }
        ],
        request: []       
    }),
    created () {
        this.fetchData()
    },
    methods: {
        fetchData () {
            axios.get('http://localhost:5003/getrequest')
            .then(res => {
                this.request = res.data
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