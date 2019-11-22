<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-start">
                <div class="mr-auto">
                    <button class="btn btn-secondary" @click.self="$emit('close')"><i class="icon ion-ios-undo"></i></button>
                </div>

                <div class="ml-auto">
                    <input type="file" class="btn btn-primary" />
                </div>
            </div>

            <div class="table-responsive" style="max-height: 550px;">
                <table class="table text-nowrap table-hover table-bordered addTop">
                    <thead>
                        <tr class="bg-info text-white">
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
                        <tr v-for="(task,index) in tasks">
                            <td class="align-middle text-center"><input type="checkbox" class="form-control"></td>
                            <td>#{{task.id}}</td>
                            <td class="align-middle text-center">機能</td>
                            <td class="align-middle text-center">新規</td>
                            <td class="align-middle text-center">高い</td>
                            <td>{{task.name}}</td>
                            <!-- <td class="align-middle text-center">李 晴昊</td> -->
                            <td class="align-middle text-center">2019/08/07 16:38</td>
                            <td class="align-middle text-center">・・・</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'tasks'
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
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->
<style lang="scss" scoped>
@import "resources/sass/variables";
.addTop{
    margin-top: 20px;
}
</style>
