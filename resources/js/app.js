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
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';
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
        { name: 'taskList', path: '/taskList', component: require('./components/TaskList.vue').default },
        //ガントチャート
        { name: 'gantt', path: '/gantt', component: require('./components/Gantt.vue').default },
        // { name: 'gantt2', path: '/gantt2', component: require('./components/Gantt2.vue').default },
        { name: 'gantt3', path: '/gantt3', component: require('./components/Gantt3.vue').default },
        { name: 'setting', path: '/setting', component: require('./components/Setting.vue').default },
        // { name: 'department', path: '/department', component: require('./components/Department.vue').default },
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
         gantt_mode: 'p',
         option: {
             step: 24,
             header_height: 60,
             column_width: 10, //一日
             view_mode: 'month',
             bar_height: 25,
             padding: 18,
         },
         selected_pId: '',
         projects: [
             {
                 id: '1',
                 name: '案件名1',
                 start: '2019-01-01',
                 end: '2019-12-01',
                 dx_s: 0,
                 dx_e: 0,
                 tasks: [
                     {
                         id: '1',
                         name: '処方',
                         start: '2019-01-01',
                         end: '2019-03-20',
                         progress: 80,
                         project_id: 1,
                         belongsto: '',
                         mode: 1,
                         dx_s: 0,
                         dx_e: 0,
                         status: 0,
                         // dependencies: '1'
                     },
                     {
                         id: '2',
                         name: '処方検討',
                         start: '2019-01-01',
                         end: '2019-01-31',
                         progress: 40,
                         project_id: '',
                         belongsto: 1,
                         mode: 2,
                         dx_s: 0,
                         dx_e: 0,
                         status: 0,
                         // dependencies: '2'
                     },
                     {
                         id: '3',
                         name: '小項目1',
                         start: '2019-01-01',
                         end: '2019-01-08',
                         progress: 40,
                         project_id: '',
                         belongsto: 2,
                         mode: 3,
                         dx_s: 0,
                         dx_e: 0,
                         status: 3,
                     },
                     {
                         id: '4',
                         name: '小項目2',
                         start: '2019-01-08',
                         end: '2019-01-31',
                         progress: 40,
                         project_id: '',
                         belongsto: 2,
                         mode: 3,
                         dx_s: 0,
                         dx_e: 0,
                         status: 1,
                     },
                     {
                         id: '5',
                         name: '実使用アンケート(絶対評価)',
                         start: '2019-01-31',
                         end: '2019-02-20',
                         progress: 40,
                         project_id: '',
                         belongsto: 1,
                         mode: 2,
                         dx_s: 0,
                         dx_e: 0,
                         dependencies: '3',
                         status: 0,
                     },
                     {
                         id: '6',
                         name: '商品の性能評価',
                         start: '2019-02-20',
                         end: '2019-03-20',
                         progress: 40,
                         project_id: '',
                         belongsto: 1,
                         mode: 2,
                         dx_s: 0,
                         dx_e: 0,
                         dependencies: '6',
                         status: 0,
                     },
                     {
                         id: '7',
                         name: '容器',
                         start: '2019-03-20',
                         end: '2019-08-20',
                         progress: 40,
                         project_id: 1,
                         belongsto: '',
                         mode: 1,
                         dx_s: 0,
                         dx_e: 0,
                         status: 0,
                     },
                     {
                         id: '8',
                         name: '落下試験',
                         start: '2019-08-20',
                         end: '2019-11-01',
                         progress: 40,
                         project_id: 1,
                         belongsto: '',
                         mode: 1,
                         dx_s: 0,
                         dx_e: 0,
                         status: 0,
                     },
                     {
                         id: '9',
                         name: '中項目3',
                         start: '2019-08-20',
                         end: '2019-09-20',
                         progress: 40,
                         project_id: '',
                         belongsto: 8,
                         mode: 2,
                         dx_s: 0,
                         dx_e: 0,
                         status: 1,
                     },
                     {
                         id: '10',
                         name: '小項目4',
                         start: '2019-09-20',
                         end: '2019-11-01',
                         progress: 40,
                         project_id: '',
                         belongsto: 9,
                         mode: 3,
                         dx_s: 0,
                         dx_e: 0,
                         status: 2,
                     },
                     {
                         id: '11',
                         name: '小項目4',
                         start: '2019-09-20',
                         end: '2019-11-01',
                         progress: 40,
                         project_id: '',
                         belongsto: 9,
                         mode: 3,
                         dx_s: 0,
                         dx_e: 0,
                         status: 2,
                     },
                     {
                         id: '12',
                         name: '小項目4',
                         start: '2019-09-20',
                         end: '2019-11-01',
                         progress: 40,
                         project_id: '',
                         belongsto: 9,
                         mode: 3,
                         dx_s: 0,
                         dx_e: 0,
                         status: 2,
                     },
                     {
                         id: '13',
                         name: '小項目4',
                         start: '2019-09-20',
                         end: '2019-11-01',
                         progress: 40,
                         project_id: '',
                         belongsto: 9,
                         mode: 3,
                         dx_s: 0,
                         dx_e: 0,
                         status: 2,
                     },
                 ],
             },
             {
                 id: '2',
                 name: '案件名2',
                 start: '2019-04-01',
                 end: '2020-06-01',
                 dx_s: 0,
                 dx_e: 0,
                 tasks: [
                     {
                         id: '14',
                         name: '大項目4',
                         start: '2019-04-20',
                         end: '2019-11-01',
                         progress: 40,
                         project_id: 2,
                         belongsto: '',
                         mode: 1,
                         dx_s: 0,
                         dx_e: 0,
                         status: 0,
                     },
                 ],
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
             if (state.gantt_mode == "t") {
                 var project = state.projects.filter((obj)=>{
                     return obj.id == state.selected_pId;
                 })[0];
                 return project.tasks;
             }else{
                 return state.projects;
             }
         },
         getProjects (state) {
             return state.projects;
         },
         getTaskByMode1 (state) {
             var project = state.projects.filter((obj)=>{
                 return obj.id == state.selected_pId;
             })[0];
             return project.tasks.filter((obj)=>{
                 return obj.mode == 1;
             })
         },
         getTasksByPId (state) {
             return id => state.projects.filter((obj)=>{
                 return obj.id == id;
             })[0]['tasks'];
         },
         getTasksByStatus (state) {
             var project = state.projects.filter((obj)=>{
                 return obj.id == state.selected_pId;
             })[0];
             return status => project.tasks.filter((obj)=>{
                 return obj.status == status;
             })
         },
         getGanttMode (state) {
             return state.gantt_mode ;
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
         setTask (state, obj) {
             // state.tasks[obj.index] = obj.task
             state.tasks.splice(obj.index, 1, obj.task);
         },
         setGanttMode (state, mode) {
             state.gantt_mode = mode;
         },
         setSelectedPid (state, id) {
             state.selected_pId = id;
         },
         setTaskdx_s (state, obj) {
             state.tasks[obj.index].dx_s = obj.dx
         },
         setTaskdx_e (state, obj) {
             state.tasks[obj.index].dx_e = obj.dx
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
