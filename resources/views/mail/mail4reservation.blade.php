H2健康診断　予約情報通知メール

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

{{$customerReservation->company->name}}
{{$customerReservation->user->name}}様　

健康診断予約システムの予約情報が登録出来ましたので、通知いたします。

以下は予約情報情報となります。
 医療機関名称: {{$customerReservation->hospital->name}}
 医療機関URL: {{$customerReservation->hospital->url}}
 予約日時  : {{$customerReservation->schedule_day}}  {{$customerReservation->reservation_time}}

予約情報を変更したい場合は、以下のurlにアクセスして予約情報変更を行ってください。

URL: http://h2.mountain-gorilla.co.jp/

※なお、このメールはシステムより自動配信されています。
返信は受付できませんので、ご了承ください。

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
