<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class User extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Return the currently logged in user
     * @param Request $request
     * @return mixed
     */
    public function __invoke(Request $request)
    {
        return res($request->user())->send();
    }
}
