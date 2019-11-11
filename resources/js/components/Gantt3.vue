<template>
<div>
    <div class="row" style="margin-right:0;margin-left:0;">
        <div class="form-group">
            <div class="input-group" id="datetimepicker1">
                <Datepicker input-class="form-control" @change="changeDate()" v-model="gantt_start" :value="gantt_start" :format="DatePickerFormat" :language="ja"></Datepicker>
                <span class="input-group-append">
                    <button class="btn btn-primary" style="box-shadow:none;"><i class="fa fa-calendar"></i></button>
                </span>
            </div>
        </div>
        <div style="width: 25px;"><span class="badge" style="padding: 0.25em 0.8em;margin-top: 12px;">~</span></div>
        <div class="form-group">
            <div class="input-group date" id="datetimepicker1">
                <Datepicker input-class="form-control" @change="changeDate()" v-model="gantt_end" :value="gantt_end" :format="DatePickerFormat" :language="ja"></Datepicker>
                <span class="input-group-append">
                    <button class="btn btn-primary" style="box-shadow:none;"><i class="fa fa-calendar"></i></button>
                </span>
            </div>
        </div>
    </div>
    <div style="display:flex;">
        <div style="width: 315px;">
            <input type="range" class="form-control-range" id="formControlRange" min="0" max="315" v-model="title_range" step="1">
        </div>
        <div style="width: 100px;margin-left: 20px;">
            <button class="btn btn-primary" @click="option.view_mode = 'day'">日</button>
        </div>
        <div style="width: 100px;margin-left: 20px;">
            <button class="btn btn-primary" @click="option.view_mode = 'month'">月</button>
        </div>
        <div style="width: 100px;margin-left: 20px;">
            <button class="btn btn-primary" @click="option.view_mode = 'year'">年</button>
        </div>
    </div>

    <!-- <i class="fas fa-plus"></i> -->
    <div style="display:flex;margin-top: 5px;">
        <div>
            <div class="title-svg-wrapper">
                <svg :width="title_range" :height="option.header_height">
                    <g class="project">
                        <rect x="0" y="0" :width="title_range" :height="option.header_height" class="grid-header"></rect>
                        <text :x="10" :y="option.header_height / 2" class="title-text">工程・作業</text>
                    </g>
                </svg>
            </div>
            <div class="title-body" id="title-body" style="overflow-y:hidden;overflow-x:hidden;max-height:520px;">
                <div class="title-body-wrapper">
                    <svg :width="title_range" :height="(option.bar_height + option.padding) * $store.getters.getTasks.length">
                        <g class="grid">
                            <!-- タスク背景 行 -->
                            <g>
                                <template v-for="(task, index) in $store.getters.getTasks">
                                    <rect x="0" :y="(option.bar_height + option.padding) * index" :width="title_range" :height="option.bar_height + option.padding" class="title-row"></rect>
                                    <text :x="10" :y="(option.bar_height + option.padding) * index + 25" class="title-text">{{task.name}}</text>
                                </template>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <Gantt :option="option" />
    </div>



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
import Gantt from './common/gantt.vue';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale';
export default {
    props: [
        //
    ],
    data () {
        return {
            option: {
                step: 24,
                header_height: 60,
                column_width: 40, //一日
                view_mode: 'month',
                bar_height: 25,
                padding: 18,
                bar_corner_radius: 3,
            },
            title_range: 315,
            // from: ,
            // to: ,
            ja: ja,
            DatePickerFormat: 'yyyy-MM-dd',
            gantt_start: new Date(),
            gantt_end: new Date(),
            debugEventLog: []
        }
    },
    created () {
        if (this.option.view_mode === 'day') {
            this.option.step = 24;
            this.option.column_width = 40;
        } else if (this.option.view_mode === 'Half Day') {
            this.option.step = 24 / 2;
            this.option.column_width = 38;
        } else if (this.option.view_mode === 'Quarter Day') {
            this.option.step = 24 / 4;
            this.option.column_width = 38;
        } else if (this.option.view_mode === 'week') {
            this.option.step = 24 * 7;
            this.option.column_width = 140;
        } else if (this.option.view_mode === 'month') {
            this.option.step = 24 * 30;
            this.option.column_width = 10;
        } else if (this.option.view_mode === 'year') {
            this.option.step = 24 * 365;
            this.option.column_width = 120;
        }
        this.gantt_start.setFullYear(this.gantt_start.getFullYear() - 1);
        this.gantt_start.setDate(1);
        this.gantt_end.setFullYear(this.gantt_end.getFullYear() + 1);
        this.$store.commit('setGanttStart', this.gantt_start);
        this.$store.commit('setGanttEnd', this.gantt_end);
    },
    mounted () {
        //
    },
    watch: {
        gantt_start: function (val) {
            this.$forceUpdate();
            this.$store.commit('setGanttStart', val);
        },
        gantt_end: function (val) {
            this.$store.commit('setGanttEnd', val);
        },
    },
    computed: {
        //
    },
    methods: {

    },
    components: {
        Gantt,
        Datepicker
    },
}
</script>

<style lang="scss">
@import "resources/sass/variables";

</style>
