<template>
    <v-layout row justify-center mt-3 mb-3>  
        <v-flex xs12 sm10 md8> 
        <v-card class="mb-5">
            <v-card-title>
                <span class="font-weight-bold">เพิ่มข้อมูลคำร้องขอรับ / ต่อใบอนุญาตประกอบกิจการ</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
            <v-container grid-list-md>
                <v-form
                    ref="form"
                    v-model="valid"
                >
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewRequestLicense.RLnorequest"
                                label="เลขที่คำขอ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <div style="font-size: 14pt; text-align: center;">
                        ข้อมูลผู้ประกอบการ
                    </div>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="NewOwner.Ocitizenid"
                                label="เลขที่บัตรประจำตัวประชาชน*"
                                :rules="citizenRules"
                                :mask="maskcitizen"
                                @change="selectOcitizenid"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-select
                                v-model="NewRequestLicense.Prefixid"          
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
                                v-model="NewRequestLicense.RLfname" 
                                label="ชื่อ*"
                                :rules="textRules"
                                require
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewRequestLicense.RLlname"
                                label="นามสกุล*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewRequestLicense.RLage"
                                label="อายุ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewRequestLicense.RLnationality"
                                label="สัญชาติ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewRequestLicense.RLtel"
                                label="เบอร์โทรศัพท์*"
                                :rules="textRules"
                                :mask="masktel"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewRequestLicense.RLemail"
                                label="อีเมล์"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewRequestLicense.RLhomeno"
                                label="บ้านเลขที่*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewRequestLicense.RLmoo"
                                label="หมู่ที่"
                                :rules="textRules"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewRequestLicense.RLsoi"
                                label="ซอย"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewRequestLicense.RLroad"
                                label="ถนน"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewRequestLicense.RLvillage"
                                label="หมู่บ้าน"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="NewRequestLicense.Pid"    
                                :items="province"
                                item-text="Pname_th"
                                item-value="Pid"
                                label="จังหวัด*"
                                @change="selectedProvince"
                                :rules="textRules"               
                                required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="NewRequestLicense.Did"    
                                :items="district"
                                item-text="Dname_th"
                                item-value="Did"
                                label="อำเภอ*"                    
                                @change="selectedDistrict"
                                :rules="textRules"              
                                required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="NewRequestLicense.SDTid"    
                                :items="subdistrict"
                                item-value="SDTid"
                                item-text="SDTname_th"
                                label="ตำบล*"
                                :rules="textRules"
                                required
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>
                    <div style="font-size: 14pt; text-align: center;">
                        ข้อมูลสถานประกอบการ
                    </div>
                    <v-layout wrap>
                        <v-flex xs12 sm7 md7>
                            <v-select
                                v-model="NewCompany.CTid"
                                :items="types"
                                item-value="CTid"
                                item-text="CTname"
                                label="ประเภทสถานประกอบการ*"
                                @change="selectCompanyType"
                                :rules="textRules"
                                required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm4 md4>
                            <v-text-field
                                v-model="fee"
                                label="ค่าธรรมเนียม*"
                                disabled
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm1 md1 class="mt-4">
                            บาท
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <v-autocomplete
                                v-model="NewCompany.LFid"
                                :items="licensefee"
                                item-value="LFid"
                                item-text="LFname"
                                label="ชนิดสถานประกอบการ*"
                                @change="selectLicenseFee"
                                :rules="textRules"
                            >
                            </v-autocomplete>
                        </v-flex>
                        
                        <v-flex xs12 sm6 md6>                
                            <v-text-field
                                v-model="NewCompany.Cname"
                                label="ชื่อสถานประกอบการ*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewCompany.Carea"
                                label="ขนาดพื้นที่ (ตารางเมตร)"
                                :mask="mask"
                                :rules="textRules"
                                require
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewCompany.Cmachine"
                                label="ขนาดเครื่องจักร (แรงม้า)"
                                :rules="textRules"
                                :mask="mask"
                                require
                            ></v-text-field>
                        </v-flex>                    
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                v-model="NewCompany.Cemployee"
                                label="จำนวนพนักงาน (คน)"
                                :rules="textRules"
                                :mask="mask"
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
                                    :rules="textRules"
                                    required
                                    ></v-text-field>
                                <v-date-picker locale="th" @change="onDateChange">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewCompany.Chomeno"
                                label="บ้านเลขที่*"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewCompany.Cmoo"
                                label="หมู่ที่"
                                :rules="textRules"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewCompany.Csoi"
                                label="ซอย"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewCompany.Croad"
                                label="ถนน"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                                v-model="NewCompany.Cvillage"
                                label="หมู่บ้าน"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="NewCompany.Pid"    
                                :items="province"
                                item-text="Pname_th"
                                item-value="Pid"
                                label="จังหวัด*"
                                @change="selectedProvinceCom"
                                :rules="textRules"               
                                required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="NewCompany.Did"    
                                :items="districtcom"
                                item-text="Dname_th"
                                item-value="Did"
                                label="อำเภอ*"                    
                                @change="selectedDistrictCom"
                                :rules="textRules"              
                                required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-autocomplete
                                v-model="NewCompany.SDTid"    
                                :items="subdistrictcom"
                                item-value="SDTid"
                                item-text="SDTname_th"
                                label="ตำบล*"
                                :rules="textRules"
                                required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="NewCompany.Ctel"
                                label="เบอร์โทรศัพท์"
                                :rules="textRules"
                                :mask="masktel"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                            <v-text-field
                                v-model="NewCompany.Cnoted"
                                label="รายละเอียดเพิ่มเติม"
                                :rules="textRules"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-layout>
                            <input @change="addPDF" type="file" class="upload-btn" name="upload" multiple  accept=".pdf">
                        </v-layout>
                        เลือกไฟล์
                        <div class="img-container-mean">
                            <img
                                v-for="(img, idx) in showPdf" s :key="idx"
                                :src="require('../assets/pdf.png')"
                                height="100"
                            />
                        </div>
                    </v-layout>
                </v-form>
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
        axios.get('http://localhost:5003/prefix')
        .then(res => {
            this.prefix = res.data
        })
        axios.get('http://localhost:5003/getcompanytype')
            .then(res => {
                this.types = res.data
            })
        axios.get('http://localhost:5003/getocitizenid')
            .then(res => {
                this.ocitizenid = res.data
            })
    },
    data: () => ({
        // date: new Date().toISOString().substr(0, 10),
        valid: true,
        mask: '####',
        masktel: '###-#######',
        maskcitizen: '#-####-#####-##-#',
        date: null,
        menu: false,
        types: [],
        company: [],
        province: [],
        district: [],
        districtcom: [],
        subdistrict: [],
        subdistrictcom: [],
        prefix: [],
        licensefee: [],
        fee: null,
        RLpdf: [],
        showPdf: [],
        getPdf: [],
        NewRequestLicense: {
            RLTid: null,
            Cid: null,
            RLnorequest: '',
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
        },
        NewOwner: {
            Oid: '',
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
        NewCompany: {
            CTid: null,
            LFid: null,
            Oid: null,
            Cname: '',
            Carea: '',
            Cmachine: '',
            Cemployee: '',
            Cstartdate: null,
            Chomeno: '',
            Cmoo: '',
            Csoi: '',
            Croad: '',
            Cvillage: '',
            Pid: null,
            Did: null,
            SDTid: null,
            Ctel: '',
            Cnoted: ''
        },
        textRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ],
        emailRules: [
            v => /.+@.+/.test(v) || 'กรุณากรอกรูปแบบอีเมลล์ให้ถูกต้อง'
        ],
        citizenRules: [
            v => !!v || 'กรุณาเลขบัตรประจำตัวประชาชน',
            v => (v && v.length <= 13) || 'ตัวเลข 13 ตัวเท่านั้น'
        ],
    }),
    methods: {
        onDateChange (e) {
            // this.NewRequestLicense.RLdate = e
            let d = new Date(e)
            let year = d.getFullYear() + 543
            let m = d.getMonth() > 8 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
            this.date = `${year}-${m}-${d.getDate()}`
            
        },
        submitNewRequest () {
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }
            let { Uid } =  JSON.parse(localStorage.getItem('userLogin'))
            let owner = {
                Ocitizenid: this.NewOwner.Ocitizenid,
                Prefixid: this.NewRequestLicense.Prefixid,
                Ofirstname: this.NewRequestLicense.RLfname,
                Olastname: this.NewRequestLicense.RLlname,
                Oage: this.NewRequestLicense.RLage,
                Onationality: this.NewRequestLicense.RLnationality,
                Ohomeno: this.NewRequestLicense.RLhomeno,
                Omoo: this.NewRequestLicense.RLmoo,
                Osoi: this.NewRequestLicense.RLsoi,
                Oroad: this.NewRequestLicense.RLroad,
                Ovillage: this.NewRequestLicense.RLvillage,
                SDTid: this.NewRequestLicense.SDTid,
                Did: this.NewRequestLicense.Did,
                Pid: this.NewRequestLicense.Pid,
                Otel: this.NewRequestLicense.RLtel,
                Oemail: this.NewRequestLicense.RLemail
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
            .then(async (result) => {
                if (result.value) {
                    let company = {
                        CTid: this.NewCompany.CTid,
                        LFid: this.NewCompany.LFid,
                        Oid: this.NewCompany.Oid ? this.NewCompany.Oid : 0,
                        Cname: this.NewCompany.Cname,
                        Carea: this.NewCompany.Carea,
                        Cmachine: this.NewCompany.Cmachine,
                        Cemployee: this.NewCompany.Cemployee,
                        Cstartdate: this.date,
                        Chomeno: this.NewCompany.Chomeno,
                        Cmoo: this.NewCompany.Cmoo,
                        Csoi: this.NewCompany.Csoi,
                        Croad: this.NewCompany.Croad,
                        Cvillage: this.NewCompany.Cvillage,
                        Pid: this.NewCompany.Pid,
                        Did: this.NewCompany.Did,
                        SDTid: this.NewCompany.SDTid,
                        Ctel: this.NewCompany.Ctel,
                        Cnoted: this.NewCompany.Cnoted
                    }
                    let request = {
                        RLid: 0,
                        Cid: 0,
                        RLnorequest: this.NewRequestLicense.RLnorequest,
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
                        RLdetail: this.NewCompany.Cnoted,
                        Uid: Uid
                    }
                    try {
                        let res = await axios.post('http://localhost:5003/getownerbyocitizenid', owner)
                        if (res.data.status) {
                            const { data } = await axios.post('http://localhost:5003/newowner', owner)
                            company.Oid = data.Oid
                        }
                        const companyRes = await axios.post('http://localhost:5003/newcompany', company)
                        request.Cid = companyRes.data.Cid
                        const reqRes = await axios.post('http://localhost:5003/newrequest', request)
                        request.RLid = reqRes.data.RLid
                        if (this.RLpdf.length > 0) {
                            let requestPDF = new FormData()
                            this.RLpdf.forEach(e => {
                                requestPDF.append('files', e)
                            })
                            axios.post('http://localhost:5003/RLpdf/' + request.RLid, requestPDF)
                                .then(res => {
                                    console.log(res)
                                })
                        }
                        this.$swal.fire(
                            'เพิ่มข้อมูลคำขอสำเร็จ!',
                            '',
                            'success'
                        )
                        this.$router.push('/requestlicense')
                    } catch (error) {
                        console.log(error)
                        this.$swal.fire(
                            'เกิดข้อผิดพลาด!',
                            'เกิดความผิดพลาดในระบบ โปรดลองใหม่ในภายหลัง',
                            'error'
                        )
                    }
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
        selectedProvinceCom (event) {
            axios.get('http://localhost:5003/district/' + event)
                .then(res => {
                    this.districtcom = res.data
                })
        },        
        selectedDistrictCom (event) {
            axios.get('http://localhost:5003/subdistrict/' + event)
                .then(res => {
                    this.subdistrictcom = res.data
                })
        },
        selectCompanyType (event) {
            axios.get('http://localhost:5003/getlicensefee/' + event)
                .then(res => {
                    this.licensefee = res.data
                })
        },
        selectLicenseFee (ev) {
            for (let i = 0; i < this.licensefee.length; i++) {
                const ele = this.licensefee[i]
                if (ele.LFid == ev) {
                    this.fee = ele.LFfee
                }
            }
        },
        selectOcitizenid (event) {
            axios.get('http://localhost:5003/getownerbyocitizenid/' + event)
                .then(res => {
                    axios.get('http://localhost:5003/district/' + res.data[0].Pid)
                        .then(res => {
                            this.district = res.data
                        })
                    axios.get('http://localhost:5003/subdistrict/' + res.data[0].Did)
                        .then(res => {
                            this.subdistrict = res.data
                        })
                        console.log(res)
                        this.NewCompany.Oid = res.data[0].Oid
                        this.NewRequestLicense.Prefixid = res.data[0].Prefixid
                        this.NewRequestLicense.RLfname = res.data[0].Ofirstname
                        this.NewRequestLicense.RLlname = res.data[0].Olastname
                        this.NewRequestLicense.RLage = res.data[0].Oage
                        this.NewRequestLicense.RLnationality = res.data[0].Onationality
                        this.NewRequestLicense.RLhomeno = res.data[0].Ohomeno
                        this.NewRequestLicense.RLmoo = res.data[0].Omoo
                        this.NewRequestLicense.RLsoi = res.data[0].Osoi
                        this.NewRequestLicense.RLroad = res.data[0].Oroad
                        this.NewRequestLicense.RLvillage = res.data[0].Ovillage
                        this.NewRequestLicense.SDTid = res.data[0].SDTid
                        this.NewRequestLicense.Did = res.data[0].Did
                        this.NewRequestLicense.Pid = res.data[0].Pid
                        this.NewRequestLicense.RLtel = res.data[0].Otel
                        this.NewRequestLicense.RLemail = res.data[0].Oemail
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
