<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      id="layout-app"
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-4"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h2 class="font-weight-bold mb-3" style="font-size: 30pt">
          ยินดีต้อนรับ {{ userdata }}
        </h2>        
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="font-weight-bold mb-3" style="font-size: 20pt">เข้าสู่ระบบบริหารจัดการข้อมูลใบอนุญาตประกอบกิจการ เทศบาลเมืองเขลางค์นคร</h2>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      userdata: ''
    }),
    mounted () {
        let { Ustatus } = JSON.parse(localStorage.getItem('userLogin'))
        if(Ustatus == 1) {
          this.userdata = 'ผู้ดูแลระบบ'
        }
        else if(Ustatus == 2) {
          this.userdata = 'ผู้บริหาร'
        }
        else if(Ustatus == 3) {
          this.userdata = 'หัวหน้ากองสาธารณสุขและสิ่งแวดล้อม'
        }
        else if(Ustatus == 4) {
          this.userdata = 'เจ้าหน้าที่รับคำขอรับใบอนุญาตประกอบกิจการ'
        }
        else {
          this.userdata = 'เจ้าหน้าที่สำรวจสถานประกอบการ'
        }
    },
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Kanit:100,200,300,400,500,600,700');
    #layout-app {
        font-family: 'Kanit';
    }
</style>
