<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $model = new User;
      $model->user_name = 'admin';
      $model->name = '管理者';
      $model->email = 'admin@H2.com';
      $model->password = bcrypt('1234');
      $model->user_type = 1;
      $model->save();

      $model = new User;
      $model->user_name = 'user01';
      $model->name = 'ゴリラ太郎';
      $model->email = 'user01@H2.com';
      $model->password = bcrypt('1234');
      $model->user_type = 2;
      $model->save();
    }
}
