<template>
    <div>

        <div style="display:flex;margin-top: 50px;">
            <div style="min-width:315px;max-width: 315px;witdh:99%;overflow-y:hidden;overflow-x:hidden;max-height:570px;">
                <table class="table table-striped table-hover table-bordered gantt-table" >
                    <thead>
                        <tr style="height:50px;">
                            <th style="max-width:310px;min-width:310px;border-bottom: none;">工程・作業</th>
                        </tr>
                    </thead>
                    <tbody id="gantt-table">
                        <tr v-for="(task,index) in tasks">
                            <td style="max-width:310px;min-width:310px;">
                                <template v-for="n in task.mode" v-if="n != 1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
                                {{task.name}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <svg ref="gantt"/>
        </div>
        <template v-for="(task,index) in tasks">
            <div class="task-popup" :style="style" v-if="clicked_task_id == task.id" @click="hid_popup()">
                {{task.name}}<br>
                開始： {{task.start}}<br>
                終了： {{task.end}}
            </div>
        </template>

    </div>
</template>

<script>
import Gantt from './frappe-gantt/src/index.js';
// import './frappe-gantt/dist/frappe-gantt.min.js';
export default {
    name: 'FrappeGantt',
    props: {
        viewMode: {
            type: String,
            required: false,
            default: 'Month'
        },
        tasks: {
            type: Array,
            required: true,
            default: []
        }
    },
    data () {
        return {
            gantt: {},
            style: "display:block;",
            clicked_task_id: '',
        };
    },
    watch: {
        viewMode () {
            this.updateViewMode();
        },

        tasks () {
            this.updateTasks();
        },
    },
    mounted () {
        this.setupGanttChart();
    },
    methods: {
        setupGanttChart () {
            this.gantt = new Gantt(this.$refs.gantt, this.tasks, {
                on_click: task => {
                    this.show_task_popup(event,task);
                    this.$emit('task-updated', task);
                },

                on_date_change: (task, start, end) => {
                    this.$emit('task-date-updated', { task, start, end });
                },

                on_progress_change: (task, progress) => {
                    this.$emit('task-progress-updated', { task, progress });
                },

                //I doubt you will ever need this as the developer already knows what view mode they set.
                on_view_change: (mode) => {
                    this.$emit('view-mode-updated', mode);
                },
                on_scroll_change: (x,y) => {
                    this.scrollGanttTable(x,y);
                },
                language: 'ja',//定義src/date_utils.js
            });

            this.updateTasks();
            this.updateViewMode();
        },

        updateViewMode () {
            // console.log(this.viewMode[0].toUpperCase() + this.viewMode.substring(1))
            this.gantt.change_view_mode(this.viewMode[0].toUpperCase() + this.viewMode.substring(1));
        },

        updateTasks () {
            this.gantt.refresh(this.tasks);
        },
        scrollGanttTable: function (x,y) {
            document.getElementById('hearder-svg-wrapper').scrollLeft = x;
            document.getElementById('gantt-table').scrollTop = y;

            // console.log(x);
        },
        show_task_popup (event,task) {
            // console.log(task);
            this.clicked_task_id = task.id;
            this.style = "display:block;left:" + event.clientX + "px;top:" + event.clientY + "px;";
            console.log(this.style);
        },
        hid_popup () {
            this.style = "display:none;";
        },
    }
};
</script>

<style lang="scss">
@import "./frappe-gantt/dist/frappe-gantt.css";
body{
    overflow-y: hidden;
}
.gantt-table > thead:after {
	content: "";
	height: 8.5px;
	width: 100%;
	padding: 2px 0;
	display: block;
    border-bottom-style: solid;
    border-bottom-width: 0.1px;
    border-bottom-color: #dee2e6;
}
.gantt-table > thead, .gantt-table > tbody {
  display: block;
}
.gantt-table > tbody {
    overflow-x: hidden;
    overflow-y: hidden;
    max-height:495px;
}
.gantt-table > th, .gantt-table > td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
table.table-hover tbody tr td:hover {
    background-color: #c7c3c3;
}
.table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
   background-color: white;
}
.task-popup{
    background: #0d344f;
    color: #fff;
    border-radius: 2px;
    padding: 10px;
    position: absolute;
    z-index: 50;
    -webkit-box-shadow: 3px 3px 3px rgba(0,0,0,.07);
    box-shadow: 3px 3px 3px rgba(0,0,0,.07);
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 1;
    border-left: 1px solid rgba(0,0,0,.07);
    border-top: 1px solid rgba(0,0,0,.07);
    font-family: Arial;
    font-size: 8pt;
    color: #dfe2e5;
}
</style>
