<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
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
        <h2 class="display-2 font-weight-bold mb-3">
          ยินดีต้อนรับ
        </h2>        
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">เข้าสู่ระบบบริหารจัดการข้อมูลใบอนุญาตประกอบกิจการ เทศบาลเมืองเขลางค์นคร</h2>
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

</style>
