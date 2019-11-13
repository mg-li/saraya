<template>
    <div class="gantt-container">
        <GanttHeader></GanttHeader>
        <!-- GanttHeaderからdatesとgantt_startを作るのを待つ -->
        <div class="gantt-body" v-if="dates.length > 0 && gantt_start" @scroll="onScroll">
            <div class="gantt-body-wrapper">
                <svg class="gantt" :width="row_width" :height="row_height * tasks.length" @mousemove="resizing($event)" @mouseup="onMouseup()">
                    <g class="grid">
                        <!-- タスク背景 行 -->
                        <g>
                            <template v-for="(task, index) in tasks">
                                <rect x="0" :y="($store.getters.getBarHeight + $store.getters.getPadding) * index" :width="row_width" :height="row_height" class="grid-row"></rect>
                                <line x1="0" :y1="row_height + ($store.getters.getBarHeight + $store.getters.getPadding) * index"
                                      :x2="row_width" :y2="row_height + ($store.getters.getBarHeight + $store.getters.getPadding) * index"
                                      class="row-line"></line>
                            </template>
                        </g>
                        <!-- タスク背景 列線 -->
                        <path :d="createPath(date, index2)" v-for="(date, index2) in dates" class="tick" :class="{'thick' : isThick(date)}"></path>
                    </g>
                    <g class="bar">
                        <g class="bar-wrapper" v-for="(task, index3) in tasks">
                            <g class="bar-group"><!-- @mousemove="resizing($event)" -->
                                <!-- タスクバー -->
                                <rect :x="compute_x(task)" :y="compute_y(task, index3)"
                                      :width="compute_width(task)" :height="$store.getters.getBarHeight"
                                      rx="3" ry="3" class="bar" @mousedown="onMousedown($event,'',index3)">
                                      <animate attributeName="width" from="0" :to="compute_width(task)" dur="0.4s" begin="0.1s" calcMode="spline" :values="'0;'+compute_width(task)" keyTimes="0; 1" keySplines="0 0 .58 1"></animate>
                                </rect>
                                <!-- タスク　プログレスバー -->
                                <rect v-if="task.mode != 1" :x="compute_x(task)" :y="compute_y(task, index3)"
                                      :width="compute_progress_width(task)" :height="$store.getters.getBarHeight"
                                      rx="3" ry="3" class="bar-progress" @mousedown="onMousedown($event,'',index3)">
                                      <animate attributeName="width" from="0" :to="compute_progress_width(task)" dur="0.4s" begin="0.1s" calcMode="spline" :values="'0;'+compute_progress_width(task)" keyTimes="0; 1" keySplines="0 0 .58 1"></animate>
                                </rect>
                                <text :x="compute_x(task) + compute_width(task) + 5" :y="compute_y(task, index3) + $store.getters.getBarHeight / 2" class="bar-label big">{{task.name}}</text>
                            </g>
                            <g class="handle-group" v-if="task.mode != 1">
                                <rect :x="compute_x(task) - 1" :y="compute_y(task, index3) - 1"
                                      width="5" :height="$store.getters.getBarHeight + 2"
                                      rx="1" ry="1" class="handle left" @mousedown="onMousedown($event,'left',index3)">
                                </rect>
                                <rect :x="compute_x(task) + compute_width(task) - 4" :y="compute_y(task, index3) - 1"
                                      width="5" :height="$store.getters.getBarHeight + 2"
                                      rx="1" ry="1" class="handle right" @mousedown="onMousedown($event,'right',index3)">
                                </rect>
                                <polygon :points="createPolygonPoints(task, index3).join(',')" @mousedown="onMousedown($event,'polygon',index3)" class="polygon progress"></polygon>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <div class="task-popup" v-if="resizing_task_index" :style="style">
            {{tasks[resizing_task_index].name}}<br>
            開始： {{tasks[resizing_task_index].start}}<br>
            終了： {{tasks[resizing_task_index].end}}
        </div>
    </div>
</template>

