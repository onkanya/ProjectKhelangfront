<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
          <NewUsers @AddUsers='fetchData' />
        <v-card>
          <v-card-title>
            ผู้ใช้งานระบบ
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
            :items="users"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.Uid }}</td>
              <td class="text-xs-center">{{ props.item.Ufirstname }}</td>
              <td class="text-xs-center" style="max-width:170px">{{ props.item.Ulastname }}</td>
              <td class="text-xs-center">{{ statusToText(props.item.Ustatus) }}</td>
              <td class="text-xs-center">

                <v-btn icon class="mx-0"
                    router
                    exact
                    @click="ShowUpdateUserDialog(props.item.Uid)"
                >
                  <v-icon color="cyan lighten-1">edit</v-icon>
                </v-btn>
                
                <v-btn icon class="mx-0"
                    router
                    exact
                    @click="DeleteUsers(props.item.Uid)"
                >
                  <v-icon color="red darken-1">delete</v-icon>
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
    <UpdateUsers v-if="dialog" :Uid="Uid" :dialog="dialog" @closeDialog="dialog = false" @UpdateUsers="fetchData" />
  </v-container>
</template>

<script>
import axios from 'axios'
import NewUsers from './NewUsers'
import UpdateUsers from './UpdateUsers'
export default {
    components: {
        NewUsers,
        UpdateUsers
    },
    data () {
        return {
            search: '',
            dialog: false,
            Uid: 0,
            headers: [
                {
                    text: 'รหัสผู้ใช้งาน',
                    align: 'center',
                    // sortable: false,
                    value: 'Uid'
                },
                { 
                    text: 'ชื่อ', 
                    value: 'Ufirstname',
                    align: 'center' 
                },
                { 
                    text: 'สกุล', 
                    value: 'Ulastname',
                    align: 'center' 
                },
                { 
                    text: 'สถานะการใช้งาน', 
                    value: 'Ustatus',
                    align: 'center' 
                },
                {
                    text: 'จัดการข้อมูล', 
                    align: 'center',
                    value: ''
                }
            ],
            users: []        
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        fetchData () {
            this.dialog = false
            axios.get('http://localhost:5003/getusers')
                .then(res => {
                    this.users = res.data
                })      
        },
        statusToText (status) {
            let text = ''
            switch (status) {
                case '1':
                    text = 'ผู้ดูแลระบบ'
                    break
                case '2':
                    text = 'ผู้บริหาร'
                    break
                case '3':
                    text = 'หัวหน้ากองสาธารณสุขและสิ่งแวดล้อม'
                    break
                case '4':
                    text = 'เจ้าหน้าที่รับคำขอรับ / ต่อใบอนุญาตประกอบกิจการ'
                    break
                case '5':
                    text = 'เจ้าหน้าที่สำรวจสถานประกอบการ'
                    break
                default:
                    text = 'ไม่พบสถานะผู้ใช้งานระบบ'
                    break
            }
            return text
        },
        ShowUpdateUserDialog (userID) {
            this.dialog = true
            this.Uid = userID
        },
        DeleteUsers (Uid) {
            let userLogin = JSON.parse(localStorage.getItem('userLogin'))
            if (Uid === userLogin.Uid) {
                this.$swal.fire({
                    title: 'ไม่สามารถลบได้!',
                    text: "ไม่สามารถลบ User ที่คุณเลือกได้",
                    type: 'warning',
                })
                return
            }
            this.$swal.fire({
                title: 'ลบข้อมูล',
                text: "คุณต้องการลบข้อมูลผู้ใช้งานระบบหรือไม่ ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if(result.value) {
                    axios.post('http://localhost:5003/deleteusers/' + Uid)
                        .then(res => {
                            this.fetchData()        
                        })
                    this.$swal.fire(
                        'ลบข้อมูลผู้ใช้งานระบบสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })
        }
    }
}
</script>