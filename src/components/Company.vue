<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
          <!-- <NewCompany @AddCompany='fetchData' /> -->
          <v-btn 
                slot="activator" 
                color="teal accent-3" 
                dark 
                to="/newcompany"
                >เพิ่มข้อมูลสถานประกอบการ
            </v-btn>
        <v-card>
          <v-card-title>
            สถานประกอบการ
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
            :items="company"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.Cid }}</td>
              <td class="text-xs-center">{{ props.item.Cname }}</td>
              <td class="text-xs-center" style="max-width:170px">{{ props.item.CTid }}</td>
              <td class="text-xs-center">{{ props.item.Oid }}</td>
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
import NewCompany from './NewCompany'
export default {
    components: {
        NewCompany
    },
    data () {
        return {
        search: '',
        headers: [
            {
              text: 'เลขที่กิจการ',
              align: 'center',
              // sortable: false,
              value: 'Cid'
            },
            { 
              text: 'ชื่อกิจการ', 
              value: 'Cname',
              align: 'center' 
            },
            { 
              text: 'ประเภทกิจการ', 
              value: 'CTid',
              align: 'center' 
            },
            { 
              text: 'เจ้าของกิจการ', 
              value: 'Oid',
              align: 'center' 
            },
            {
              text: 'จัดการข้อมูล', 
              align: 'center',
              value: ''
            }
        ],
        company: []        
        }
    },
  created () {
      this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get('http://localhost:5003/company')
        .then(res => {
            console.log(res)
            this.company = res.data
        })      
    },
    DeleteCompany (Cid) {
        this.$swal.fire({
            title: 'ลบข้อมูล',
            text: "คุณต้องการลบข้อมูลสถานประกอบการหรือไม่ ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ตกลง'
        })
        if(result.value) {
            axios.post('http://localhost:5003/deletecompany/' + Cid)
            .then(res => {
              this.fetchData()        
            })
            this.$swal.fire(
                'ลบข้อมูลสถานประกอบการสำเร็จ!',
                '',
                'success'
            )
        }
    }
  }
}
</script>