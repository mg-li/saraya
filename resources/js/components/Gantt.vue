<template>
<div>
    <button class="btn btn-primary" @click="addRandomTask"> <i class="fas fa-plus"></i> 工程・作業追加</button>

    <button @click="demoViewMode('day')">Day</button>
    <button @click="demoViewMode('week')">Week</button>
    <button @click="demoViewMode('month')">Month</button>
    <button @click="demoViewMode('year')">Year</button>

    <Gantt
        :view-mode="mode"
        :tasks="tasks"
        @task-updated="debugEventLog.push($event)"
        @task-date-updated="debugEventLog.push($event)"
        @task-progress-change="debugEventLog.push($event)"
    />

    <!-- <div>
        <h5></h5>
        <ul>
            <li
                v-for="event in debugEventLog"
                :key="event.id">
                    {{ event }}
            </li>
        </ul>
    </div> -->

</div>
</template>

<script>
import Gantt from './common/frappe-gantt.vue';

export default {
    props: [
        //
    ],
    data () {
        return {
            mode: 'Month',
            tasks: [
                {
                    id: '1',
                    name: '案件名1',
                    start: '2019-01-01',
                    end: '2019-12-01',
                    progress: 10,
                    mode: 1,
                    sub_tasks: [
                        {
                            id: '1',
                            name: '処方',
                            start: '2019-01-01',
                            end: '2019-03-20',
                            progress: 40,
                            belongsto: 1,
                            sub_sub_tasks: [
                                {
                                    id: '1',
                                    name: '処方検討',
                                    start: '2019-01-01',
                                    end: '2019-01-31',
                                    progress: 40,
                                    belongsto: 1,
                                    sub_sub_sub_tasks: [
                                        {
                                            id: '1',
                                            name: '小項目1',
                                            start: '2019-01-01',
                                            end: '2019-01-05',
                                            progress: 40,
                                            belongsto: 1,
                                        },
                                        {
                                            id: '2',
                                            name: '小項目2',
                                            start: '2019-01-05',
                                            end: '2019-01-10',
                                            progress: 40,
                                            belongsto: 1,
                                        },
                                    ],
                                },
                                {
                                    id: '2',
                                    name: '実使用アンケート(絶対評価)',
                                    start: '2019-01-31',
                                    end: '2019-02-20',
                                    progress: 40,
                                    belongsto: 1,
                                },
                                {
                                    id: '3',
                                    name: '商品の性能評価',
                                    start: '2019-02-20',
                                    end: '2019-03-20',
                                    progress: 40,
                                    belongsto: 1,
                                }
                            ],
                            // dependencies: '3'
                        },
                        {
                            id: '2',
                            name: '容器',
                            start: '2019-03-20',
                            end: '2019-08-20',
                            progress: 40,
                            belongsto: 1,
                            // dependencies: '3'
                        },
                        {
                            id: '3',
                            name: '落下試験',
                            start: '2019-08-20',
                            end: '2019-12-01',
                            progress: 40,
                            belongsto: 1,
                            // dependencies: '3'
                        },
                    ]
                },
                {
                    id: '2',
                    name: '処方',
                    start: '2019-01-01',
                    end: '2019-03-20',
                    progress: 40,
                    belongsto: 1,
                    mode: 2,
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
                },
                {
                    id: '5',
                    name: '小項目2',
                    start: '2019-01-08',
                    end: '2019-01-31',
                    progress: 40,
                    belongsto: 3,
                    mode: 4,
                },
                {
                    id: '6',
                    name: '実使用アンケート(絶対評価)',
                    start: '2019-01-31',
                    end: '2019-02-20',
                    progress: 40,
                    belongsto: 2,
                    mode: 3,
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
                },
                {
                    id: '9',
                    name: '落下試験',
                    start: '2019-08-20',
                    end: '2019-12-01',
                    progress: 40,
                    belongsto: 1,
                    mode: 2,
                }
            ],
            debugEventLog: []
        }
    },
    mounted () {
        //
    },
    watch: {

    },
    computed: {
        //
    },
    methods: {
        addRandomTask () {
            this.tasks.push({
                id: this.tasks.length + 1,
                name: this.tasks.length + 1,
                start: '2019-01-01',
                end: '2019-01-05',
                progress: Math.random() * 100,
            });
        },
        demoViewMode (viewMode) {
            this.mode = viewMode;
        },
    },
    components: {
        Gantt
    },
}
</script>

<style lang="scss">
@import "resources/sass/variables";

</style>
