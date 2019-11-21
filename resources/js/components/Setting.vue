<template>
    <div>
        <div class="row" style="margin-top:20px;">
            <div class="mx-auto col-12">
                <nav>
                    <div class="nav nav-tabs">
                        <a v-for="(setting, index) in settings" @click="changePage(index, setting.id)" class="nav-item nav-link" :class="{'active':index == pIndex}">
                            {{setting.name}}
                        </a>
                    </div>
                </nav>
                <div v-for="(setting, index) in settings" class="tab-pane" :class="{'active': index == pIndex}" :id="'nav' + (index + 1)" role="tabpanel" :aria-labelledby="'nav' + (index + 1)">
                    <component :is="currentView" v-if="index == pIndex"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="">
    import department from './Department.vue';
    import user from './User.vue';
    import project from './Project.vue';
    export default {
        // Options / Data
        data () {
            return {
                settings: [
                    {
                        id: 'department',
                        name: '部門管理',
                    },
                    {
                        id: 'user',
                        name: 'ユーザー管理',
                    },
                    {
                        id: 'project',
                        name: '案件管理',
                    }
                ],
                pIndex: 0,
                departments: [
                    {
                        id: 1,
                        name: '開発部',
                    },
                    {
                        id: 2,
                        name: '商品企画部',
                    }
                ],
                currentView: 'department',
            }
        },
        props: [],
        computed: {},
        methods: {
            changePage: function (index, id) {
                this.pIndex = index;
                this.currentView = id;
            },
        },
        // watch: {},
        // Options / DOM
        // el () {},
        // replace: true,
        // template: '',
        // Options / Lifecycle Hooks
        // init () {},
        // created () {},
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
            department,
            user,
            project
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
<style lang="scss" scoped>
@import "resources/sass/variables";
.btn-menu {
    height: 6rem;
    width: 9rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-tabs {
  border-bottom: none;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #FFF;
    background-color: #6cb2eb;
    border-color: #dee2e6 #dee2e6 #f8fafc;
}
</style>
