import Vue from 'vue'

global.dateTimeFormat = () => {
    return 'Do MMM,YY h:s a'
}


Vue.component('pagination', require('laravel-vue-pagination'));
