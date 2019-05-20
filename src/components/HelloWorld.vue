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
          ยินดีต้อนรับ
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

    })
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Kanit:100,200,300,400,500,600,700');
    #layout-app {
        font-family: 'Kanit';
    }
</style>
