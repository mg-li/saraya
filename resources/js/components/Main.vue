<template>
<div>
    <div class="side-nav" v-if="isShowSideMenu">
        <div class="user-section">
            <!-- <a href=""><img class="circle" src="img/admin.png"> -->
            <p>{{$root.name}}</p>
            <!-- </a> -->
        </div>

        <div class="menu">
            <!-- <a :class="status_home" @click="get_content_area('home')"> <i class="icon ion-ios-home"></i> 看板</a> -->
            <a :class="{active:pid == 'adminHome'}" @click="get_content_area('adminHome')"> <i class="icon ion-ios-home"></i> 看板</a>
            <!-- <a :class="{active:pid == 'gantt'}" @click="get_content_area('gantt')"> <i class="icon ion-ios-calendar"></i> スケジュール1111</a> -->
            <a :class="{active:pid == 'gantt3'}" @click="get_content_area('gantt3')"> <i class="icon ion-ios-calendar"></i> スケジュール</a>
            <!-- <a :class="{active:pid == 'taskList'}" @click="get_content_area('taskList')"> <i class="icon ion-clipboard"></i> 工程・作業一覧</a> -->
            <a :class="{active:pid == 'setting'}" @click="get_content_area('setting')"><i class="icon ion-gear-b"></i> 設定</a>
            <a :class="{active:pid == 'logout'}" @click="get_content_area('logout')"><i class="icon ion-android-exit"></i> Logout</a>
        </div>

        <div class="line"><hr></div>
        <div class="footer">
        	<p>COPYRIGHT 2019 &copy; Mountain Gorilla</p>
        </div>
    </div>

    <div class="content-area" :class="{'hide-side-menu': !isShowSideMenu}">
        <div class="form-row">
            <div class="col-md-8 mb-2">
                <button class="btn btn-light d-inline-block ml-auto" type="button" @click="changeSideView()">
                    <i class="fa fa-chevron-right" v-if="!isShowSideMenu"></i>
                    <i class="fa fa-chevron-left" v-else></i>
                </button>
            </div>
            <div class="col-md-4 mb-2" v-if="pid != 'setting'">
                <v-select v-model="taskId" label="name" :options="$store.getters.getProjects" :reduce="name => name.id"><!--  -->
                    <div slot="no-options">検索結果ありません。</div>
                </v-select>
            </div>
        </div>

        <router-view />
    </div>


</div>
</template>

<script>
export default {
     props: [
        'id',
        'name',
        'user_type',
    ],
    data () {
        return {
            pid: 'adminHome',
            taskId: null,
            isShowSideMenu: true,
        }
    },
    created () {
        this.onLogin()
    },
    computed: {
        //
    },
    watch: {
        taskId () {
            if (!this.taskId) {
                this.$store.commit('setGanttMode', "p");
            }else{
                this.$store.commit('setGanttMode', "t");
                this.$store.commit('setSelectedPid', this.taskId);
            }
        }
    },
    methods: {
        onLogin: function () {
            this.$root.id = this.id;
            this.$root.name = this.name;
            this.$root.user_type = this.user_type;
            this.$router.push({ name: 'adminHome'});
        },
        get_content_area: function (pid) {
            this.pid = pid;
            if (pid == 'logout') {
                document.getElementById('logout-form').submit();
            }else{
                this.$router.push({ name: pid});
            }
        },
        changeSideView: function () {
            this.isShowSideMenu = !this.isShowSideMenu;
        },
    },
    components: {  },
}
</script>

<style lang="scss" scoped>
@import "resources/sass/variables";

</style>
<style lang="scss">
.vs__dropdown-toggle{
    background-color: #fff;
}
.hide-side-menu{
    margin-left: 0;
}
</style>
