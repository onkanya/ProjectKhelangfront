<template>
    <v-layout row justify-center mt-3 mb-3>
            <v-flex xs12 sm10 md8>
                <v-card>
                    <v-card-title>
                        <span class="font-weight-bold">แก้ไขข้อมูลสถานประกอบการ</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm7 md7>
                                    <v-select
                                        v-model="Company.CTid"          
                                        :items="types"
                                        item-text="CTname"
                                        item-value="CTid"
                                        label="ประเภทสถานประกอบการ*"
                                        @change="selectCompanyType"    
                                        required
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm4 md4>
                                    <v-text-field
                                        v-model="Company.LFfee"
                                        label="ค่าธรรมเนียม*"
                                        disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-autocomplete
                                        v-model="Company.LFid"          
                                        :items="licensefee"
                                        item-text="LFname"
                                        item-value="LFid"
                                        label="ประเภทของประเภทสถานประกอบการ*"
                                        @change="selectLicenseFee"
                                        required
                                    ></v-autocomplete>
                                </v-flex>  
                                <v-flex xs12 sm6 md6>                
                                    <v-autocomplete
                                        v-model="Company.Oid"
                                        :items="owner"
                                        item-text="Oname"
                                        item-value="Oid"
                                        label="เจ้าของสถานประกอบการ"
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                        v-model="Company.Cname" 
                                        label="ชื่อสถานประกอบการ*"
                                        require="true"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Carea" 
                                        label="ขนาดพื้นที่ (ตารางเมตร)"
                                        require="true"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Cmachine" 
                                        label="จำนวนเครื่องจักร (เครื่อง)"
                                        require="true"
                                    ></v-text-field>
                                </v-flex>                    
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Cemployee"
                                        label="จำนวนพนักงาน (คน)"
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
                                        label="วันที่เริ่มกิจการ"
                                        prepend-icon="event"
                                        readonly
                                        ></v-text-field>
                                        <v-date-picker locale="th" @change="onDateChange" >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Chomeno"
                                        label="บ้านเลขที่*"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Cmoo"
                                        label="หมู่ที่"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Csoi"
                                        label="ซอย"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Croad"
                                        label="ถนน"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        v-model="Company.Cvillage"
                                        label="หมู่บ้าน"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-autocomplete
                                        v-model="Company.Pid"                            
                                        :items="province"
                                        item-text="Pname_th"
                                        item-value="Pid"
                                        label="จังหวัด*"
                                        @change="selectedProvince"               
                                        required
                                    ></v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-autocomplete
                                        v-model="Company.Did"    
                                        :items="district"
                                        item-text="Dname_th"
                                        item-value="Did"
                                        label="อำเภอ*"                    
                                        @change="autocompleteedDistrict"              
                                        required
                                    ></v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-autocomplete
                                        v-model="Company.SDTid" 
                                        :items="subdistrict"
                                        item-text="SDTname_th"
                                        item-value="SDTid"
                                        label="ตำบล*"
                                        required
                                    ></v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm12 md6>
                                    <v-text-field
                                        v-model="Company.Ctel"
                                        label="เบอร์โทรศัพท์"
                                        :rules="textRules"
                                        :mask="masktel"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md6>
                                    <v-text-field
                                        v-model="Company.Cnoted"
                                        label="รายละเอียดเพิ่มเติม"
                                        :rules="textRules"
                                        required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="red darken-4" flat :to="'/company/'">ยกเลิก</v-btn>
                            <v-btn color="blue darken-1" flat @click="submitUpdateCompany">บันทึก</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
    </v-layout>
</template>


<script>
import axios from 'axios'
import moment from 'moment'
export default { 
    created () {
        axios.get('http://localhost:5003/companygetid/' + this.$route.params.id)
            .then(res => {
                this.Company = res.data[0]
                this.date = this.Company.Cstartdate
                axios.get('http://localhost:5003/district/' + this.Company.Pid)
                    .then(res => {
                        this.district = res.data
                    })
                axios.get('http://localhost:5003/subdistrict/' + this.Company.Did)
                    .then(res => {
                        this.subdistrict = res.data
                    })
                axios.get('http://localhost:5003/getlicensefee/' + this.Company.CTid)
                    .then(res => {
                        this.licensefee = res.data
                    })
        })
        axios.get('http://localhost:5003/ownerforcompany')
            .then(res => {
                this.owner = res.data
            })
        axios.get('http://localhost:5003/province')
            .then(res => {
                this.province = res.data
            })
        axios.get('http://localhost:5003/getcompanytype')
            .then(res => {
                this.types = res.data
            })
        axios.get('http://localhost:5003/imagecompany/' + this.$route.params.id)
            .then(res => {
                this.getImg = res.data
            })
    },
    data: () => ({
        // date: new Date().toISOString().substr(0, 10),
        date: null,
        menu: false,
        masktel: '###-#######',
        Company: {},
        owner: [],
        province: [],
        types: [],
        subdistrict: [],
        district: [],
        Cimg: [],
        showImg: [],
        getImg: [],
        licensefee: [],
        fee: null
    }),
    methods: {
        onDateChange (e) {
            let d = new Date(e)
            let year = d.getFullYear() + 543
            let m = d.getMonth() > 8 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`
            this.date = `${year}-${m}-${d.getDate()}`
        },
        submitUpdateCompany () {
            let company = {
                CTid: this.Company.CTid,
                LFid: this.Company.LFid,
                Oid: this.Company.Oid,
                Cname: this.Company.Cname,
                Carea: this.Company.Carea,
                Cmachine: this.Company.Cmachine,
                Cemployee: this.Company.Cemployee,
                Cstartdate: this.date,
                Chomeno: this.Company.Chomeno,
                Cmoo: this.Company.Cmoo,
                Csoi: this.Company.Csoi,
                Croad: this.Company.Croad,
                Cvillage: this.Company.Cvillage,
                Pid: this.Company.Pid,
                Did: this.Company.Did,
                SDTid: this.Company.SDTid,
                Cimg: this.Cimg,
                Ctel: this.Company.Ctel,
                Cnoted: this.Company.Cnoted
            }
            this.$swal.fire({
                title: 'ยืนยันการแก้ไขข้อมูล',
                text: "คุณต้องการแก้ไขข้อมูลสถานประกอบการหรือไม่ ?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {
                    axios.post('http://localhost:5003/updatecompany/' + this.$route.params.id, company)
                        .then(res => {
                            console.log(res) 
                            this.$router.push('/company')          
                        })
                    this.$swal.fire(
                        'แก้ไขข้อมูลสถานประกอบการสำเร็จ!',
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
                    this.Company.LFfee = ele.LFfee
                }
            }
        },
        async addImage (e) {
            let arr = []
            for (let index = 0; index < e.target.files.length; index++) {
                this.Cimg.push(e.target.files[index])
                let result_base64 = await new Promise((resolve) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => resolve(fileReader.result);
                    fileReader.readAsDataURL(e.target.files[index]);
                });
                arr.push(result_base64)
            }
            this.showImg = arr
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

