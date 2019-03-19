<template>
    <v-layout row justify-center mt-3>  
        <v-flex xs12 sm10 md8> 
        <v-card>
            <v-card-title>
            <span class="headline">เพิ่มข้อมูลเจ้าของสถานประกอบการ</span>
            </v-card-title>
            <v-card-text>
            <v-container grid-list-md> 
                <v-form
                    ref="form"
                    v-model="valid"
                >               
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                            v-model="NewOwner.Ocitizenid"
                            label="รหัสบัตรประจำตัวประชาชน*"
                            :rules="citizenRules"
                            :mask="maskcitizen"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewOwner.Prefixid"            
                            :items="prefix"
                            item-text="Prefixname"
                            item-value="Prefixid"
                            label="คำนำหน้า*"
                            :rules="textRules"
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field 
                            v-model="NewOwner.Ofirstname"
                            label="ชื่อเจ้าของกิจการ*"
                            :rules="nameRules"
                            require
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewOwner.Olastname"
                            label="นามสกุล*"
                            :rules="lnameRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewOwner.Oage"
                            label="อายุ*"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewOwner.Onationality"
                            label="สัญชาติ*"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewOwner.Otel"
                            label="เบอร์โทรศัพท์*"
                            :mask="masktel"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewOwner.Oemail"
                            label="อีเมล์"
                            :rules="emailRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewOwner.Ohomeno"
                            label="บ้านเลขที่*"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewOwner.Omoo"
                            label="หมู่ที่"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewOwner.Osoi"
                            label="ซอย"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            v-model="NewOwner.Oroad"
                            label="ถนน"
                            :rules="textRules"
                            required
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewOwner.Pid"    
                            :items="province"
                            item-text="Pname_th"
                            item-value="Pid"
                            label="จังหวัด*"
                            @change="selectedProvince"
                            :rules="textRules"               
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewOwner.Did"    
                            :items="district"
                            item-text="Dname_th"
                            item-value="Did"
                            label="อำเภอ*"                    
                            @change="selectedDistrict"
                            :rules="textRules"              
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewOwner.SDTid"    
                            :items="subdistrict"
                            item-value="SDTid"
                            item-text="SDTname_th"
                            label="ตำบล*"
                            :rules="textRules"
                            required
                        ></v-select>
                    </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :to="'/Owner/'" >Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitNewOwner">Save</v-btn>
            </v-card-actions>
        </v-card> 
        </v-flex>
    </v-layout>
</template>
<script>
const axios = require('axios')
  export default {
    created () {
        axios.get('http://localhost:5003/prefix')
        .then(res => {
            console.log(res)
            this.prefix = res.data
        })
        axios.get('http://localhost:5003/province')
        .then(res => {
            this.province = res.data
        })
    },
    data: () => ({
        maskcitizen: '#-####-#####-##-#',
        masktel: '###-#######',
        valid: true,
        prefix: [],
        province: [],
        district: [],
        subdistrict: [],
        NewOwner: {
            Ocitizenid: '',
            Prefixid: null,
            Ofirstname: '',
            Olastname: '',
            Oage: '',
            Onationality: '',
            Ohomeno: '',
            Omoo: '',
            Osoi: '',
            Oroad: '',
            Ovillage: '',
            Pid: null,
            Did: null,
            SDTid: null,
            Otel: '',
            Oemail: ''
        },
        citizenRules: [
            v => !!v || 'กรุณาเลขบัตรประจำตัวประชาชน',
            v => (v && v.length <= 13) || 'ตัวเลข 13 ตัวเท่านั้น'
        ],
        emailRules: [
            v => /.+@.+/.test(v) || 'กรุณากรอกรูปแบบอีเมลล์ให้ถูกต้อง'
        ],
        nameRules: [
            v => !!v || 'กรุณากรอกชื่อ',
            v => (v && v.length <= 30) || 'ตัวอักษรไม่เกิน 30 ตัวอักษร'
        ],
        lnameRules: [
            v => !!v || 'กรุณากรอกนามสกุล',
            v => (v && v.length <= 30) || 'ตัวอักษรไม่เกิน 30 ตัวอักษร'
        ],
        textRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ]
    }),
    methods: {
        submitNewOwner () {
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }   
            let owner = {
                Ocitizenid: this.NewOwner.Ocitizenid,
                Prefixid: this.NewOwner.Prefixid,
                Ofirstname: this.NewOwner.Ofirstname,
                Olastname: this.NewOwner.Olastname,
                Oage: this.NewOwner.Oage,
                Onationality: this.NewOwner.Onationality,
                Otel: this.NewOwner.Otel,
                Oemail: this.NewOwner.Oemail,
                Ohomeno: this.NewOwner.Ohomeno,
                Omoo: this.NewOwner.Omoo,
                Osoi: this.NewOwner.Osoi,
                Oroad: this.NewOwner.Oroad,
                Ovillage: this.NewOwner.Ovillage,
                Pid: this.NewOwner.Pid,
                Did: this.NewOwner.Did,
                SDTid: this.NewOwner.SDTid
            }
            this.$swal.fire({
                title: 'ยืนยันการเพิ่มข้อมูล',
                text: "คุณต้องการเพิ่มข้อมูลเจ้าของสถานประกอบการหรือไม่ ?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {                    
                    axios.post('http://localhost:5003/newowner', owner)
                    .then(res => {
                        console.log(res)
                        // this.$emit('AddOwner')   
                        this.NewOwner = ''  
                        this.$router.push('/owner')           
                    })
                    this.$swal.fire(
                        'เพิ่มข้อมูลสำเร็จ!',
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

