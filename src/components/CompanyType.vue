<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm12 md12>
                <v-card>
                    <v-card-title>
                        ประเภทสถานประกอบการ
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-layout row justify-center>
                        <v-flex xs12 sm10 md10>
                            <Types />
                            <Typecategories/>
                            <Typecategoriesdetail />
                            <Alltype />
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import Types from './types'
import Typecategories from './typecategories'
import Typecategoriesdetail from './typecategoriesdetail'
import Alltype from './alltype'
export default {
    components: {
        Types,
        Typecategories,
        Typecategoriesdetail,
        Alltype
    },
    data: () => ({
        types: [],
        Typecategories: [],
        Typecategoriesdetail: []
    }),
    created () {
    },
    methods: {        
    }
}
</script>
