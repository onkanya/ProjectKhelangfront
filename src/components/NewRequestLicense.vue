<template>
    <v-layout row justify-center mt-3 mb-3>  
        <v-flex xs12 sm10 md8> 
        <v-card>
            <v-card-title>
                <span class="font-weight-bold">เพิ่มข้อมูลคำร้องขอรับ / ต่อใบอนุญาตประกอบกิจการ</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                        <v-select
                            v-model="NewRequestLicense.RLTid"       
                            :items="requesttype"
                            item-text="RLTname"
                            item-value="RLTid"
                            label="ประเภทสถานประกอบการ*"   
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6>                
                        <v-autocomplete
                            v-model="NewRequestLicense.Cid"
                            :items="company"
                            item-text="Cname"
                            item-value="Cid"
                            label="สถานประกอบการ"
                        >
                        </v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewRequestLicense.RLnorequest"
                            label="เลขที่คำขอ*"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            :return-value.sync="date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                                slot="activator"
                                v-model="date"
                                label="วันที่ก่อตั้งกิจการ"
                                prepend-icon="event"
                                readonly
                                ></v-text-field>
                            <v-date-picker v-model="date" @change="onDateChange">
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewRequestLicense.Prefixid"          
                            :items="prefix"
                            item-text="Prefixname"
                            item-value="Prefixid"
                            label="คำนำหน้า*"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewRequestLicense.RLfname" 
                            label="ชื่อผู้ยื่นคำขอ*"
                            require
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewRequestLicense.RLlname"
                            label="นามสกุล*"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewRequestLicense.RLage"
                            label="อายุ*"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewRequestLicense.RLnationality"
                            label="สัญชาติ*"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewRequestLicense.RLtel"
                            label="เบอร์โทรศัพท์*"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewRequestLicense.RLemail"
                            label="อีเมล์"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewRequestLicense.RLdetail"
                            label="รายละเอียดเพิ่มเติม"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewRequestLicense.RLhomeno"
                            label="บ้านเลขที่*"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewRequestLicense.RLmoo"
                            label="หมู่ที่"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewRequestLicense.RLsoi"
                            label="ซอย"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewRequestLicense.RLroad"
                            label="ถนน"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewRequestLicense.Pid"    
                            :items="province"
                            item-text="Pname_th"
                            item-value="Pid"
                            label="จังหวัด*"
                            @change="selectedProvince"               
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewRequestLicense.Did"    
                            :items="district"
                            item-text="Dname_th"
                            item-value="Did"
                            label="อำเภอ*"                    
                            @change="selectedDistrict"              
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewRequestLicense.SDTid"    
                            :items="subdistrict"
                            item-text="SDTname_th"
                            label="ตำบล*"
                            required
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :to="'/requestlicense/'" >Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitNewRequest">Save</v-btn>
            </v-card-actions>
        </v-card> 
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    created () {
        axios.get('http://localhost:5003/getcompanyforrequest')
            .then(res => {
                this.company = res.data
            })
        axios.get('http://localhost:5003/province')
            .then(res => {
                this.province = res.data
            })
        axios.get('http://localhost:5003/requestlicensetype')
            .then(res => {
                this.requesttype = res.data
            })
        axios.get('http://localhost:5003/prefix')
        .then(res => {
            this.prefix = res.data
        })
    },
    data: () => ({
        // date: new Date().toISOString().substr(0, 10),
        date: null,
        menu: false,
        company: [],
        requesttype: [],
        province: [],
        district: [],
        subdistrict: [],
        prefix: [],
        NewRequestLicense: {
            RLTid: null,
            Cid: null,
            RLnorequest: '',
            RLdate: null,
            Prefixid: null,
            RLfname: '',
            RLlname: '',
            RLage: '',
            RLnationality: '',
            RLhomeno: '',
            RLmoo: '',
            RLsoi: '',
            RLroad: '',
            RLvillage: '',
            SDTid: null,
            Did: null,
            Pid: null,
            RLtel: '',
            RLemail: '',
            RLdetail: '',
            Uid: null
        }
    }),
    methods: {
        onDateChange (e) {
            this.NewRequestLicense.RLdate = e
        },
        submitNewRequest () {
            let { Uid } =  JSON.parse(localStorage.getItem('userLogin'))
            let request = {
                RLTid: this.NewRequestLicense.RLTid,
                Cid: this.NewRequestLicense.Cid,
                RLnorequest: this.NewRequestLicense.RLnorequest,
                RLdate: this.NewRequestLicense.RLdate,
                Prefixid: this.NewRequestLicense.Prefixid,
                RLfname: this.NewRequestLicense.RLfname,
                RLlname: this.NewRequestLicense.RLlname,
                RLage: this.NewRequestLicense.RLage,
                RLnationality: this.NewRequestLicense.RLnationality,
                RLhomeno: this.NewRequestLicense.RLhomeno,
                RLmoo: this.NewRequestLicense.RLmoo,
                RLsoi: this.NewRequestLicense.RLsoi,
                RLroad: this.NewRequestLicense.RLroad,
                RLvillage: this.NewRequestLicense.RLvillage,
                SDTid: this.NewRequestLicense.SDTid,
                Did: this.NewRequestLicense.Did,
                Pid: this.NewRequestLicense.Pid,
                RLtel: this.NewRequestLicense.RLtel,
                RLemail: this.NewRequestLicense.RLemail,
                RLdetail: this.NewRequestLicense.RLdetail,
                Uid: Uid
            }
            this.$swal.fire({
                title: 'ยืนยันการเพิ่มข้อมูล',
                text: "คุณต้องการเพิ่มข้อมูลคำขอหรือไม่ ?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {
                    axios.post('http://localhost:5003/newrequest', request)
                    .then(res => {
                        console.log(res)
                        // this.$emit('AddOwner')   
                        this.NewRequestLicense = ''  
                        this.$router.push('/requestlicense')           
                    })
                    this.$swal.fire(
                        'เพิ่มข้อมูลคำขอสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })
        },
        selectedProvince (event) {
            axios.get('http://localhost:5003/district/' + event)
                .then(res => {
                    this.district = res.data
                })
        },        
        selectedDistrict (event) {
            axios.get('http://localhost:5003/subdistrict/' + event)
                .then(res => {
                    this.subdistrict = res.data
                })
        }
    }
}
</script>
