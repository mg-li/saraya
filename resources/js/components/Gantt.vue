<template>
<div>
    <button class="btn btn-primary"> <i class="fas fa-plus"></i> 工程・作業追加</button>
    <gantt-elastic :tasks="tasks" :options="options">
        <gantt-header slot="header"></gantt-header>
        <gantt-footer slot="footer"></gantt-footer>
    </gantt-elastic>

</div>
</template>

<script>
function getDate(hours) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const timeStamp = new Date(currentYear, currentMonth, currentDay, 0, 0, 0).getTime();
    return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}
let tasks = [
    {
        id: 1,
        label: "NEW　プロジェクト",
        user:
          '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">李</a>',
        start: getDate(-24 * 5),
        duration: 15 * 24 * 60 * 60 * 1000,
        percent: 85,
        type: "project",
        collapsed: true,
    },
    {
        id: 2,
        label: "画面設計",
        parentId: 1,
        user:
          '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">李</a>',
        start: getDate(-24 * 5),
        duration: 15 * 24 * 60 * 60 * 1000,
        percent: 85,
        type: "project",
        collapsed: true,
    },
    {
        id: 3,
        label: "ガントチャート画面設計",
        user:
          '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">李</a>',
        parentId: 2,
        start: getDate(-24 * 4),
        duration: 4 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "milestone",
        collapsed: true,
        style: {
          base: {
            fill: "#1EBC61",
            stroke: "#0EAC51"
          }
        }
    },
    {
        id: 4,
        label: "DB設計",
        parentId: 1,
        user:
          '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">李</a>',
        start: getDate(24 * 2),
        duration: 4 * 24 * 60 * 60 * 1000,
        percent: 0,
        // dependentOn: [2],
        type: "project",
        collapsed: true,
    },
    {
        id: 5,
        label: "ER図設計",
        user:
          '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">李</a>',
        parentId: 4,
        start: getDate(24 * 3),
        duration: 3 * 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task",
        collapsed: true,
        style: {
          base: {
            fill: 'rgb(2, 135, 208)',
            stroke: 'rgb(0, 119, 192)'
          }
        }
    },
];

import GanttElastic from './gantt-elastic/src/GanttElastic.vue';
import Header from "./gantt-elastic-header/src/Header.vue";
// import GanttElastic from 'gantt-elastic';
import dayjs from "dayjs";
export default {
    props: [
        //
    ],
    data () {
        return {
            tasks,
            options: {
                taskMapping: {
                    progress: "percent"
                },
                maxRows: 100,
                maxHeight: 500,
                title: {
                    label: "New プロジェクト",
                    html: false
                },
                row: {
                    height: 24
                },
                calendar: {
                    hour: {
                        display: false
                    }
                },
                chart: {
                    progress: {
                        bar: false
                    },
                    expander: {
                        display: true
                    }
                },
                taskList: {
                    expander: {
                        straight: false
                    },
                    columns: [
                        /*
                        {
                            id: 1,
                            label: "ID",
                            value: "id",
                            width: 40
                        },
                        */
                        {
                            id: 2,
                            label: "工程・作業",
                            value: "label",
                            width: 200,
                            expander: true,
                            html: true,
                            events: {
                                click({ data, column }) {
                                    alert("description clicked!\n" + data.label);
                                }
                            }
                        },
                        /*
                        {
                            id: 3,
                            label: "担当者",
                            value: "user",
                            width: 80,
                            html: true
                        },
                        */
                        {
                            id: 3,
                            label: "期間",
                            value: task => dayjs(task.start).format("YYYY-MM-DD") + "～ " + dayjs(task.start + task.duration).format("YYYY-MM-DD"),
                            width: 200
                        },
                        // {
                        //     id: 4,
                        //     label: "種類",
                        //     value: "type",
                        //     width: 68
                        // },
                        // {
                        //     id: 5,
                        //     label: "%",
                        //     value: "progress",
                        //     width: 35,
                        //     style: {
                        //         "task-list-header-label": {
                        //             "text-align": "center",
                        //             width: "100%"
                        //         },
                        //         "task-list-item-value-container": {
                        //             "text-align": "center",
                        //             width: "100%"
                        //         }
                        //     }
                        // }
                    ]
                },
                locale: {
                    name: "ja",
                    Now: "今日",
                    "Before/After": "時間軸",
                    "Display task list": "タスク表示"
                }
            },
            dynamicStyle: {},
        }
    },
    mounted () {
        //
    },
    watch: {
        //
    },
    computed: {
        //
    },
    methods: {
    },
    components: {
        ganttHeader: Header, // or Header
        ganttElastic: GanttElastic,
        ganttFooter: {template:`<span></span>`},
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
@import "resources/sass/variables";

</style>
