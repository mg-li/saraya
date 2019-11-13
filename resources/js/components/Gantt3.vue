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
            <button class="btn btn-primary" @click="changeViewMode('day')">日</button>
        </div>
        <div style="width: 100px;margin-left: 20px;">
            <button class="btn btn-primary" @click="changeViewMode('week')">週</button>
        </div>
        <div style="width: 100px;margin-left: 20px;">
            <button class="btn btn-primary" @click="changeViewMode('month')">月</button>
        </div>
        <div style="width: 100px;margin-left: 20px;">
            <button class="btn btn-primary" @click="changeViewMode('year')">年</button>
        </div>
    </div>

    <!-- <i class="fas fa-plus"></i> -->
    <div style="display:flex;margin-top: 5px;">
        <div>
            <div class="title-svg-wrapper">
                <svg :width="title_range" :height="$store.getters.getHeaderHeight">
                    <g class="project">
                        <rect x="0" y="0" :width="title_range" :height="$store.getters.getHeaderHeight" class="grid-header"></rect>
                        <text :x="10" :y="$store.getters.getHeaderHeight / 2" class="title-text">工程・作業</text>
                    </g>
                </svg>
            </div>
            <div class="title-body" id="title-body" style="overflow-y:hidden;overflow-x:hidden;max-height:520px;">
                <div class="title-body-wrapper">
                    <svg :width="title_range" :height="($store.getters.getBarHeight + $store.getters.getPadding) * $store.getters.getTasks.length">
                        <g class="grid">
                            <!-- タスク背景 行 -->
                            <g>
                                <template v-for="(task, index) in $store.getters.getTasks">
                                    <rect x="0" :y="($store.getters.getBarHeight + $store.getters.getPadding) * index"
                                          :width="title_range" :height="$store.getters.getBarHeight + $store.getters.getPadding"
                                          class="title-row" :class="{'even-row': index % 2 == 0}">
                                    </rect>
                                    <text :x="10" :y="($store.getters.getBarHeight + $store.getters.getPadding) * index + 25" class="title-text">{{task.name}}</text>
                                </template>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <Gantt/>
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
            title_range: 315,
            ja: ja,
            DatePickerFormat: 'yyyy-MM-dd',
            gantt_start: new Date(),
            gantt_end: new Date(),
            debugEventLog: []
        }
    },
    created () {
        this.gantt_start.setFullYear(this.gantt_start.getFullYear() - 1);
        this.gantt_start.setMonth(11);
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
            this.$store.commit('setGanttStart', val);
        },
        gantt_end: function (val) {
            this.$store.commit('setGanttEnd', val);
        },
    },
    computed: {
        getViewMode () {

        },
    },
    methods: {
        changeViewMode: function (mode) {
            if (mode === 'day') {
                this.$store.commit('setStep', 24);
                this.$store.commit('setColWidth', 40);
            } else if (mode === 'Half Day') {
                // this.option.step = 24 / 2;
                // this.option.column_width = 38;
            } else if (mode === 'Quarter Day') {
                // this.option.step = 24 / 4;
                // this.option.column_width = 38;
            } else if (mode === 'week') {
                this.$store.commit('setStep', 10);
                this.$store.commit('setColWidth', 10);
            } else if (mode === 'month') {
                this.$store.commit('setStep', 24 * 30);
                this.$store.commit('setColWidth', 10);
            } else if (mode === 'year') {
                // this.$store.commit('setStep', 24 * 365);
                this.$store.commit('setColWidth', 2);
            }
            this.$store.commit('setViewMode', mode);
        },
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
