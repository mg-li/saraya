<template>
    <div>
        <div class="card" v-if="mode == 1">
            <div class="card-body">
                <div class="d-flex justify-content-start">
                    <div class="ml-auto">
                        <button class="btn btn-primary"> <i class="fas fa-plus"></i> 案件追加</button>
                    </div>
                </div>

                <div class="row" style="margin-top: 20px;">
                    <div class="col-12">
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr class="bg-info text-white">
                                    <th>案件番号</th>
                                    <th>案件名</th>
                                    <th>区分</th>
                                    <th>担当者</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(project, index) in projects" @click="showTaskList(project.id)">
                                    <td>{{project.id}}</td>
                                    <td>{{project.name}}</td>
                                    <td>商品開発</td>
                                    <td>Aさん</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <TaskList v-else :tasks="tasks" @close="mode = 1"></TaskList>
    </div>

</template>
<script lang="">
import TaskList from './TaskList.vue';
    export default {
        // Options / Data
        data () {
            return {
                projects: this.$store.getters.getProjects,
                mode: 1,
                tasks: []
            }
        },
        props: [],
        computed: {},
        methods: {
            showTaskList: function (id) {
                this.tasks = this.$store.getters.getTasksByPId(id);
                this.mode = 2;
            }
        },
        // watch: {},
        // Options / DOM
        // el () {},
        // replace: true,
        // template: '',
        // Options / Lifecycle Hooks
        // init () {},
        // crated () {},
        // beforeCompile () {},
        // compiled () {},
        // ready () {},
        // attached () {},
        // detached () {},
        // beforeDestroy () {},
        // destroyed () {},
        // Options / Assets
        // directives: {},
        // elementDirectives: {},
        // filters: {},
        components: {TaskList},
        // transitions: {},
        // partials: {},
        // Options / Misc
        // parent: null,
        // events: {},
        // mixins: [],
        // name: ''
    }
</script>
