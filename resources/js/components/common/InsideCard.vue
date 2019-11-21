<template>
    <div class="card inside" @click.once="showTaskModal(1)" :key="buttonKey">
        <div class="card-body">
            <div class="inside-bar" :style="'background-color: ' + color"></div>
            <div class="inside-context">
                <div class="d-flex justify-content-start">
                    <div class="mr-auto">
                        <h5 class="card-title" :style="'color:' + color">{{task.name}}</h5>
                    </div>
                    <div class="ml-auto" @click.capture.stop="input_time()" :key="buttonKey2">
                        <i class="icon ion-ios-clock"></i>
                    </div>
                </div>
                <p>説明文説明文説明文説明文説明文</p>
                <div class="d-flex justify-content-start">
                    <div class="ml-auto">
                        <a href="#" class="task-id">#{{task.id}}</a>
                    </div>
                </div>
            </div>
        </div>
        <TaskModal @close="closeModal" v-if="modal" :id="task.id" :mode="mode"></TaskModal>
        <Timer @close="closeModal2" v-if="modal2"></Timer>
    </div>
</template>
<script lang="">
import TaskModal from './modal/TaskModal.vue';
import Timer from './modal/TimeInputModal.vue'
    export default {
        // Options / Data
        data () {
            return {
                mode: '',
                modal: false,
                modal2: false,
                buttonKey: 1,
                buttonKey2: 1,
            }
        },
        props: ['color','task'],
        computed: {},
        methods: {
            input_time: function () {
                this.modal2 = true;
            },
            showTaskModal: function (mode) {
                console.log("aaaa");
                this.mode = mode;
                this.modal = true;
                // this.disableScroll();
            },
            closeModal() {
                this.mode = '';
                this.modal = false;
                this.buttonKey++;
                // this.enableScroll();
            },
            closeModal2() {
                this.modal2 = false;
                this.buttonKey2++;
                // this.enableScroll();
            },
            disableScroll: function () {
                var x=window.scrollX;
                var y=window.scrollY;
                window.onscroll=function(){window.scrollTo(x, y);};
            },
            enableScroll: function () {
                window.onscroll=function(){};
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
        components: {
            TaskModal,
            Timer
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
