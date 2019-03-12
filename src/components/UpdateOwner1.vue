<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                    <span class="headline">UpdateOwner</span>
                    <!-- <div>{{ $route.params.id }}</div> -->
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label="รหัสบัตรประจำตัวประชาชน*"
                                    v-model="owner.OwnerID"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                label="คำนำหน้า*"
                                :items="prefix"
                                item-text="FName"
                                item-value="FNameCode"
                                v-model="owner.FNameCode"
                                required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field 
                                    label="ชื่อเจ้าของกิจการ*" 
                                    v-model="owner.OwnerName"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                    label="สัญชาติ*"
                                    v-model="owner.OwnerNation"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                    label="เบอร์โทรศัพท์*"
                                    v-model="owner.OwnerPhone"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    label="บ้านเลขที่*"
                                    v-model="owner.OwnerNo"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    label="หมู่ที่"
                                    v-model="owner.OwnerMoo"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    label="ซอย"
                                    v-model="owner.OwnerSoi"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    label="ถนน"
                                    v-model="owner.OwnerRoad"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label="ตำบล"
                                    v-model="owner.OwnerTumbon"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label="อำเภอ"
                                    v-model="owner.OwnerCity"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label="จังหวัด"
                                    v-model="owner.OwnerProvince"
                                ></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat :to="'/Owner/'" >Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="submitUpdateOwner">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
const axios = require('axios')
export default {
    created () {
        axios.get('http://localhost:5003/ownergetid/' + this.$route.params.id)
        .then(res => {
            console.log(res)
            this.owner = res.data[0]
        })

        axios.get('http://localhost:5003/fname')
        .then(res => {
            console.log(res)
            this.prefix = res.data
        })
    },
    data: () => ({
        owner : {},
        prefix : []
    }),
    methods: {
        submitUpdateOwner () {
            let owner = {
                    FNameCode: this.owner.FNameCode,
                    OwnerName: this.owner.OwnerName,
                    OwnerNation: this.owner.OwnerNation,
                    OwnerPhone: this.owner.OwnerPhone,
                    OwnerNo: this.owner.OwnerNo,
                    OwnerMoo: this.owner.OwnerMoo,
                    OwnerSoi: this.owner.OwnerSoi,
                    OwnerRoad: this.owner.OwnerRoad,
                    OwnerTumbon: this.owner.OwnerTumbon,
                    OwnerCity: this.owner.OwnerCity,
                    OwnerProvince: this.owner.OwnerProvince
            }
            axios.post('http://localhost:5003/updateowner/' + this.$route.params.id, owner)
            .then(res => {
                console.log(res)
                // this.$emit('AddOwner')
                // this.dialog = false 
                this.$router.push('/owner')               
            })
        }
    }
}
</script>

