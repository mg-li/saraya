<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay"><!--@click.self="$emit('close')"-->
      <div class="modal-window">
        <div class="modal-content2">
            <div class="modal-header">
                <slot name="header">
                    <h3 slot="header">
                        {{mode == '1' ? '工程更新' : '新規工程'}}
                    </h3>
                </slot>
            </div>
            <div class="modal-body">
                <slot name="body">
                    <div class="form-row">
                        <div class="col-md-6 mb-2">
                            <label class="label-modal">開始</label>
                            <Datepicker input-class="form-control" :class="{'is-invalid': errors.has('start')}" v-model="task.start" :value="task.start" :format="DatePickerFormat" :language="ja"></Datepicker>
                            <div v-if="errors.has('start')" class="err">
                                {{errors.get("start")}}
                            </div>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label class="label-modal">終了</label>
                            <Datepicker input-class="form-control" :class="{'is-invalid': errors.has('end')}" v-model="task.end" :value="task.end" :format="DatePickerFormat" :language="ja"></Datepicker>
                            <div v-if="errors.has('end')" class="err">
                                {{errors.get("end")}}
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 mb-2">
                            <label class="label-modal">工程・作業名</label>
                            <input type="text" class="form-control" :class="{'is-invalid': errors.has('name')}" v-model="task.name">
                            <div v-if="errors.has('name')" class="err">
                                {{errors.get("name")}}
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 mb-2">
                            <div class="progress" style="height: 25px;margin-top: 20px;">
                              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="task.progress" aria-valuemin="0" aria-valuemax="100" :style="style">{{task.progress}}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2 mr-5 mb-2">
                            <label class="label-modal">進捗率</label>
                            <input type="text" class="form-control" :class="{'is-invalid': errors.has('progress')}" v-model="task.progress">
                        </div>
                        <div class="col-md-2 mr-5 mb-2">
                            <label class="label-modal">工程区分</label>
                            <select class="form-control">
                                <option>大</option>
                                <option>中</option>
                                <option>少</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2 mr-5 mb-2">
                            <label class="label-modal">カテゴリ</label>
                            <select class="form-control">
                                <option>企画</option>
                                <option>開発</option>
                                <option>生産</option>
                                <option>テスト</option>
                            </select>
                        </div>
                        <div class="col-md-2 mr-5 mb-2">
                            <label class="label-modal">ステータス</label>
                            <select class="form-control">
                                <option>新規</option>
                                <option>進行中</option>
                                <option>評価中</option>
                                <option>終了</option>
                            </select>
                        </div>
                        <div class="col-md-2 mr-5 mb-2">
                            <label class="label-modal">優先度</label>
                            <select class="form-control">
                                <option>高</option>
                                <option>中</option>
                                <option>低</option>
                            </select>
                        </div>
                        <div class="col-md-2 mr-5 mb-2">
                            <label class="label-modal">担当者</label>
                            <select class="form-control">
                                <option>Aさん</option>
                                <option>Bさん</option>
                                <option>Cさん</option>
                            </select>
                        </div>
                    </div>
                </slot>
            </div>
        </div>
        <footer class="modal-footer">
            <slot name="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-auto mr-auto">
                            <button class="btn btn-primary" @click.self="$emit('close')">閉じる</button>
                        </div>
                        <div class="col-auto">
                            <button v-if="$root.user_type == 1" class="btn btn-primary" @click="onSave()">保存する</button>
                        </div>
                    </div>
                </div>
            </slot>
        </footer>
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
import Datepicker from 'vuejs-datepicker';
import {ja} from 'vuejs-datepicker/dist/locale';
export default {
    props: [
        'id',
        'mode',
    ],
    components: {
        Datepicker
    },
    data () {
        return {
            isLoading: false,
            task: {
                progress: 0,
            },
            errors: new Map(),
            ja: ja,
            DatePickerFormat: 'yyyy-MM-dd',
        }
    },
    computed: {
        style () {
            return `width: ${this.task.progress}%`;
        }
    },
    methods: {
        getItem: function () {

        },
        onSave: function () {

        },
        onValidate: function () {
            this.errors.clear();

            return this.errors.size == 0 ? true : false ;
        },
        isHanSuji: function (val) {
            val = (val==null)?"":''+val;
            if(val.match(/^[0-9]+$/)){
                return true;
            }else{
                return false;
            }
        },
        isNumber: function (numVal){
            // チェック条件パターン
            var pattern = /^([1-9]\d*|0)(\.\d+)?$/;
            // 数値チェック
            return pattern.test(numVal);
        },
    },
    created () {
        this.getItem();
    },
}
</script>
<style lang="scss">
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
    background: rgba(45, 45, 45, 0.8);;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }

  &-content2 {
    margin: 0px auto;
    width:900px;
    height:auto;
    max-height: 80vh;
    overflow-y:scroll;
    font-family: Helvetica, Arial, sans-serif;
  }

  &-body {
    padding: 20px 50px;
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
