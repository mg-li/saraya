<template>
    <div class="card">
        <div class="card-body">
            <!-- <div class="d-flex justify-content-start">
                <div class="mr-auto">
                    <span class="span-header">title</span>
                </div>
            </div> -->
            <input type="file" class="btn btn-primary" @change="fileChange">

            <table class="table text-nowrap table-bordered" style="margin-top:20px;">
                <tr v-for="(data,index) in fileData">
                    <td class="align-middle">{{data[0]}}</td>
                    <!-- #4722 リアル検査データの取り込みテスト start -->
                    <td class="align-middle" width="25%;">{{data[1]}}</td>
                    <!-- #4722 リアル検査データの取り込みテスト end -->
                    <td class="align-middle">{{data[2]}}</td>
                    <td class="align-middle">{{data[3]}}</td>
                    <td class="align-middle">{{data[4]}}</td>
                    <td class="align-middle text-center">{{data[5]}}</td>
                    <td class="align-middle">{{data[6]}}</td>
                    <td class="align-middle">{{data[7]}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script lang="">
    export default {
        // Options / Data
        data () {
            return {
                fileData: [],
            }
        },
        props: [],
        computed: {},
        methods: {
            fileChange: function(e) {
                let _this = this;
                var file = e.target.files[0];
                var reader = new FileReader();
                const Encoding = require('encoding-japanese');
                reader.onload = function(e) {
                    var codes = e.target.result;
                    var encoding = Encoding.detect(codes);
                    var unicodeString = Encoding.convert(codes, {
                       to: 'unicode',
                       from: encoding,
                       type: 'string'
                    });
                    // var arr = unicodeString.trim().replace(/\"/g, "").split("\n");
                    var arr = unicodeString.trim().replace(/\r?/g, "").split("\n");
                    var count = 0;
                    for (var i = 0; i < arr.length; i++) {
                        var temp_arr = arr[i].split(",");
                        // console.log(temp_arr);
                        if (_this.checkArrIsNotEmpty(temp_arr).length > 0) {
                            // console.log(temp_arr);
                            // console.log(_this.checkArrIsNotEmpty(temp_arr));
                            _this.fileData.push(temp_arr);
                        }
                    }
                };
                reader.readAsBinaryString(file);
            },
            checkArrIsNotEmpty: function (arr) {
                 return arr.filter ( (obj) => {
                     return obj.length > 1
                 });
            },
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
