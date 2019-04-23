<template>
    <v-layout row justify-center mt-3 mb-3>  
        <v-flex xs12 sm10 md10>
            <v-container grid-list-md>
                <v-stepper v-model="e1">
                    <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">1. ข้อมูลคำขอ</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">2. ข้อมูลทั่วไป</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 3" step="3">3. ข้อมูลด้านสุขาภิบาล</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="4">4. ผลการตรวจและข้อแนะนำ</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-3" height="auto" flat>
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
                                                    :items="districtrequest"
                                                    item-text="Dname_th"
                                                    item-value="Did"
                                                    label="อำเภอ*"
                                                    disabled            
                                                ></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <v-select
                                                    v-model="RequestLicense.SDTid"
                                                    :items="subdistrictrequest"
                                                    item-value="SDTid"
                                                    item-text="SDTname_th"
                                                    label="ตำบล*"
                                                    disabled
                                                ></v-select>
                                            </v-flex>
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
                                                    disabled
                                                ></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm12 md6>
                                                <v-text-field
                                                    slot="activator"
                                                    v-model="RequestLicense.RLgetlicensedate"
                                                    label="วันที่นัดรับใบอนุญาตประกอบกิจการ"
                                                    prepend-icon="event"
                                                    readonly
                                                    disabled
                                                    ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12>
                                                <v-text-field
                                                    v-model="RequestLicense.RLnoted"
                                                    label="กรณีที่เอกสารหลักฐานไม่ครบ คือ"
                                                    multi-line
                                                    disabled
                                                ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-form>
                                </v-container>
                            </v-card-text>
                        </v-card>
                        <div style="text-align: right;">
                            <v-btn flat color="red darken-1" :to="'/Investigation/'">ยกเลิก</v-btn>
                            <v-btn flat color="blue darken-1" @click.native="e1 = 2">ถัดไป</v-btn>
                        </div>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <v-card class="mb-3" height="auto" flat>
                            <v-card-title>
                                <span class="font-weight-bold">ข้อมูลทั่วไปของสถานประกอบการ</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-autocomplete
                                            v-model="companyowner.Cid"
                                            :items="company"
                                            item-text="Cname"
                                            item-value="Cid"
                                            label="สถานประกอบการ"
                                            :rules="textRules"
                                            disabled
                                        >
                                        </v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-text-field
                                            v-model="companyowner.Cemployee"
                                            label="จำนวนพนักงาน (คน)"
                                            :rules="textRules"
                                            :mask="mask"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-text-field
                                            label="ขนาดพื้นที่ (ตารางเมตร)"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="companyowner.Chomeno"
                                            label="บ้านเลขที่*"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="companyowner.Cmoo"
                                            label="หมู่ที่"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="companyowner.Csoi"
                                            label="ซอย"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                            v-model="companyowner.Croad"
                                            label="ถนน"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                            v-model="companyowner.Cvillage"
                                            label="หมู่บ้าน"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select
                                            v-model="companyowner.Pid"                            
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
                                            v-model="companyowner.Did"    
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
                                            v-model="companyowner.SDTid" 
                                            :items="subdistrict"
                                            item-text="SDTname_th"
                                            item-value="SDTid"
                                            label="ตำบล*"
                                            :rules="textRules"
                                            required
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-text-field
                                            v-model="HCIgeneral.HCIGdayopen"
                                            label="วันเปิดทำการ*"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-menu
                                            ref="menu"
                                            :close-on-content-click="false"
                                            v-model="menuopen"
                                            :nudge-right="40"
                                            :return-value.sync="time"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="HCIgeneral.HCIGtimeopen"
                                            label="เวลาเปิดทำงาน"
                                            prepend-icon="access_time"
                                            readonly
                                            ></v-text-field>
                                            <v-time-picker v-model="HCIgeneral.HCIGtimeopen" @change="$refs.menu.save(time)" format="24hr"></v-time-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-menu
                                            ref="menu"
                                            :close-on-content-click="false"
                                            v-model="menuclose"
                                            :nudge-right="40"
                                            :return-value.sync="time"
                                            lazy
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <v-text-field
                                            slot="activator"
                                            v-model="HCIgeneral.HCIGtimeclose"
                                            label="เวลาปิดทำการ"
                                            prepend-icon="access_time"
                                            readonly
                                            ></v-text-field>
                                            <v-time-picker v-model="HCIgeneral.HCIGtimeclose" @change="$refs.menu.save(time)" format="24hr"></v-time-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-text-field
                                            v-model="HCIgeneral.HCIGbuilding"
                                            label="ลักษณะอาคาร*"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>                
                                        <v-autocomplete
                                            v-model="companyowner.Oid"
                                            :items="owner"
                                            item-text="Oname"
                                            item-value="Oid"
                                            label="เจ้าของสถานประกอบการ"
                                            :rules="textRules"
                                            disabled
                                        >
                                        </v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                            v-model="companyowner.Otel"
                                            label="เบอร์โทรศัพท์*"
                                            :rules="textRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <input @change="addImage" type="file" class="upload-btn" name="upload" multiple  accept="image/*">
                                    </v-layout>
                                    เลือกรูปภาพใหม่
                                    <div class="img-container-mean">
                                        <img
                                            v-for="(img, idx) in showImg" s :key="idx"
                                            :src="img"
                                        />
                                    </div>
                                    รูปภาพเดิม
                                    <div class="img-container-mean">
                                        <img
                                            v-for="(img, idx) in getImg" s :key="idx"
                                            :src="img.IPpath"
                                        />
                                    </div>
                                    <v-layout>
                                        <v-flex>
                                            <span>เลือกตำแหน่งที่ตั้งสถานประกอบการ</span>
                                        </v-flex>
                                    </v-layout>
                                    <GmapMap
                                        :center="center"
                                        :zoom="13"
                                        :options="{
                                            zoomcontrol: true,
                                            streetviewcontrol: false
                                        }"
                                        style="width: 100%; height: 500px"
                                        @click="onMarkerPlace"
                                    >
                                        <GmapMarker
                                            :position="{ lat: companyowner.Clat, lng: companyowner.Clong }"
                                            @dragend="onMarkerPlace"
                                            :draggable="true"
                                        />
                                    </GmapMap>
                                </v-container>
                            </v-card-text>
                        </v-card>
                        <div style="text-align: right;">
                            <v-btn flat color="red darken-1" @click.native="e1 = 1">ยกเลิก</v-btn>
                            <v-btn flat color="blue darken-1" @click="e1 = 3">ถัดไป</v-btn>
                        </div>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card class="mb-3" height="auto" flat>
                            <v-card-title>
                                <span class="font-weight-bold">ข้อมูลด้านการสุขาภิบาลสิ่งแวดล้อมและความปลอดภัย</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <template>
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="HCIErules"
                                    select-all
                                    item-key="name"
                                    class="elevation-0"
                                    hide-actions
                                >
                                    <template slot="headers" slot-scope="props">
                                        <tr>
                                            <template v-for="(header, idx) in props.headers">
                                                <th v-if="idx === 3" :key="idx">
                                                    <v-checkbox
                                                        :input-value="props.all"
                                                        :indeterminate="props.indeterminate"
                                                        primary
                                                        hide-details
                                                        @click.native="toggleAll"
                                                    ></v-checkbox>
                                                </th>
                                                <th
                                                    :key="header.text"
                                                    @click="changeSort(header.value)"
                                                >
                                                    <v-icon small>arrow_upward</v-icon>
                                                    {{ header.text }}
                                                </th>
                                            </template>
                                        </tr>
                                    </template>
                                    <template slot="items" slot-scope="props">
                                        <tr v-for="(child, index) in props.item.children" :key="index">
                                            <td class="text-xs-right" :rowspan="props.item.children.length" v-if="child.isFirst">{{ props.index + 1 }}</td>
                                            <td class="text-xs-right" :rowspan="props.item.children.length" v-if="child.isFirst">{{ props.item.name }}</td>
                                            <td>{{ child.name }}</td>
                                            <td>
                                                <v-checkbox
                                                    :input-value="HCIenvironment[child.checked]"
                                                    primary
                                                    hide-details
                                                    :disabled="child.checked === null"
                                                ></v-checkbox>
                                            </td>
                                            <td class="text-xs-center">
                                                <v-text-field v-model="HCIenvironment[child.noted]"></v-text-field>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                                </template>
                        </v-card>
                        <div style="text-align: right;">
                            <v-btn flat color="red darken-1" @click.native="e1 = 2">ยกเลิก</v-btn>
                            <v-btn flat color="blue darken-1" @click="e1 = 4">ถัดไป</v-btn>
                        </div>
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <v-card class="mb-3" height="auto" flat>
                            <v-card-title>
                                <span class="font-weight-bold">ข้อมูลด้านการสุขาภิบาลสิ่งแวดล้อมและความปลอดภัย</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        <p>ผลการสำรวจ</p>
                                        <v-radio-group v-model="HCIsummary.HCISresult" row>
                                            <v-radio label="ผ่าน" value="1"></v-radio>
                                            <v-radio label="แก้ไขปรับปรุง" value="2"></v-radio>
                                            <v-radio label="ไม่ผ่าน" value="3"></v-radio>
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field
                                            v-model="HCIsummary.HCIScomment"
                                            label="คำแนะนำและความคิดเห็นของเจ้าหน้าที่"
                                            multi-line
                                        ></v-text-field>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                        <div style="text-align: right;">
                            <v-btn flat color="red darken-1" @click.native="e1 = 3">ยกเลิก</v-btn>
                            <v-btn flat color="blue darken-1" @click="submitUpdate">ถัดไป</v-btn>
                        </div>
                    </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
                
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    created () {
        axios.get('http://localhost:5003/getrequest/' + this.$route.params.id)
            .then(res => {
                this.RequestLicense = res.data[0]
                this.date = this.RequestLicense.RLdate
                axios.get('http://localhost:5003/district/' + this.RequestLicense.Pid)
                    .then(res => {
                        this.districtrequest = res.data
                    })
                axios.get('http://localhost:5003/subdistrict/' + this.RequestLicense.Did)
                    .then(res => {
                        this.subdistrictrequest = res.data
                    })
                axios.get('http://localhost:5003/getcompanyandowner/' + this.RequestLicense.RLid)
                    .then(res => {
                        this.companyowner = res.data[0]
                        axios.get('http://localhost:5003/district/' + this.companyowner.Pid)
                            .then(res => {
                                this.district = res.data
                            })
                        axios.get('http://localhost:5003/subdistrict/' + this.companyowner.Did)
                            .then(res => {
                                this.subdistrict = res.data
                            })
                        if(this.companyowner.Clat === null || this.companyowner.Clong === null) {
                            this.geolocation()            
                        } else {
                            this.center = {
                                lat: this.companyowner.Clat,
                                lng: this.companyowner.Clong
                            }
                        }
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
        axios.get('http://localhost:5003/ownerforcompany')
            .then(res => {
                this.owner = res.data
            })
        axios.get('http://localhost:5003/imageHCI/' + this.$route.params.id)
            .then(res => {
                console.log(res)
                this.getImg = res.data
            })
    },
    data: () => ({
        // date: new Date().toISOString().substr(0, 10),
        time: null,
        time2: null,
        menuopen: false,
        menuclose: false,
        masktel: '###-#######',
        mask: '####',
        center: {lat: null , lng: null},
        e1: 0,        
        date: null,
        statusdate: null,
        menu: false,
        company: [],
        requesttype: [],
        province: [],
        districtrequest: [],
        subdistrictrequest: [],
        district: [],
        subdistrict: [],
        prefix: [],
        RequestLicense: {},
        statusoption: [
            { text: 'รอตรวจสอบคำขอ', value: '1'},
            { text: 'เอกสารหลักฐานไม่ครบ', value: '2'},
            { text: 'เอกสารหลักฐานครบ', value: '3'},
            { text: 'ไม่ผ่านการสำรวจสถานประกอบการ', value: '4'},
            { text: 'ผ่านการสำรวจสถานประกอบการ', value: '5'}
        ],
        textRules: [
            v => !!v || 'กรุณากรอกข้อมูล'
        ],
        company: [],
        owner: [],
        companyowner: {
            Clat: null,
            Clong: null,
        },
        HCIimg: [],
        showImg: [],
        getImg: [],
        HCIgeneral: {
            HCIGbuilding: '',
            HCIGdayopen: '',
            HCIGtimeopen: null,
            HCIGtimeclose: null
        },
        HCIenvironment: {
            HCIEbuildprotect: false,
            HCIEbuildprotectnoted: '',
            HCIEbuilddoor: false,
            HCIEbuilddoornoted: '',
            HCIEbuildoverview: false,
            HCIEbuildoverviewnoted: '',
            HCIEsoundprotect: false,
            HCIEsoundprotectnoted: '',
            HCIEventilate: '',
            HCIEventilateenough: false,
            HCIEventilateenoughnoted: '',
            HCIEventilatesmoking: false,
            HCIEventilatesmokingnoted: '',
            HCIElightingenough: false,
            HCIElightingenoughnoted: '',
            HCIElightinglaser: false,
            HCIElightinglasernoted: '',
            HCIEsecureemergency: false,
            HCIEsecureemergencynoted: '',
            HCIEsecurealarm: false,
            HCIEsecurealarmnoted: '',
            HCIEsecurefire: false,
            HCIEsecurefirenoted: '',
            HCIEsecurecrowded: false,
            HCIEsecurecrowdednoted: ''
        },
        selected: [],
        headers: [
            {
                text: 'ลำดับ',
                align: 'left',
                value: ''
            },
            { text: 'หัวข้อหลัก' },
            { text: 'หัวข้อการสำรวจ' },
            { text: 'หมายเหตุ' }
        ],
        HCIErules: [
            {
                value: false,
                name: 'ลักษณะอาคาร',
                children: [
                    { name: 'อาคารปิดมิดชิด และใช้วัสดุป้องกันเสียงและความสั่นสะเทือน', isFirst: true, checked: 'HCIEbuildprotect', noted: 'HCIEbuildprotectnoted' },
                    { name: 'ประตูเข้าออกต้องปิดไว้ตลอดขณะทำการ แต่ต้องสามารถเปิดเข้า - ออกได้', isFirst: false, checked: 'HCIEbuilddoor', noted: 'HCIEbuilddoornoted' },
                    { name: 'บริเวณโดยรอบอาคาร ตัวอาคาร พื้น ผนัง เพดาน โต๊ะ และเก้าอี้ ได้รับการดูแลให้สะอาดเป็นระเบียบเรียบร้อยอยู่เสมอ', isFirst: false, checked: 'HCIEbuildoverview', noted: 'HCIEbuildoverviewnoted' },
                ]
            },
            {
                value: false,
                name: 'การควบคุมและป้องกันเสียงดังจากการประกอบการ',
                children: [
                    { name: 'มีการป้องกันเสียงและความสั่นสะเทือนอย่างมีประสิทธิภาพ', isFirst: true, checked: 'HCIEsoundprotect', noted: 'HCIEsoundprotectnoted' },
                ]
            },
            {
                value: false,
                name: 'การระบายอากาศ',
                children: [
                    { name: 'ระบายอากาศแบบ...', isFirst: true, checked: null, noted: 'HCIEventilate' },
                    { name: 'การระบายอากาศเพียงพอ', isFirst: false, checked: 'HCIEventilateenough', noted: 'HCIEventilateenoughnoted' },
                    { name: 'จัดให้มีที่สูบบุหรี่', isFirst: false, checked: 'HCIEventilatesmoking', noted: 'HCIEventilatesmokingnoted' },
                ]
            },
            {
                value: false,
                name: 'แสงสว่าง',
                children: [
                    { name: 'แสงสว่างเพียงพอ', isFirst: true, checked: 'HCIElightingenough', noted: 'HCIElightingenoughnoted' },
                    { name: 'ในกรณีใช้แสงเลเซอร์ แสงที่ใช้ต้องเป็นแสงที่ใช้สำหรับสถานบันเทิงเท่านั้น และไม่ก่อให้เกิดอันตรายต่อสายตา', isFirst: false, checked: 'HCIElightinglaser', noted: 'HCIElightinglasernoted' },
                ]
            },
            {
                value: false,
                name: 'ระบบความปลอดภัย',
                children: [
                    { name: 'มีไฟฟ้าฉุกเฉินที่ไม่ใช้ไฟฟ้าจากระบบปกติ(เฉพาะบางรายกิจการ)', isFirst: true, checked: 'HCIEsecureemergency', noted: 'HCIEsecureemergencynoted' },
                    { name: 'มีระบบสัญญาณเตือนเพลิงไหม้', isFirst: false, checked: 'HCIEsecurealarm', noted: 'HCIEsecurealarmnoted' },
                    { name: 'มีถังดับเพลิงจำนวนเพียงพอ ติดตั้งสูงจากพื้นไม่เกิน 1.5 เมตร ในยริเวณที่สมารถมองเห็นได้ชัดเจนและสะดวกต่อการใช้สอย รวมทั้งต้องอยู่ในสภาพพร้อมใช้งานตลอดเวลา', isFirst: false, checked: 'HCIEsecurefire', noted: 'HCIEsecurefirenoted' },
                    { name: 'ควบคุมไม่ให้ผู้ใช้บริการเข้าไปในสถานประกอบการมากจนทำให้เกิดความแออัดมากเกินไป', isFirst: false, checked: 'HCIEsecurecrowded', noted: 'HCIEsecurecrowdednoted' },
                ]
            },
        ],
        HCIsummary: {
            HCISresult: '1',
            HCIScomment: ''
        }
    }),
    methods: {
        toggleAll () {
            this.HCIErules.forEach(e => {
                e.children.forEach(el => {
                    this.HCIenvironment[el.checked] = !this.HCIenvironment[el.checked]
                })
            })
        },
        geolocation : function() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.companyowner = {
                    ...this.companyowner,
                    Clat: position.coords.latitude,
                    Clong: position.coords.longitude
                }
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        },
        onMarkerPlace (event) {
            this.companyowner.Clat = event.latLng.lat()
            this.companyowner.Clong = event.latLng.lng()
        },
        computeMarkerPos (position) {
            console.log(position)
        },
        onDateChange (e) {
            this.RequestLicense.RLdate = e
        },
        submitUpdate () {
            if (!this.$refs.form.validate()) {
                this.$swal.fire({
                    title: 'ข้อมูลไม่ครบถ้วน!',
                    text: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
                    type: 'warning',
                })
                return
            }
            let { Uid } =  JSON.parse(localStorage.getItem('userLogin'))
            let updatecompany = {
                Carea: this.companyowner.Carea,
                Cemployee: this.companyowner.Cemployee,
                Chomeno: this.companyowner.Chomeno,
                Cmoo: this.companyowner.Cmoo,
                Csoi: this.companyowner.Csoi,
                Croad: this.companyowner.Croad,
                Cvillage: this.companyowner.Cvillage,
                Pid: this.companyowner.Pid,
                Did: this.companyowner.Did,
                SDTid: this.companyowner.SDTid,
                Clat: this.companyowner.Clat,
                Clong: this.companyowner.Clong
            }
            let updateowner = {
                Otel: this.companyowner.Otel
            }
            let hcige = {
                HCIGbuilding: this.HCIgeneral.HCIGbuilding,
                HCIGdayopen: this.HCIgeneral.HCIGdayopen,
                HCIGtimeopen: this.HCIgeneral.HCIGtimeopen,
                HCIGtimeclose: this.HCIgeneral.HCIGtimeclose
            }
            let hcisum = {
                HCISresult: this.HCIsummary.HCISresult,
                HCIScomment: this.HCIsummary.HCIScomment
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
                    let HazardCompanyInvestigation = {
                        HCIid: 0,
                        HCIdate: 0,
                        RLid: this.$route.params.id,
                        HCIGid: 0,
                        HCIEid: 0,
                        HCISid: 0,
                        Uid: Uid
                    }
                    axios.post('http://localhost:5003/updategeneralcompany/' + this.companyowner.Cid, updatecompany)
                    .then(res => {
                        axios.post('http://localhost:5003/updategeneralowner/' + this.companyowner.Oid, updateowner)
                        .then(res => {
                            axios.post('http://localhost:5003/newhcig', hcige)
                            .then(res => {
                                HazardCompanyInvestigation.HCIGid = res.data.HCIGid
                                    axios.post('http://localhost:5003/newhcie', this.HCIenvironment)
                                    .then(res => {
                                        HazardCompanyInvestigation.HCIEid = res.data.HCIEid
                                            axios.post('http://localhost:5003/newhcis', hcisum)
                                            .then(res => {
                                                HazardCompanyInvestigation.HCISid = res.data.HCISid
                                                    axios.post('http://localhost:5003/newinvestigation', HazardCompanyInvestigation)
                                                        .then(res => {
                                                            this.$router.push('/investigation')
                                                            this.$swal.fire(
                                                                'แก้ไขข้อมูลคำขอสำเร็จ!',
                                                                '',
                                                                'success'
                                                            )
                                                        })
                                            })
                                    })
                            })
                        })
                    })
                    if (this.HCIimg.length > 0) {
                        let HCIimage = new FormData()
                        this.HCIimg.forEach(e => {
                            HCIimage.append('files', e)
                        })
                        axios.post('http://localhost:5003/imageHCI/' + this.$route.params.id, HCIimage)
                            .then(res => {
                                console.log(res)
                            })
                    }
                }
            })
        },
        onHCIEnvirontmentSubmit () {
            console.log(this.selected);
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
        async addImage (e) {
            let arr = []
            for (let index = 0; index < e.target.files.length; index++) {
                this.HCIimg.push(e.target.files[index])
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
