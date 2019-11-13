<template>
    <div class="gantt-header">
        <div class="hearder-svg-wrapper" id="hearder-svg-wrapper">
            <svg class="gantt-header" :width="compute_width() + 20" :height="$store.getters.getHeaderHeight">
                <g class="date">
                    <rect x="0" y="0" :width="compute_width()" :height="$store.getters.getHeaderHeight" class="grid-header"></rect>
                    <template v-for="(d, index) in get_dates_to_draw">
                        <text :x="d.lower_x" :y="d.lower_y - 5" class="lower-text">{{d.lower_text}}</text>
                        <text :x="d.upper_x" :y="d.upper_y - 5" class="upper-text" v-if="d.upper_text">{{d.upper_text}}</text>
                    </template>
                </g>
            </svg>
        </div>
    </div>
</template>

<script lang="">
    //ヘッダーコンポーネント　2019/11/06 リ
    export default {
        // Options / Data
        data () {
            return {
                month_names:['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月'],
            }
        },
        props: [],
        computed: {
            get_dates_to_draw () {
                let last_date = null;
                const dates_arr = this.$store.getters.getDates.map((date, i) => {
                    const d = this.get_date_info(date, last_date, i);
                    last_date = date;
                    return d;
                });

                return dates_arr;
            },
            count_gantt_days () {
                this.make_dates_arr();
                return this.$store.getters.getCountGanttDays;
            },
        },
        methods: {
            //カレンダの配列を作る
            make_dates_arr: function () {
                var dates = [];
                let cur_date = null;
                while (cur_date === null || cur_date < this.$store.getters.getGanttEnd) {
                    if (!cur_date) {
                        cur_date = this.clone_date(this.$store.getters.getGanttStart);
                    } else {
                        if (this.$store.getters.getViewMode == 'year') {
                            cur_date.setDate(1);
                            cur_date.setMonth(0);
                            cur_date = this.add_date(cur_date, 1, 'year');
                        }else if (this.$store.getters.getViewMode == 'month') {
                            cur_date.setDate(1);
                            cur_date = this.add_date(cur_date, 1, 'month');
                        }else if (this.$store.getters.getViewMode == 'day') {
                            cur_date = this.add_date(cur_date, 1, 'day');
                        }else if (this.$store.getters.getViewMode == 'week') {
                            if (cur_date.getDate() >= 1 && cur_date.getDate() < 11) {
                                cur_date = this.add_date(cur_date, (11 - cur_date.getDate()), 'day');
                            }else if (cur_date.getDate() >= 11 && cur_date.getDate() < 21) {
                                cur_date = this.add_date(cur_date, (21 - cur_date.getDate()), 'day');
                            }else {
                                var last_day = new Date(cur_date.getFullYear(), cur_date.getMonth() + 1, 0).getDate();
                                cur_date = this.add_date(cur_date, (last_day - cur_date.getDate() + 1), 'day');
                            }
                        }else {
                            cur_date = this.add_date(cur_date, this.$store.getters.getStep, 'hour');
                        }
                    }
                    dates.push(cur_date);
                }
                this.$store.commit('createDates', dates);
            },
            add_date: function(date, qty, scale) {
                qty = parseInt(qty, 10);
                const vals = [
                    date.getFullYear() + (scale === 'year' ? qty : 0),
                    date.getMonth() + (scale === 'month' ? qty : 0),
                    date.getDate() + (scale === 'day' ? qty : 0),
                    date.getHours() + (scale === 'hour' ? qty : 0),
                    date.getMinutes() + (scale === 'minute' ? qty : 0),
                    date.getSeconds() + (scale === 'second' ? qty : 0),
                    date.getMilliseconds() + (scale === 'millisecond' ? qty : 0)
                ];
                return new Date(...vals);
            },
            clone_date: function(date) {
                return new Date(...this.get_date_values(date));
            },
            get_date_values: function(date) {
                return [
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                ];
            },
            get_date_info(date, last_date, i) {
                if (!last_date) {
                    last_date = this.add_date(date, 1, 'year');
                }
                const date_text = {
                    'Quarter Day_lower': this.format_date(date,'HH'),
                    'Half Day_lower': this.format_date(date,'HH'),
                    day_lower: date.getDate() !== last_date.getDate()? this.format_date(date, 'D') : '',
                    week_lower: this.format_date(date, 'D'),
                    month_lower: this.format_date(date, 'MMMM'),
                    year_lower: this.format_date(date, 'YYYY'),
                    'Quarter Day_upper': date.getDate() !== last_date.getDate() ? this.format_date(date, 'D MMM') : '',
                    'Half Day_upper': date.getDate() !== last_date.getDate() ? date.getMonth() !== last_date.getMonth()
                              ? this.format_date(date, 'D MMM') : this.format_date(date, 'D') : '',
                    day_upper: date.getMonth() !== last_date.getMonth() ? this.format_date(date, 'MMMM') : '',
                    week_upper: date.getMonth() !== last_date.getMonth() ? this.format_date(date, 'MMMM') : '',
                    //(date < last_date && date.getDate() < 15 ? this.format_date(last_date, 'MMMM') : '') //week_upper
                    month_upper: date.getFullYear() !== last_date.getFullYear() ? this.format_date(date, 'YYYY') : '',
                    year_upper: ''
                };

                var count_last_month_days = new Date(last_date.getFullYear(), last_date.getMonth() + 1, 0).getDate();
                var count_this_month_days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

                const base_pos = {
                    // day_x: i * this.option.column_width,
                    // week_x: i * this.option.column_width * 7,
                    // month_x: i * this.option.column_width * count_last_month_days,
                    // year_x: i * this.option.column_width * this.count_gantt_days,
                    lower_y: this.$store.getters.getHeaderHeight,
                    upper_y: this.$store.getters.getHeaderHeight - 25
                };

                const x_pos = {
                    'Quarter Day_lower': this.$store.getters.getColWidth * 4 / 2,
                    'Quarter Day_upper': 0,
                    'Half Day_lower': this.$store.getters.getColWidth * 2 / 2,
                    'Half Day_upper': 0,
                    day_lower: this.$store.getters.getColWidth * this.getThroughDays(this.$store.getters.getGanttStart, date),
                    day_upper: this.$store.getters.getColWidth * 30 / 2,
                    week_lower: this.getThroughDays(this.$store.getters.getGanttStart, date) * this.$store.getters.getColWidth + 10,
                    week_upper: this.$store.getters.getColWidth * 4 / 2,
                    month_lower: (this.getThroughDays(this.$store.getters.getGanttStart, date) + count_this_month_days / 2) * this.$store.getters.getColWidth,
                    month_upper: this.$store.getters.getColWidth * count_last_month_days / 2,
                    year_lower: this.getThroughDays(this.$store.getters.getGanttStart, date) * this.$store.getters.getColWidth + 20,
                    year_upper: this.$store.getters.getColWidth * 30 / 2
                };

                return {
                    upper_text: date_text[`${this.$store.getters.getViewMode}_upper`],
                    lower_text: date_text[`${this.$store.getters.getViewMode}_lower`],
                    upper_x: (this.getThroughDays(this.$store.getters.getGanttStart, date) + count_this_month_days / 2) * this.$store.getters.getColWidth,
                    upper_y: base_pos.upper_y,
                    lower_x: x_pos[`${this.$store.getters.getViewMode}_lower`],
                    lower_y: base_pos.lower_y,
                    count_last_month_days: count_last_month_days,
                };
            },
            format_date: function(date, format_string = 'YYYY-MM-DD HH:mm:ss.SSS') {
                const values = this.get_date_values(date).map(d => this.padStart(d, 2, 0));
                const format_map = {
                    YYYY: values[0],
                    MM: this.padStart(+values[1] + 1, 2, 0),
                    DD: values[2],
                    HH: values[3],
                    mm: values[4],
                    ss: values[5],
                    SSS:values[6],
                    D: values[2],
                    MMMM: this.month_names[+values[1]],
                    MMM: this.month_names[+values[1]]
                };

                let str = format_string;
                const formatted_values = [];

                Object.keys(format_map)
                    .sort((a, b) => b.length - a.length) // big string first
                    .forEach(key => {
                        if (str.includes(key)) {
                            str = str.replace(key, `$${formatted_values.length}`);
                            formatted_values.push(format_map[key]);
                        }
                    });

                formatted_values.forEach((value, i) => {
                    str = str.replace(`$${i}`, value);
                });

                return str;
            },
            getThroughDays: function(start, end) {
                return (end - start) / 86400000;
            },
            padStart: function(str, targetLength, padString) {
                str = str + '';
                targetLength = targetLength >> 0;
                padString = String(typeof padString !== 'undefined' ? padString : ' ');
                if (str.length > targetLength) {
                    return String(str);
                } else {
                    targetLength = targetLength - str.length;
                    if (targetLength > padString.length) {
                        padString += padString.repeat(targetLength / padString.length);
                    }
                    return padString.slice(0, targetLength) + String(str);
                }
            },
            compute_width: function () {
                return this.$store.getters.getColWidth * this.count_gantt_days;
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
            // this.make_dates_arr();
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
        // components: {},
        // transitions: {},
        // partials: {},
        // Options / Misc
        // parent: null,
        // events: {},
        // mixins: [],
        // name: ''
    }
</script>
