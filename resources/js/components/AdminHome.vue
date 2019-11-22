<template>
<div>
    <div class="card-deck">
        <div class="card home">
            <div class="card-board" style="background-color: rgba(0, 191, 165, 0.5);"></div>
            <div class="card-body">
                <h5 class="card-title">新規作業</h5>
                <div class="inside-wrapper">
                    <template v-for="(task,index) in getTasksByStatus(1)">
                        <card :task="task" :color="'rgba(0, 191, 165, 0.5);'"></card>
                    </template>
                </div>
            </div>
        </div>
        <div class="card home">
            <div class="card-board" style="background-color: rgba(37, 117, 183, 0.88);"></div>
            <div class="card-body">
                <h5 class="card-title">進行中</h5>
                <div class="inside-wrapper">
                    <template v-for="(task,index) in getTasksByStatus(2)">
                        <card :task="task" :color="'rgba(37, 117, 183, 0.88);'"></card>
                    </template>
                </div>

            </div>
        </div>
        <div class="card home">
            <div class="card-board" style="background-color: rgba(236, 208, 34, 0.68);"></div>
            <div class="card-body">
                <h5 class="card-title">評価中</h5>
                <div class="inside-wrapper">
                    <template v-for="(task,index) in getTasksByStatus(3)">
                        <card :task="task" :color="'rgba(236, 208, 34, 0.68);'"></card>
                    </template>
                </div>
            </div>
        </div>
        <div class="card home">
            <div class="card-board" style="background-color: rgb(255, 168, 168, 0.8);"></div>
            <div class="card-body">
                <h5 class="card-title">トラブル</h5>
                <div class="inside-wrapper">
                    <template v-for="(task,index) in getTasksByStatus(4)">
                        <card :task="task" :color="'rgb(255, 168, 168, 0.8);'"></card>
                    </template>
                </div>
            </div>
        </div>
        <div class="card home">
            <div class="card-board" style="background-color: rgba(159, 167, 179, 0.88);"></div>
            <div class="card-body">
                <h5 class="card-title">解決</h5>
                <div class="inside-wrapper">
                    <template v-for="(task,index) in getTasksByStatus(5)">
                        <card :task="task" :color="'rgba(159, 167, 179, 0.88);'"></card>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import card from './common/InsideCard.vue';
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
        getTasksByStatus: function (status) {
            if (this.$store.getters.getGanttMode == 'one') {
                return this.$store.getters.getTasksByStatus(status);
            }else{
                return [];
            }

        },
    },
    components: {card},
}
</script>
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->
<style lang="scss">
@import "resources/sass/variables";
.home{
    border: none;
    background-color: unset;
    user-select: none;
}
.inside{
    margin-bottom: 10px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
}
.inside:hover{
    box-shadow: 0 0 10px #d3d3d3 inset;
}
.inside-bar {
    width: 3%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px 0 0 2px;
}
.inside-context {
    width: 100%;
    height: 100%;
    // position: absolute;
}
h5{
    font-weight: bold;
}
.card-board{
    width: calc(100% - 30px);
    height: 5px;
    margin: auto;
}
a:hover, a:active {
    color: #175A8E;
    color: var(--content-link-hover-active-color);
    text-decoration: underline;
}

a:hover, a:focus {
    color: #16598c;
}
a:active, a:hover {
    outline: 0;
}
a {
    color: #175A8E;
    color: var(--content-link-color);
    text-decoration: none;
}
a {
    color: #1A67A3;
    text-decoration: none;
    line-height: inherit;
}
.card p{
    margin-bottom: 0;
}
.inside-wrapper {
    margin-top: 20px;
    height: 580px;
    overflow: hidden;
}
.inside-wrapper:hover{
    overflow-y: scroll;
}
.inside-wrapper::-webkit-scrollbar {
    height: 10px;
    width: 0;
}
.inside-wrapper::-webkit-scrollbar-thumb {
    background: #ddd;
    visibility: hidden;
}
.inside-wrapper::-webkit-scrollbar-track {
    background: 0 0;
}
</style>
