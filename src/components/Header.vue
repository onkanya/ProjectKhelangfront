<template>
    <div>
        <v-toolbar>
            <v-toolbar-side-icon
                @click.stop="drawer = !drawer"
            >
            </v-toolbar-side-icon>
            <v-toolbar-title>ระบบบริหารจัดการใบอนุญาตประกอบกิจการ</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <!-- <v-btn flat @click="userLogout">ออกจากระบบ</v-btn> -->
            <v-btn flat @click="userLogout">ออกจากระบบ</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-layout>      
            <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            >
            <v-list class="pa-1">
                <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ userdata }}</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile
                    v-for="item in items"
                    v-if="isPermission(item.permission)"
                    :key="item.title"
                    router
                    exact
                    :to="item.link"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            </v-navigation-drawer>
        </v-layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
            drawer: null,
            items: [
                { title: 'Home', icon: 'dashboard', link: '/home', permission: [0] },
                { title: 'เจ้าของสถานประกอบการ', icon: 'face', link: '/Owner', permission: [3, 4, 5] },
                { title: 'Company', icon: 'account_balance', link: '/company', permission: [3, 4, 5] },
                { title: 'ประเภทสถานประกอบการ', icon: 'account_balance', link: '/companytype', permission: [3] }
            ],
            userdata: ''
        }
    },
    mounted () {
        let { Ufirstname, Ulastname } = JSON.parse(localStorage.getItem('userLogin'))
        this.userdata = Ufirstname + ' ' + Ulastname
    },
    methods: {
        userLogout () {
            this.$swal.fire({
                title: 'ออกจากระบบ',
                text: "คุณต้องการออกจากระบบหรือไม่",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'ยกเลิก',
                confirmButtonText: 'ตกลง'
            })
            .then((result) => {
                if (result.value) {
                    localStorage.removeItem('userLogin')
                    this.$emit('Logout')
                    this.$swal.fire(
                        'ออกจากระบบสำเร็จ!',
                        '',
                        'success'
                    )
                }
            })  
        },
        isPermission (permission) {
            let { Ustatus } = JSON.parse(localStorage.getItem('userLogin'))        
            if (permission.find(e => e === parseInt(Ustatus)) !== undefined) {
                return true
            } else if (permission[0] === 0) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>


