<template>
    <v-layout row justify-center mt-3>  
        <v-flex xs12 sm10 md8> 
        <v-card>
            <v-card-title>
            <span class="headline">เพิ่มข้อมูลสถานประกอบการ</span>
            </v-card-title>
            <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                        <v-select
                            v-model="NewCompany.CTid"          
                            :items="types"
                            item-text="CTname"
                            item-value="CTid"
                            label="ประเภทสถานประกอบการ*"
                            @change="selectTypes"    
                            required
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-select
                            v-model="NewCompany.CTCid"          
                            :items="typecategories"
                            item-text="CTCname"
                            item-value="CTCid"
                            label="ประเภทของประเภทสถานประกอบการ*"
                            required
                        ></v-select>
                    </v-flex>  
                    <v-flex xs12 sm6 md6>                
                        <v-autocomplete
                            v-model="NewCompany.Oid"
                            :items="owner"
                            item-text="Oname"
                            item-value="Oid"
                            label="เจ้าของสถานประกอบการ"
                        >
                        </v-autocomplete>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field
                            v-model="NewCompany.Cname" 
                            label="ชื่อสถานประกอบการ*"
                            require="true"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Carea" 
                            label="ขนาดพื้นที่*"
                            require="true"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Cmachine" 
                            label="จำนวนเครื่องจักร*"
                            require="true"
                        ></v-text-field>
                    </v-flex>                    
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Cemployee"
                            label="จำนวนพนักงาน*"
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
                            <v-date-picker v-model="NewCompany.Cstartdate" no-title scrollable>
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
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Cmoo"
                            label="หมู่ที่"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Csoi"
                            label="ซอย"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Croad"
                            label="ถนน"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-text-field
                            v-model="NewCompany.Cvillage"
                            label="หมู่บ้าน"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <v-select
                            v-model="NewCompany.Pid"                            
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
                            v-model="NewCompany.Did"    
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
                            v-model="NewCompany.SDTid" 
                            :items="owner"
                            item-text="SDTname_th"
                            item-value="SDTid"
                            label="ตำบล*"
                            required
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat :to="'/Company/'" >Close</v-btn>
            <v-btn color="blue darken-1" flat @click="submitNewCompany">Save</v-btn>
            </v-card-actions>
        </v-card> 
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    created () {
        axios.get('http://localhost:5003/ownerforcompany')
            .then(res => {
                console.log(res)
                this.owner = res.data
            })
        axios.get('http://localhost:5003/province')
            .then(res => {
                this.province = res.data
            })
        axios.get('http://localhost:5003/getcompanytype')
            .then(res => {
                console.log(res)
                this.types = res.data
            })
    },
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        owner: [],
        province: [],
        district: [],
        subdistrict: [],
        NewCompany: {
            CTid: null,
            CTCid: null,
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
            SDTid: null
        },
        types: [],
        typecategories: []
    }),
    methods: {
        submitNewCompany () {
            let company = {
                CTid: this.NewCompany.CTid,
                CTCid: this.NewCompany.CTCid,
                Oid: this.NewCompany.Oid,
                Cname: this.NewCompany.Cname,
                Carea: this.NewCompany.Carea,
                Cmachine: this.NewCompany.Cmachine,
                Cemployee: this.NewCompany.Cemployee,
                Cstartdate: this.NewCompany.Cstartdate,
                Chomeno: this.NewCompany.Chomeno,
                Cmoo: this.NewCompany.Cmoo,
                Csoi: this.NewCompany.Csoi,
                Croad: this.NewCompany.Croad,
                Cvillage: this.NewCompany.Cvillage,
                Pid: this.NewCompany.Pid,
                Did: this.NewCompany.Did,
                SDTid: this.NewCompany.SDTid
            }
            axios.post('http://localhost:5003/newcompany', company)
            .then(res => {
                console.log(res)
                // this.$emit('AddOwner')   
                this.NewCompany = ''  
                this.$router.push('/company')           
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
        selectTypes (event) {
            axios.get('http://localhost:5003/getcompanytypecategories/' + event)
                .then(res => {
                    this.typecategories = res.data
                })
        }   
    }
}
</script>
