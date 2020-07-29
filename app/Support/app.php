<?php 

if(! function_exists('_auth')) {
    function _auth() {
        return auth('api');
    }
}
