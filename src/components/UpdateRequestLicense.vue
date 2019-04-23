<template>
    <v-layout row justify-center mt-3 mb-3>  
        <v-flex xs12 sm10 md8> 
        <v-card>
            <v-card-title>
                <span class="font-weight-bold">แก้ไขข้อมูลคำร้องขอรับ / ต่อใบอนุญาตประกอบกิจการ</span>
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
                            <v-autocomplete
                                v-model="RequestLicense.Cid"
                                :items="company"
                                item-text="Cname"
                                item-value="Cid"
                                label="สถานประกอบการ"
                                :rules="textRules"
                            >
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="RequestLicense.RLnorequest"
                                label="เลขที่คำขอ*"
                                :rules="textRules"
                                required
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
                                :rules="textRules"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLfname"
                                label="ชื่อผู้ยื่นคำขอ*"
                                :rules="textRules"
                                require
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLlname"
                                label="นามสกุล*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLage"
                                label="อายุ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLnationality"
                                label="สัญชาติ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="RequestLicense.RLtel"
                                label="เบอร์โทรศัพท์*"
                                :rules="textRules"
                                :mask="masktel"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="RequestLicense.RLemail"
                                label="อีเมล์"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="RequestLicense.RLdetail"
                                label="รายละเอียดเพิ่มเติม"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLhomeno"
                                label="บ้านเลขที่*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLmoo"
                                label="หมู่ที่"
                                :rules="textRules"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLsoi"
                                label="ซอย"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                v-model="RequestLicense.RLroad"
                                label="ถนน"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="RequestLicense.Pid"  
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
                                v-model="RequestLicense.Did"  
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
                                v-model="RequestLicense.SDTid"
                                :items="subdistrict"
                                item-value="SDTid"
                                item-text="SDTname_th"
                                label="ตำบล*"
                                :rules="textRules"
                                required
                            ></v-select>
                        </v-flex>
                        <v-layout>
                            <input @change="addPDF" type="file" class="upload-btn" name="upload" multiple  accept=".pdf">
                        </v-layout>
                        เลือกไฟล์
                        <div class="img-container-mean">
                            <img
                                v-for="(img, idx) in showPdf" s :key="idx"
                                :src="img"
                            />
                        </div>
                        ไฟล์เดิม
                        <div class="img-container-mean">
                            <img
                                v-for="(img, idx) in getPdf" s :key="idx"
                                :src="img.RPDFpath"
                            />
                        </div>
                    </v-layout>
                </v-form>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :to="'/requestlicense/'" >Close</v-btn>
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
        valid: true,
        masktel: '###-#######',
        menu: false,
        company: [],
        requesttype: [],
        province: [],
        district: [],
        subdistrict: [],
        prefix: [],
        RequestLicense: {},
        textRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ],
        emailRules: [
            v => /.+@.+/.test(v) || 'กรุณากรอกรูปแบบอีเมลล์ให้ถูกต้อง'
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
            let request = {
                Cid: this.RequestLicense.Cid,
                RLnorequest: this.RequestLicense.RLnorequest,
                Prefixid: this.RequestLicense.Prefixid,
                RLfname: this.RequestLicense.RLfname,
                RLlname: this.RequestLicense.RLlname,
                RLage: this.RequestLicense.RLage,
                RLnationality: this.RequestLicense.RLnationality,
                RLhomeno: this.RequestLicense.RLhomeno,
                RLmoo: this.RequestLicense.RLmoo,
                RLsoi: this.RequestLicense.RLsoi,
                RLroad: this.RequestLicense.RLroad,
                RLvillage: this.RequestLicense.RLvillage,
                SDTid: this.RequestLicense.SDTid,
                Did: this.RequestLicense.Did,
                Pid: this.RequestLicense.Pid,
                RLtel: this.RequestLicense.RLtel,
                RLemail: this.RequestLicense.RLemail,
                RLdetail: this.RequestLicense.RLdetail
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
                    axios.post('http://localhost:5003/updaterequest/' + this.$route.params.id, request)
                    .then(res => {
                        if (this.RLpdf.length > 0) {
                            let requestPDF = new FormData()
                            this.RLpdf.forEach(e => {
                                requestPDF.append('files', e)
                            })
                            axios.post('http://localhost:5003/RLpdf/' + this.$route.params.id, requestPDF)
                                .then(res => {
                                    this.$swal.fire(
                                        'แก้ไขข้อมูลคำขอสำเร็จ!',
                                        '',
                                        'success'
                                    )
                                })
                        }
                        this.RequestLicense = ''
                        this.$router.push('/requestlicense')           
                    })
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
        },
        async addPDF (e) {
            let arr = []
            for (let index = 0; index < e.target.files.length; index++) {
                this.RLpdf.push(e.target.files[index])
                let result_base64 = await new Promise((resolve) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => resolve(fileReader.result);
                    fileReader.readAsDataURL(e.target.files[index]);
                });
                arr.push(result_base64)
            }
            this.showPdf = arr
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