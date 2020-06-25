<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'importance', 'status', 'due_date'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'remember_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
