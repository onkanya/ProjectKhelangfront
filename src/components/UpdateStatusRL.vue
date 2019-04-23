<template>
    <v-layout row justify-center mt-3 mb-3>  
        <v-flex xs12 sm10 md8> 
        <v-card>
            <v-card-title>
                <span class="font-weight-bold">ข้อมูลคำร้องขอรับ / ต่อใบอนุญาตประกอบกิจการ</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
            <v-container grid-list-md>
                <v-form
                    ref="form"
                    v-model="valid"
                >
                    <v-layout wrap>
                        <v-flex xs12 sm6 md6>
                            <v-select
                                v-model="RequestLicense.RLTid"                                       
                                :items="requesttype"
                                item-text="RLTname"
                                item-value="RLTid"
                                label="ประเภทคำขอ*"   
                                disabled
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>                
                            <v-autocomplete
                                v-model="RequestLicense.Cid"
                                :items="company"
                                item-text="Cname"
                                item-value="Cid"
                                label="สถานประกอบการ"
                                disabled
                            >
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="RequestLicense.RLnorequest"
                                label="เลขที่คำขอ*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                slot="activator"
                                v-model="RequestLicense.RLdate"
                                label="วันที่ทำรายการ"
                                prepend-icon="event"
                                :rules="textRules"
                                readonly
                                disabled
                                ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="RequestLicense.Prefixid"         
                                :items="prefix"
                                item-text="Prefixname"
                                item-value="Prefixid"
                                label="คำนำหน้า*"
                                disabled
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLfname"
                                label="ชื่อผู้ยื่นคำขอ*"
                                require
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLlname"
                                label="นามสกุล*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLage"
                                label="อายุ*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLnationality"
                                label="สัญชาติ*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLtel"
                                label="เบอร์โทรศัพท์*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="RequestLicense.RLemail"
                                label="อีเมล์"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="RequestLicense.RLdetail"
                                label="รายละเอียดเพิ่มเติม"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLhomeno"
                                label="บ้านเลขที่*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLmoo"
                                label="หมู่ที่"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLsoi"
                                label="ซอย"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLroad"
                                label="ถนน"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="RequestLicense.Pid"  
                                :items="province"
                                item-text="Pname_th"
                                item-value="Pid"
                                label="จังหวัด*"
                                disabled               
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="RequestLicense.Did"  
                                :items="district"
                                item-text="Dname_th"
                                item-value="Did"
                                label="อำเภอ*"
                                disabled            
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="RequestLicense.SDTid"
                                :items="subdistrict"
                                item-value="SDTid"
                                item-text="SDTname_th"
                                label="ตำบล*"
                                disabled
                            ></v-select>
                        </v-flex>
                        ไฟล์แนบ
                        <div class="img-container-mean">
                            <img
                                v-for="(img, idx) in getPdf" s :key="idx"
                                :src="img.RPDFpath"
                            />
                        </div>
                    </v-layout>
                    <v-subheader>
                        <v-btn icon>
                            <v-icon color="blue white--text">info</v-icon>
                        </v-btn>
                        สถานะคำขอ
                    </v-subheader>
                    <v-spacer></v-spacer>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md6>
                            <v-select
                                v-model="RequestLicense.RLstatus"                                       
                                :items="statusoption"
                                label="สถานะคำขอ"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
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
                                    v-model="statusdate"
                                    label="วันที่นัดรับใบอนุญาตประกอบกิจการ"
                                    prepend-icon="event"
                                    readonly
                                    ></v-text-field>
                                <v-date-picker v-model="statusdate" @change="onDateChange">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-text-field
                                v-model="RequestLicense.RLnoted"
                                label="กรณีที่เอกสารหลักฐานไม่ครบ คือ"
                                multi-line
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :to="'/confirmrequest/'" >Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitRequest">Save</v-btn>
            </v-card-actions>
        </v-card> 
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    created () {
        axios.get('http://localhost:5003/getrequest/' + this.$route.params.id)
            .then(res => {
                console.log(res)
                this.RequestLicense = res.data[0]
                this.date = this.RequestLicense.RLdate
                axios.get('http://localhost:5003/district/' + this.RequestLicense.Pid)
                    .then(res => {
                        this.district = res.data
                    })
                axios.get('http://localhost:5003/subdistrict/' + this.RequestLicense.Did)
                    .then(res => {
                        this.subdistrict = res.data
                    })
        })
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
        axios.get('http://localhost:5003/RLpdf/' + this.$route.params.id)
            .then(res => {
                this.getPdf = res.data
            })
    },
    data: () => ({
        // date: new Date().toISOString().substr(0, 10),        
        date: null,
        statusdate: null,
        menu: false,
        company: [],
        requesttype: [],
        province: [],
        district: [],
        subdistrict: [],
        prefix: [],
        RequestLicense: {},
        statusoption: [
            { text: 'รอตรวจสอบคำขอ', value: '1'},
            { text: 'เอกสารหลักฐานไม่ครบ', value: '2'},
            { text: 'เอกสารหลักฐานครบ', value: '3'}
        ],
        RLpdf: [],
        showPdf: [],
        getPdf: [],
    }),
    methods: {
        submitRequest () {
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }
            // let { Uid } =  JSON.parse(localStorage.getItem('userLogin'))
            let confirmrequest = {
                RLstatus: this.RequestLicense.RLstatus,
                RLnoted: this.RequestLicense.RLnoted,
                RLgetlicensedate: this.statusdate
            }
            this.$swal.fire({
                title: 'ยืนยันการแก้ไขข้อมูล',
                text: "คุณต้องการแก้ไขข้อมูลคำขอหรือไม่ ?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {
                    axios.post('http://localhost:5003/confirmrequest/' + this.$route.params.id, confirmrequest)
                    .then(res => {
                        console.log(res)
                        // this.$emit('AddOwner')
                        this.$router.push('/confirmrequest')           
                    })
                    this.$swal.fire(
                        'แก้ไขข้อมูลคำขอสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .upload-btn {
        background-color: rgb(46, 46, 156);
        color: white;
    }
    .img-container-mean {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        border: rgb(107, 107, 107) 1px solid;
        border-radius: 15px;
        margin: 15px 0 0 0;
        min-height: 200px;

        img {
            max-width: 200px; 
            max-height: 200px; 
            margin: 7px;
        }
    }
</style>
