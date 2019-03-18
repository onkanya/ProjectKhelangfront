<template>
    <v-layout style="background-image: linear-gradient(#2962ff, #00b0ff);" justify-center align-center>
        <v-flex xs10 sm6 md4>
            <v-card>
                <v-card-title>
                    <v-btn outline color="#2962ff" fab large>
                        <v-icon>people</v-icon>
                    </v-btn>
                    <div class="headline">เข้าสู่ระบบ</div>
                </v-card-title>
                <v-card-text>
                    <v-layout align-center justify-center>
                        <v-flex xs12>
                            <v-text-field
                                prepend-icon="person"
                                v-model="users.Uusername"
                                label="ชื่อผู้ใช้"
                                type="text"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout align-center justify-center>
                        <v-flex xs12>
                            <v-text-field
                                prepend-icon="lock"
                                v-model="users.Upassword"
                                label="รหัสผ่าน"
                                type="password"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout text-xs-center>
                        <v-flex xs12>
                            <v-btn class="login-btn" color="#2b90d9" depressed dark @click="SubmitUsers" block>เข้าสู่ระบบ</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import Input from 'element-ui/packages/input'
const axios = require('axios') 
export default {
    data: () => ({
        users: {}
    }),
    methods: {
        SubmitUsers() {
            let users = {
                Uusername: this.users.Uusername,
                Upassword: this.users.Upassword
            }
            axios.post('http://localhost:5003/users/', users)
            .then(res => {
                if (res.data.status) {
                    localStorage.setItem('userLogin', JSON.stringify(res.data.user[0]))
                    this.$emit('Login')
                } else {
                    this.$swal.fire(
                        'ชื่อผู้ใช้ และรหัสผ่านไม่ถูกต้อง!',
                        '',
                        'warning'
                    )
                }
            })
        }
    }
}
</script>

<style>
    .login-btn {
        font-weight: 300;
        font-size: 18px;
        padding: 5px 0;
    }
</style>


