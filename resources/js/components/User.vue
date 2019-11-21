<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-start">
                <div class="ml-auto">
                    <button class="btn btn-primary"> <i class="fas fa-plus"></i> ユーザ追加</button>
                </div>
            </div>

            <div class="row" style="margin-top: 20px;">
                <div class="col-12">
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr class="bg-info text-white">
                                <th>社員番号</th>
                                <th>社員名</th>
                                <th>部門</th>
                                <th>権限</th>
                                <th>パスワード</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Aさん</td>
                                <td>開発部</td>
                                <td>管理者</td>
                                <td>1234567</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Bさん</td>
                                <td>企画部</td>
                                <td>一般</td>
                                <td>2222222</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Cさん</td>
                                <td>技術部</td>
                                <td>システム管理者</td>
                                <td>1234</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="">
    export default {
        // Options / Data
        data () {
            return {}
        },
        props: [],
        computed: {},
        methods: {}// ,
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
