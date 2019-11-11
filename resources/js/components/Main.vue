<template>
<div>
    <multiselect v-model="value" :options="options" track-by="name" label="name"></multiselect>
    <div class="side-nav">
        <div class="user-section">
            <!-- <a href=""><img class="circle" src="img/admin.png"> -->
            <p>{{$root.name}}</p>
            <!-- </a> -->
        </div>

        <div class="menu">
            <!-- <a :class="status_home" @click="get_content_area('home')"> <i class="icon ion-ios-home"></i> 看板</a> -->
            <a :class="status_gantt" @click="get_content_area('gantt')"> <i class="icon ion-ios-calendar"></i> スケジュールテスト</a>
            <!-- <a :class="status_gantt2" @click="get_content_area('gantt2')"> <i class="icon ion-ios-calendar"></i> スケジュール2</a> -->
            <a :class="status_gantt3" @click="get_content_area('gantt3')"> <i class="icon ion-ios-calendar"></i> スケジュール</a>
            <a :class="status_ticket" @click="get_content_area('ticket')"> <i class="icon ion-clipboard"></i> 工程・作業一覧</a>
            <a :class="status_setting" @click="get_content_area('setting')"><i class="icon ion-gear-b"></i> 設定</a>
            <a :class="status_logout" @click="get_content_area('logout')"><i class="icon ion-android-exit"></i> Logout</a>
        </div>

        <div class="line"><hr></div>
        <div class="footer">
        	<p>COPYRIGHT 2019 &copy; Mountain Gorilla</p>
        </div>
    </div>

    <div class="content-area">
        <router-view />
    </div>


</div>
</template>

<script>
import Multiselect from 'vue-multiselect';
Vue.component('multiselect', Multiselect);
export default {
     props: [
        'id',
        'name',
        'user_type',
    ],
    data () {
        return {
            status_home: "active",
            status_ticket: "",
            status_gantt: "",
            status_gantt2: "",
            status_gantt3: "",
            status_logout: "",
            status_chat: "",
            status_setting: "",
            value: {
                name: 'プロジェクトを検索...', id: 0
            },
            options: [
                { name: 'すべてのプロジェクト', id: 1 },
                { name: 'New プロジェクト', id: 2 },
            ],
        }
    },
    created () {
        this.onLogin()
    },
    computed: {
        //
    },
    methods: {
        onLogin: function () {
            this.$root.id = this.id;
            this.$root.name = this.name;
            this.$root.user_type = this.user_type;
            this.$router.push({ name: 'adminHome'});
        },
        get_content_area: function (pid) {
            this.status_home = "";
            this.status_ticket = "";
            this.status_gantt = "";
            this.status_gantt2 = "";
            this.status_gantt3 = "";
            this.status_logout = "";
            this.status_chat = "";
            this.status_setting = "";
            switch( pid ) {
                case 'home':
                    this.status_home = "active";
                    this.$router.push({ name: 'adminHome'});
                    break;
                case 'ticket':
                    this.status_ticket = "active";
                    this.$router.push({ name: 'ticket'});
                    break;
                case 'gantt':
                    this.status_gantt = "active";
                    this.$router.push({ name: 'gantt'});
                    break;
                case 'gantt3':
                    this.status_gantt3 = "active";
                    this.$router.push({ name: 'gantt3'});
                    break;
                case 'gantt2':
                    this.status_gantt2 = "active";
                    this.$router.push({ name: 'gantt2'});
                    break;
                case 'setting':
                    this.status_setting = "active";
                    this.$router.push({ name: 'setting'});
                    break;
                case 'logout':
                    this.status_logout = "active";
                    document.getElementById('logout-form').submit();
                    break;
            }

        },
    },
    components: { Multiselect },
}
</script>

<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->

<style lang="scss" scoped>
@import "resources/sass/variables";

</style>