<script lang="">
    import GanttHeader from './gantt_header.vue';
    export default {
        // Options / Data
        data () {
            return {
                row_height: this.$store.getters.getBarHeight + this.$store.getters.getPadding,
                is_resizing_left: false,
                is_resizing_right: false,
                is_resizing_polygon: false,
                is_dragging: false,
                x_on_start: 0,
                tasks: [],
                resizing_task_index: '',
                style: '',
            }
        },
        props: [],
        computed: {
            gantt_start () {
                return this.$store.getters.getGanttStart;
            },
            dates () {
                return this.$store.getters.getDates;
            },
            row_width () {
                return this.$store.getters.getCountGanttDays * this.$store.getters.getColWidth;
            },
            column_width () {
                return this.$store.getters.getColWidth;
            },
        },
        methods: {
            getDate: function() {
                this.tick_x = 0;
                this.tasks = this.$store.getters.getTasks.slice();
            },
            createPath: function (date, index) {
                // console.log(date +' : '+this.$store.getters.getGanttStart + ' : '+ this.getThroughDays(this.$store.getters.getGanttStart, date))
                var through_days = this.getThroughDays(this.$store.getters.getGanttStart, date);
                var tick_x = this.column_width * through_days;
                var tick_height = (this.$store.getters.getBarHeight + this.$store.getters.getPadding) * this.tasks.length;
                return `M ${tick_x} 0 v ${tick_height}`;
            },
            createPolygonPoints: function (task, index) {
                return [
                    this.compute_progress_width(task) + this.compute_x(task) - 5,
                    this.compute_y(task, index) + this.$store.getters.getBarHeight,
                    this.compute_progress_width(task) + this.compute_x(task) + 5,
                    this.compute_y(task, index) + this.$store.getters.getBarHeight,
                    this.compute_progress_width(task) + this.compute_x(task),
                    this.compute_y(task, index) + this.$store.getters.getBarHeight - 8.66
                ];
            },
            getThroughDays: function(start, end) {
                return Math.ceil((end - start) / 86400000);
            },
            //縦太線
            isThick: function (date) {
                if (this.$store.getters.getViewMode == 'day' && date.getDate() === 1) {
                    return true;
                }
                //第一週目
                if (this.$store.getters.getViewMode == 'week' && date.getDate() === 1) {
                    return true;
                }
                //第一月目
                if (this.$store.getters.getViewMode == 'month' && (date.getMonth() + 1)  === 1) {
                    return true;
                }
                //年
                if (this.$store.getters.getViewMode == 'year' && (date.getMonth() + 1)  === 1 && date.getDate() === 1) {
                    return true;
                }
                return false;
            },
            compute_x: function (task) {
                return this.getThroughDays(this.gantt_start, new Date(task.start)) * this.column_width + task.dx_s;
            },
            compute_y: function (task, index) {
                return (
                    this.$store.getters.getPadding / 2 + index * (this.$store.getters.getBarHeight + this.$store.getters.getPadding)
                )
            },
            compute_width: function (task) {
                return this.getThroughDays(new Date(task.start), new Date(task.end)) * this.column_width - task.dx_s + task.dx_e;
            },
            compute_progress_width: function (task) {
                return (this.getThroughDays(new Date(task.start), new Date(task.end)) * this.column_width - task.dx_s + task.dx_e) * (task.progress / 100) || 0;
            },
            onMousedown: function (e,side,index) {
                this.style = `left: ${e.offsetX}px; top: ${this.row_height * index - 2}px;`;
                this.resizing_task_index = index;
                this.x_on_start = e.offsetX;
                if (side == 'left') {
                    this.is_resizing_left = true;
                }else if (side == 'right') {
                    this.is_resizing_right = true;
                }else if (side == 'polygon') {
                    this.is_resizing_polygon = true;
                }else{
                    this.is_dragging = true;
                }
            },
            onMouseup: function () {
                if (this.resizing_task_index != 0) {
                    var finaldx = 0;
                    if (this.is_resizing_left) {
                        finaldx = this.get_finaldx(this.tasks[this.resizing_task_index].dx_s);
                        var task_start = new Date(this.tasks[this.resizing_task_index].start);
                        var temp_date = new Date(task_start.setDate(task_start.getDate() + finaldx));
                        this.tasks[this.resizing_task_index].start = this.setDateFormat(temp_date);
                        this.tasks[this.resizing_task_index].dx_s = 0;
                    }

                    if (this.is_resizing_right) {
                        finaldx = this.get_finaldx(this.tasks[this.resizing_task_index].dx_e);
                        var task_end = new Date(this.tasks[this.resizing_task_index].end);
                        var temp_date = new Date(task_end.setDate(task_end.getDate() + finaldx));
                        this.tasks[this.resizing_task_index].end = this.setDateFormat(temp_date);
                        this.tasks[this.resizing_task_index].dx_e = 0;
                    }

                    if (this.is_dragging) {
                        var finaldx_s = this.get_finaldx(this.tasks[this.resizing_task_index].dx_s);
                        var finaldx_e = this.get_finaldx(this.tasks[this.resizing_task_index].dx_e);
                        var task_start = new Date(this.tasks[this.resizing_task_index].start);
                        var task_end = new Date(this.tasks[this.resizing_task_index].end);
                        var temp_date_s = new Date(task_start.setDate(task_start.getDate() + finaldx_s));
                        var temp_date_e = new Date(task_end.setDate(task_end.getDate() + finaldx_e));
                        this.tasks[this.resizing_task_index].start = this.setDateFormat(temp_date_s);
                        this.tasks[this.resizing_task_index].end = this.setDateFormat(temp_date_e);
                        this.tasks[this.resizing_task_index].dx_s = 0;
                        this.tasks[this.resizing_task_index].dx_e = 0;
                    }
                    this.resizing_task_index = 0;
                }
                this.is_resizing_left = false;
                this.is_resizing_right = false;
                this.is_resizing_polygon = false;
                this.is_dragging = false;
            },
            resizing: function (e) {
                this.style = `left: ${e.offsetX}px; top: ${this.row_height * this.resizing_task_index - 2}px;`;
                var dx = e.offsetX - this.x_on_start;
                if (this.is_resizing_left) {
                    this.tasks[this.resizing_task_index].dx_s = dx;
                }
                if (this.is_resizing_right) {
                    this.tasks[this.resizing_task_index].dx_e = dx;
                }
                if (this.is_resizing_polygon) {
                    var width = this.compute_width(this.tasks[this.resizing_task_index]);
                    var progress_width = this.compute_progress_width(this.tasks[this.resizing_task_index]);
                    if (dx < -progress_width) {
                        dx = -progress_width;
                    }
                    if (dx + progress_width > width) {
                        dx = width - progress_width;
                    }
                    this.tasks[this.resizing_task_index].progress = this.tasks[this.resizing_task_index].progress + dx * 100 / width;
                    this.x_on_start = e.offsetX;
                }
                if (this.is_dragging) {
                    this.tasks[this.resizing_task_index].dx_s = dx;
                    this.tasks[this.resizing_task_index].dx_e = dx;
                }
            },
            get_finaldx: function (dx) {
                return Math.floor(dx / this.column_width);
            },
            setDateFormat: function (date) {
                var year = date.getFullYear();
                var month = ("00" + (date.getMonth() + 1)).slice(-2);
                var day = ("00" + date.getDate()).slice(-2);
                return year + '-' + month + '-' + day;
            },
            onScroll: function (e) {
                document.getElementById('hearder-svg-wrapper').scrollLeft = e.target.scrollLeft;
                if (document.getElementById('title-body')) {
                    document.getElementById('title-body').scrollTop = e.target.scrollTop;
                }

            },
        },
        // watch: {},
        // Options / DOM
        // el () {},
        // replace: true,
        // template: '',
        // Options / Lifecycle Hooks
        // init () {},
        created () {

        },
        mounted () {
            this.getDate();
        },
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
        components: {
            GanttHeader
        },
        // transitions: {},
        // partials: {},
        // Options / Misc
        // parent: null,
        // events: {},
        // mixins: [],
        // name: ''
    }
</script>
<style lang="scss">
@import "./frappe-gantt/dist/frappe-gantt.css";
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
