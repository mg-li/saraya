<template>
<div class="container-fluid">
    <transition name="view" mode="out-in">
        <router-view />
    </transition>
</div>
</template>

<script>
export default {
     props: [
        'id',
        'name',
        'user_type',
    ],
    data () {
        return {

        }
    },
    created () {
        this.onLogin()
    },
    computed: {
        //
    },
    methods: {
        onLogin: function () {
            this.$root.id = this.id;
            this.$root.name = this.name;
            this.$root.user_type = this.user_type;

            this.$router.push({ name: 'adminHome' });
        }
    }
}
</script>

<style scope>
.nav-link {
    transition: all .2s;
}
.nav-scroller a.nav-link.router-link-active {
    background: #008c79;
    color: white;
}

.view-enter-active, .view-leave-active {
    transition: opacity .35s;
}
.view-enter, .view-leave-to {
    opacity: 0;
}
</style>
