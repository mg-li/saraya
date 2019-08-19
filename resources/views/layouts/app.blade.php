@include('layouts/common/head')

@auth
    @php
        $user = Auth::user();
    @endphp
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
    <div id="app">
        <main-component :id ="{{$user->id}}" name="{{$user->name}}" user_type="{{$user->user_type}}" />
    </div>



@else
    @yield('content')
@endauth
<!-- <script src="http://127.0.0.1:6001/socket.io/socket.io.js"></script> -->

<!-- <script src="https://echo-all-you-need-is-tuna.noplan.cc/socket.io/socket.io.js"></script> -->
</body>
</html>
