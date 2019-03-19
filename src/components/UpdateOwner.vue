<template>
    <v-layout row justify-center mt-3>  
        <v-flex xs12 sm10 md8> 
        <v-card>
            <v-card-title>
                <span class="headline">แก้ไขข้อมูลเจ้าของสถานประกอบการ</span>
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
                                v-model="owner.Ocitizenid"
                                label="รหัสบัตรประจำตัวประชาชน*"
                                :rules="citizenRules"
                                :mask="maskcitizen"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="owner.Prefixid"            
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
                                v-model="owner.Ofirstname"
                                label="ชื่อเจ้าของกิจการ*"
                                :rules="nameRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="owner.Olastname"
                                label="นามสกุล*"
                                :rules="lnameRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="owner.Oage"
                                label="อายุ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="owner.Onationality"
                                label="สัญชาติ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="owner.Otel"
                                label="เบอร์โทรศัพท์*"
                                :rules="textRules"
                                :mask="masktel"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="owner.Oemail"
                                label="อีเมล์"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="owner.Ohomeno"
                                label="บ้านเลขที่*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="owner.Omoo"
                                label="หมู่ที่"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="owner.Osoi"
                                label="ซอย"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="owner.Oroad"
                                label="ถนน"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="owner.Pid"    
                                :items="province"
                                item-text="Pname_th"
                                item-value="Pid"
                                label="จังหวัด*"
                                @change="selectedProvince"               
                                required
                                :rules="textRules"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="owner.Did"    
                                :items="district"
                                item-text="Dname_th"
                                item-value="Did"
                                label="อำเภอ*"                    
                                @change="selectedDistrict"              
                                required
                                :rules="textRules"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="owner.SDTid"    
                                :items="subdistrict"
                                item-text="SDTname_th"
                                item-value="SDTid"
                                label="ตำบล*"        
                                required
                                :rules="textRules"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :to="'/Owner/'" >Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitUpdateOwner">Save</v-btn>
            </v-card-actions>
        </v-card> 
        </v-flex>
    </v-layout>
</template>
<script>
const axios = require('axios')
  export default {
    created () {
        axios.get('http://localhost:5003/ownergetid/' + this.$route.params.id)
            .then(res => {
            this.owner = res.data[0]
            axios.get('http://localhost:5003/district/' + this.owner.Pid)
                .then(res => {
                    this.district = res.data
                })
            axios.get('http://localhost:5003/subdistrict/' + this.owner.Did)
                .then(res => {
                    this.subdistrict = res.data
                })
        })
        axios.get('http://localhost:5003/prefix')
            .then(res => {
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
        prefix: [],
        province: [],
        district: [],
        subdistrict: [],
        owner: {},
        valid: true,
        citizenRules: [
            v => !!v || 'กรุณาเลขบัตรประจำตัวประชาชน',
            v => (v && v.length <= 13) || 'ตัวเลข 13 ตัวเท่านั้น'
        ],
        emailRules: [
            v => /.+@.+/.test(v) || 'กรุณากรอกรูปแบบอีเมลล์ให้ถูกต้อง'
        ],
        textRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ],
        nameRules: [
            v => !!v || 'กรุณากรอกชื่อ',
            v => (v && v.length <= 30) || 'ตัวอักษรไม่เกิน 30 ตัวอักษร'
        ],
        lnameRules: [
            v => !!v || 'กรุณากรอกนามสกุล',
            v => (v && v.length <= 30) || 'ตัวอักษรไม่เกิน 30 ตัวอักษร'
        ]
    }),
    methods: {
        submitUpdateOwner () {
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }
            let owner = {
                Ocitizenid: this.owner.Ocitizenid,
                Prefixid: this.owner.Prefixid,
                Ofirstname: this.owner.Ofirstname,
                Olastname: this.owner.Olastname,
                Oage: this.owner.Oage,
                Onationality: this.owner.Onationality,
                Otel: this.owner.Otel,
                Oemail: this.owner.Oemail,
                Ohomeno: this.owner.Ohomeno,
                Omoo: this.owner.Omoo,
                Osoi: this.owner.Osoi,
                Oroad: this.owner.Oroad,
                Ovillage: this.owner.Ovillage,
                Pid: this.owner.Pid,
                Did: this.owner.Did,
                SDTid: this.owner.SDTid
            }
            this.$swal.fire({
                title: 'ยืนยันการแก้ไขข้อมูล',
                text: "คุณต้องการแก้ไขข้อมูลเจ้าของสถานประกอบการหรือไม่ ?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {                    
                    axios.post('http://localhost:5003/updateowner/' + this.$route.params.id, owner)
                        .then(res => {
                            console.log(res)
                            // this.$emit('AddOwner') 
                            this.$router.push('/owner')           
                        })
                    this.$swal.fire(
                        'แก้ไขข้อมูลสำเร็จ!',
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
                    this.owner.Did = null
                    this.owner.SDTid = null
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

