/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Vuex from 'vuex';
Vue.use(Vuex);
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap-vue/dist/bootstrap-vue.css'
import swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
Vue.component('loading', Loading)
import 'vue-loading-overlay/dist/vue-loading.css';
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('main-component', require('./components/Main.vue').default);

const router = new VueRouter({
    mode: 'history',
    routes: [
        // adminホーム
        { name: 'adminHome', path: '/adminHome', component: require('./components/AdminHome.vue').default },
        //チケット
        { name: 'ticket', path: '/ticket', component: require('./components/Ticket.vue').default },
        //ガントチャート
        { name: 'gantt', path: '/gantt', component: require('./components/Gantt.vue').default },
        { name: 'gantt2', path: '/gantt2', component: require('./components/Gantt2.vue').default },
        { name: 'gantt3', path: '/gantt3', component: require('./components/Gantt3.vue').default },
        { name: 'setting', path: '/setting', component: require('./components/Setting.vue').default },
    ]
});
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 const store = new Vuex.Store({
     state: {
         dates: [],
         gantt_start: '',
         gantt_end: '',
         option: {
             step: 24,
             header_height: 60,
             column_width: 10, //一日
             view_mode: 'month',
             bar_height: 25,
             padding: 18,
         },
         tasks: [
             {
                 id: '1',
                 name: '案件名1',
                 start: '2019-01-01',
                 end: '2019-12-01',
                 progress: 0,
                 belongsto: 1,
                 mode: 1,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '2',
                 name: '処方',
                 start: '2019-01-01',
                 end: '2019-03-20',
                 progress: 80,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
                 // dependencies: '1'
             },
             {
                 id: '3',
                 name: '処方検討',
                 start: '2019-01-01',
                 end: '2019-01-31',
                 progress: 40,
                 belongsto: 2,
                 mode: 3,
                 dx_s: 0,
                 dx_e: 0,
                 // dependencies: '2'
             },
             {
                 id: '4',
                 name: '小項目1',
                 start: '2019-01-01',
                 end: '2019-01-08',
                 progress: 40,
                 belongsto: 3,
                 mode: 4,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '5',
                 name: '小項目2',
                 start: '2019-01-08',
                 end: '2019-01-31',
                 progress: 40,
                 belongsto: 3,
                 mode: 4,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '6',
                 name: '実使用アンケート(絶対評価)',
                 start: '2019-01-31',
                 end: '2019-02-20',
                 progress: 40,
                 belongsto: 2,
                 mode: 3,
                 dx_s: 0,
                 dx_e: 0,
                 dependencies: '3'
             },
             {
                 id: '7',
                 name: '商品の性能評価',
                 start: '2019-02-20',
                 end: '2019-03-20',
                 progress: 40,
                 belongsto: 2,
                 mode: 3,
                 dx_s: 0,
                 dx_e: 0,
                 dependencies: '6'
             },
             {
                 id: '8',
                 name: '容器',
                 start: '2019-03-20',
                 end: '2019-08-20',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '9',
                 name: '落下試験',
                 start: '2019-08-20',
                 end: '2019-11-01',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '10',
                 name: '落下試験2',
                 start: '2019-08-20',
                 end: '2019-10-05',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '11',
                 name: '落下試験2',
                 start: '2019-08-20',
                 end: '2019-10-05',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '12',
                 name: '落下試験2',
                 start: '2019-08-20',
                 end: '2019-10-05',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '13',
                 name: '落下試験2',
                 start: '2019-08-20',
                 end: '2019-10-05',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '14',
                 name: '落下試験2',
                 start: '2019-08-20',
                 end: '2019-10-05',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
             {
                 id: '15',
                 name: '落下試験2',
                 start: '2019-08-20',
                 end: '2019-12-01',
                 progress: 40,
                 belongsto: 1,
                 mode: 2,
                 dx_s: 0,
                 dx_e: 0,
             },
         ],
     },
     getters: {
         getDates (state) {
             return state.dates;
         },
         getGanttStart (state) {
             return state.gantt_start;
         },
         getGanttEnd (state) {
             return state.gantt_end;
         },
         getCountGanttDays (state) {
             return (state.gantt_end - state.gantt_start) / 86400000;
         },
         getTasks (state) {
             return state.tasks;
         },
         getViewMode (state) {
             return state.option.view_mode;
             // return state.view_mode;
         },
         getColWidth (state) {
             return state.option.column_width;
             // return state.column_width;
         },
         getStep (state) {
             return state.option.step;
             // return state.step;
         },
         getHeaderHeight (state) {
             return state.option.header_height;
             // return state.header_height;
         },
         getBarHeight (state) {
             return state.option.bar_height;
             // return state.bar_height;
         },
         getPadding (state) {
             return state.option.padding;
             // return state.padding;
         },
     },
     mutations: {
         createDates (state, dates_arr) {
             state.dates = dates_arr
         },
         setGanttStart (state, date) {
             state.gantt_start = date
         },
         setGanttEnd (state, date) {
             state.gantt_end = date
         },
         setTask (state, index, task) {
             state.tasks[index] = task
         },
         setViewMode (state, mode) {
             state.option.view_mode = mode;
             // state.view_mode = mode;
         },
         setColWidth (state, width) {
             state.option.column_width = width;
             // state.column_width = width;
         },
         setStep (state,step) {
             state.option.step = step;
             // state.step = step;
         },
     },
     actions: {

     }
 });

const app = new Vue({
    el: '#app',
    store,
    router,
    data: {
        id: "",
        name: "",
        user_type: 0,
    },
});
