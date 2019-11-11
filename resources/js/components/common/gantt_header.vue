<template>
    <div class="gantt-header">
        <div class="hearder-svg-wrapper" id="hearder-svg-wrapper">
            <svg class="gantt-header" :width="compute_width()" :height="option.header_height">
                <g class="date">
                    <rect x="0" y="0" :width="compute_width()" :height="option.header_height" class="grid-header"></rect>
                    <template v-for="(d, index) in dates_display">
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
                dates: [],
                dates_display: [],
                gantt_start: this.$store.getters.getGanttStart,
                gantt_end: this.$store.getters.getGanttEnd,
                count_gantt_days: 0,
                month_names:['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月'],
            }
        },
        props: ['option'],
        computed: {},
        methods: {
            //カレンダの配列を作る 一応年～時間まで対応
            make_dates_arr: function() {
                this.dates = [];
                let cur_date = null;

                while (cur_date === null || cur_date < this.gantt_end) {
                    if (!cur_date) {
                        cur_date = this.clone_date(this.gantt_start);
                    } else {
                        if (this.option.view_mode == 'year') {
                            cur_date = this.add_date(cur_date, 1, 'year');
                        }else if (this.option.view_mode == 'month') {
                            cur_date = this.add_date(cur_date, 1, 'month');
                        }else if (this.option.view_mode == 'day') {
                            cur_date = this.add_date(cur_date, 1, 'day');
                        }else {
                            cur_date = this.add_date(
                                cur_date,
                                this.option.step,
                                'hour'
                            );
                        }
                    }
                    this.dates.push(cur_date);
                }
                this.$store.commit('createDates', this.dates);

                this.$store.commit('setCountGanttDays', this.count_gantt_days);
                this.dates_display = this.get_dates_to_draw();
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
            get_dates_to_draw: function() {
                let last_date = null;
                const dates_arr = this.dates.map((date, i) => {
                    const d = this.get_date_info(date, last_date, i);
                    last_date = date;
                    return d;
                });
                return dates_arr;
            },
            get_date_info(date, last_date, i) {
                if (!last_date) {
                    last_date = this.add_date(date, 1, 'year');
                }
                const date_text = {
                    'Quarter Day_lower': this.format_date(date,'HH'),
                    'Half Day_lower': this.format_date(date,'HH'),
                    day_lower: date.getDate() !== last_date.getDate()? this.format_date(date, 'D') : '',
                    week_lower: date.getMonth() !== last_date.getMonth() ? this.format_date(date, 'D MMM') : this.format_date(date, 'D'),
                    month_lower: this.format_date(date, 'MMMM'),
                    year_lower: this.format_date(date, 'YYYY'),
                    'Quarter Day_upper': date.getDate() !== last_date.getDate() ? this.format_date(date, 'D MMM') : '',
                    'Half Day_upper': date.getDate() !== last_date.getDate() ? date.getMonth() !== last_date.getMonth()
                              ? this.format_date(date, 'D MMM') : this.format_date(date, 'D') : '',
                    day_upper: date.getMonth() !== last_date.getMonth() ? this.format_date(date, 'MMMM') : '',
                    week_upper: date.getMonth() !== last_date.getMonth() ? this.format_date(date, 'MMMM') : '',
                    month_upper: date.getFullYear() !== last_date.getFullYear() ? this.format_date(date, 'YYYY') : '',
                    year_upper: date.getFullYear() !== last_date.getFullYear() ? this.format_date(date, 'YYYY') : ''
                };

                var count_last_month_days = new Date(last_date.getFullYear(), last_date.getMonth() + 1, 0).getDate();
                var count_this_month_days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

                const base_pos = {
                    // day_x: i * this.option.column_width,
                    // week_x: i * this.option.column_width * 7,
                    // month_x: i * this.option.column_width * count_last_month_days,
                    // year_x: i * this.option.column_width * this.count_gantt_days,
                    lower_y: this.option.header_height,
                    upper_y: this.option.header_height - 25
                };

                // const x_pos = {
                //     'Quarter Day_lower': this.option.column_width * 4 / 2,
                //     'Quarter Day_upper': 0,
                //     'Half Day_lower': this.option.column_width * 2 / 2,
                //     'Half Day_upper': 0,
                //     day_lower: this.option.column_width / 2,
                //     day_upper: this.option.column_width * 30 / 2,
                //     week_lower: 0,
                //     week_upper: this.option.column_width * 4 / 2,
                //     month_lower: this.option.column_width * count_last_month_days / 2,
                //     month_upper: this.option.column_width * count_last_month_days / 2,//this.option.column_width * 12 / 2 　※年の表示を最初表示する月の上に表示へ変更　2019/11/06 リ
                //     year_lower: this.option.column_width / 2,
                //     year_upper: this.option.column_width * 30 / 2
                // };

                return {
                    upper_text: date_text[`${this.option.view_mode}_upper`],
                    lower_text: date_text[`${this.option.view_mode}_lower`],
                    upper_x: (this.getThroughDays(this.$store.getters.getGanttStart, date) + count_this_month_days / 2) * this.option.column_width,
                    upper_y: base_pos.upper_y,
                    // lower_x: base_pos[`${this.option.view_mode}_x`] + x_pos[`${this.option.view_mode}_lower`],
                    lower_x: (this.getThroughDays(this.$store.getters.getGanttStart, date) + count_this_month_days / 2) * this.option.column_width ,
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
                    // console.log(padString.slice(0, targetLength) + String(str));
                    return padString.slice(0, targetLength) + String(str);

                }
            },
            compute_width: function () {
                return this.option.column_width * this.count_gantt_days;
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
            this.count_gantt_days = (this.gantt_end - this.gantt_start) / 86400000;
            this.make_dates_arr();
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
