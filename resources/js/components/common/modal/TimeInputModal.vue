<template>
  <transition name="modal2" appear>
    <div class="modal modal-overlay"><!--@click.self="$emit('close')"-->
      <div class="modal-window">
        <div class="modal-content3">
            <div class="modal-body">
                <slot name="body">
                    <div class="d-flex justify-content-start">
                        <div class="mr-auto">
                            <h4 class="card-title" style="color:#FFF;font-weight:bold;">実績入力</h4>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 mb-2">
                            <input type="text" ref="target1" class="form-control" @focus="started_focus=true;$event.target.select();" @blur="time_focus=false;" maxlength="5">
                        </div>
                    </div>
                    <div class="d-flex justify-content-start" style="margin-top:20px;">
                        <div class="mr-auto">
                            <button class="btn btn-primary" @click.self="$emit('close')">取消</button>
                        </div>
                        <div class="ml-auto">
                            <button v-if="$root.user_type == 1" class="btn btn-primary" @click="onSave()">確認</button>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
      </div>
      <loading :active.sync="isLoading"></loading>
    </div>
  </transition>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const swal = require('sweetalert2');
import moment from 'moment';
export default {
    props: [

    ],
    components: {

    },
    data () {
        return {
            isLoading: false,
            errors: new Map(),
            time_focus: false,
        }
    },
    computed: {

    },
    methods: {

    },
    created () {

    },
}
</script>
<style lang="scss" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: rgba(45, 45, 45, 0.95);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }

  &-content3 {
    margin: 0px auto;
    width:300px;
    height:auto;
    max-height: 80vh;
    // overflow-y:scroll;
    font-family: Helvetica, Arial, sans-serif;
  }

  &-body {
    padding: 20px 20px 0px 20px;
  }

  &-footer {
    padding: 10px;
    text-align: right;
  }
}

// オーバーレイのトランジション
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
.modal-header h3 {
  margin-top: 0;
  color: #aafbd6;
}

.modal-body {
  margin: 20px 0;
}
</style>

<style lang="scss">
.unit{
    user-select: none;
    background-color:#FFFFCC;
}
.form-row {
    margin-bottom: 10px;
}
.err{
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}
.label-modal{
    color: white;
}
</style>
