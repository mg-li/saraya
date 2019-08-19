<template>
<div>
    <button class="btn btn-primary"> <i class="fas fa-plus"></i> 工程・作業追加</button>
    <div class="table-responsive">
        <table class="table text-nowrap table-hover table-bordered addTop">
            <thead>
                <tr style="background-color:rgba(0, 0, 0, 0.04);">
                    <th class="align-middle text-center"><input type="checkbox" class="form-control"></th>
                    <th class="align-middle text-center">#</th>
                    <th class="align-middle text-center">トラッカー</th>
                    <th class="align-middle text-center">ステータス</th>
                    <th class="align-middle text-center">優先度</th>
                    <th class="align-middle text-center">題名</th>
                    <!-- <th class="align-middle text-center">担当者</th> -->
                    <th class="align-middle text-center">更新日</th>
                    <th class="align-middle text-center"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle text-center"><input type="checkbox" class="form-control"></td>
                    <td>2610</td>
                    <td class="align-middle text-center">機能</td>
                    <td class="align-middle text-center">新規</td>
                    <td class="align-middle text-center">高い</td>
                    <td>画面設計</td>
                    <!-- <td class="align-middle text-center">李 晴昊</td> -->
                    <td class="align-middle text-center">2019/08/07 16:38</td>
                    <td class="align-middle text-center">・・・</td>
                </tr>
                <tr>
                    <td class="align-middle text-center"><input type="checkbox" class="form-control"></td>
                    <td>2611</td>
                    <td class="align-middle text-center">タスク</td>
                    <td class="align-middle text-center">新規</td>
                    <td class="align-middle text-center">高い</td>
                    <td>ガントチャート画面設計</td>
                    <!-- <td class="align-middle text-center">李 晴昊</td> -->
                    <td class="align-middle text-center">2019/08/07 16:38</td>
                    <td class="align-middle text-center">・・・</td>
                </tr>
                <tr>
                    <td class="align-middle text-center"><input type="checkbox" class="form-control"></td>
                    <td>2612</td>
                    <td class="align-middle text-center">タスク</td>
                    <td class="align-middle text-center">新規</td>
                    <td class="align-middle text-center">高い</td>
                    <td>チケット画面設計</td>
                    <!-- <td class="align-middle text-center">李 晴昊</td> -->
                    <td class="align-middle text-center">2019/08/07 16:38</td>
                    <td class="align-middle text-center">・・・</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    props: [
        //
    ],
    data () {
        return {

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
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
@import "resources/sass/variables";
.addTop{
    margin-top: 20px;
}
</style>
