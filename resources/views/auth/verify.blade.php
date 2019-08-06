@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('本会員登録') }}</div>

                <div class="card-body">
                    @if ($flg)
                        <div class="alert alert-success" role="alert">
                            {{ __('本会員登録は完了しました。') }}
                        </div>
                    @endif

                    <a href="./">ログイン画面へ</a>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
